import { AddAPhoto } from "@mui/icons-material";
import { Typography, styled } from "@mui/material";
import { useRef, useState } from "react";
import route from "ziggy-js";

export const AvatarContainer = styled("div")({
    width: "144px",
    height: "144px",
    margin: "auto",
    display: "flex",
    cursor: "pointer",
    overflow: "hidden",
    borderRadius: "50%",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    border: "1px dashed rgba(145, 158, 171, 0.32)", // TODO use theme
});

const AvatarPlaceholder = styled("div")({
    display: "flex",
    borderRadius: "50%",
    position: "absolute",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    width: "calc(100% - 16px)",
    height: "calc(100% - 16px)",
    color: "rgb(145, 158, 171)", // TODO use theme
    backgroundColor: "rgb(244, 246, 248)", // TODO use theme
    transition: "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
});

export const Avatar = styled("img")({
    lineHeight: 1,
    overflow: "hidden",
    display: "block",
    borderRadius: "50%",
    position: "absolute",
    width: "calc(100% - 16px)",
    height: "calc(100% - 16px)",
    objectFit: "cover",
});

interface ImageUploaderProps {
    mediaFile?: MediaFile;
    onChange: (newFile: File | null) => void;
}

const ImageUploader = ({ mediaFile, onChange }: ImageUploaderProps) => {
    const mediaUrl = mediaFile ? route("media", { id: mediaFile.id }) : null;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [avatarFileURL, setAvatarFileURL] = useState<string | null>(mediaUrl);

    const onFileInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = evt.target;
        if (files != null) {
            const fileURL = URL.createObjectURL(files[0]);
            setAvatarFileURL(fileURL);
            onChange(files[0]);
        } else {
            onChange(null);
        }
    };

    return (
        <AvatarContainer
            tabIndex={0}
            role="presentation"
            onClick={() => fileInputRef.current?.click()}
        >
            <input
                ref={fileInputRef}
                accept="image/*"
                type="file"
                tabIndex={-1}
                hidden
                style={{ display: "none" }}
                onChange={onFileInputChange}
            />
            {avatarFileURL && <Avatar src={avatarFileURL} />}
            <AvatarPlaceholder
                sx={{
                    ...(avatarFileURL && {
                        opacity: 0,
                        backgroundColor: "rgba(22, 28, 36, 0.64)",
                        color: "#fff",
                        ":hover": {
                            opacity: 0.72,
                        },
                    }),
                }}
            >
                <AddAPhoto sx={{ mb: 1 }} />
                <Typography variant="caption">
                    {avatarFileURL ? "Actualizar Imagen" : "Subir Imagen"}
                </Typography>
            </AvatarPlaceholder>
        </AvatarContainer>
    );
};

export default ImageUploader;
