import PageHeader from "@/Components/PageHeader";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayoutV2";
import { Head, useForm } from "@inertiajs/react";
import {
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    Paper,
    TextField,
} from "@mui/material";
import ImageUploader from "./ImageUploader";
import Panel from "../../Components/Panel";
import { pick } from "rambda";
import type React from "react";
import route from "ziggy-js";

interface EditProps {
    user: User;
    canEditUserInfo: boolean;
}

interface ExtraFormState {
    avatar_file: null | File;
}

const extraFormState: ExtraFormState = {
    avatar_file: null,
};

export default function Edit({
    user,
    canEditUserInfo,
}: InertiaPageProps<EditProps>) {
    const { data, setData, post, isDirty, setDefaults, processing } = useForm({
        _method: "patch",
        ...pick(["name", "last_name", "avatar"], user),
        ...extraFormState,
    });

    const handleOnChange = (event: any) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        post(route("profile.update"), {
            onSuccess() {
                // @ts-expect-error library types does not cover File type
                setDefaults(data);
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Perfil" />
            <PageHeader title="Perfil" />
            <Box pt={4}>
                <Container component="form" onSubmit={onSubmit} fixed>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <Paper elevation={0} sx={{ p: 3 }}>
                                <ImageUploader
                                    mediaFile={data.avatar}
                                    onChange={(avatarFile) => {
                                        setData("avatar_file", avatarFile);
                                    }}
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Panel title="Datos personales">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            disabled={!canEditUserInfo}
                                            name="name"
                                            value={data.name}
                                            onChange={handleOnChange}
                                            label="Nombre"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            disabled={!canEditUserInfo}
                                            name="last_name"
                                            value={data.last_name}
                                            onChange={handleOnChange}
                                            label="Apellidos"
                                        />
                                    </Grid>
                                </Grid>
                                <Box mt={2}>
                                    <Button
                                        disabled={!isDirty}
                                        type="submit"
                                        variant="contained"
                                        startIcon={
                                            processing && (
                                                <CircularProgress
                                                    size={16}
                                                    color="inherit"
                                                />
                                            )
                                        }
                                    >
                                        Guardar
                                    </Button>
                                </Box>
                            </Panel>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </AuthenticatedLayout>
    );
}
