import {
    Typography,
    Button,
    Input,
    Box,
    IconButton,
    type InputProps,
    Link,
} from "@mui/material";
import type React from "react";
import { useRef, useState } from "react";
import { Close } from "@mui/icons-material";

interface FileUploaderProps extends Omit<InputProps, "onChange"> {
    label: string;
    mediaFile: MediaFile | null;
    disabled?: boolean;
    onChange: (file: File | null) => void;
}

const FileUploader = ({
    label,
    name,
    mediaFile,
    onChange,
    disabled = false,
    ...inputProps
}: FileUploaderProps) => {
    const [file, setFile] = useState<File | null>(null);
    const inputFileRef = useRef<HTMLInputElement>(null);

    const fileName =
        file != null
            ? file.name
            : mediaFile != null
            ? mediaFile.file_name
            : null;

    const fileLink =
        file != null
            ? URL.createObjectURL(file)
            : mediaFile != null
            ? // @ts-expect-error route helper is not recognized by TS
              route("media", { id: mediaFile?.id })
            : null;

    return (
        <>
            <label htmlFor={name}>
                <Typography sx={{ mb: 1 }} variant="body2">
                    {label}
                </Typography>
                {fileName == null && (
                    <Button
                        size="small"
                        disabled={disabled}
                        variant="outlined"
                        component="span"
                    >
                        Subir archivo
                    </Button>
                )}

                <Input
                    inputRef={inputFileRef}
                    {...inputProps}
                    name={name}
                    hidden
                    onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                        const { files } = evt.target;
                        if (files != null) {
                            setFile(files[0]);
                            onChange(files[0]);
                        }
                    }}
                    id={name}
                    disabled={disabled}
                    type="file"
                    sx={{ display: "none" }}
                />
            </label>
            <Box display="flex" alignItems="center">
                {fileName != null && (
                    <>
                        {!disabled && (
                            <IconButton
                                aria-label="Descartar archivo"
                                onClick={() => {
                                    const inputFile = inputFileRef.current;
                                    if (inputFile != null) {
                                        inputFile.value = "";
                                        setFile(null);
                                        onChange(null);
                                    }
                                }}
                            >
                                <Close />
                            </IconButton>
                        )}
                        <Link color="info.main" href={fileLink} target="_blank">
                            {fileName}
                        </Link>
                    </>
                )}
            </Box>
        </>
    );
};

export default FileUploader;
