import GuestLayout from "@/Layouts/GuestLayoutV2";
import { Head, Link as RouterLink, useForm } from "@inertiajs/react";
import { Box, Button, Typography } from "@mui/material";
import type React from "react";

interface VerifyEmailProps {
    status: string;
}

export default function VerifyEmail({ status }: VerifyEmailProps) {
    const { post, processing } = useForm({});

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // @ts-expect-error -- we dont support this helpert in TS yet
        post(route("verification.send"));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <Typography mb={4} variant="subtitle1" color="text.secondary">
                ¡Gracias por registrarte! Antes de comenzar, ¿Podrias verificar
                tu correo electronico abriendo el enlace que te hemos enviado?
                Si no lo has recibido, te podremos enviar otro.
            </Typography>

            {status === "verification-link-sent" && (
                <Typography mb={4} variant="body2" color="secondary.dark">
                    Un nuevo correo de verificación ha sido enviado
                </Typography>
            )}

            <form onSubmit={submit}>
                <Box mt={4}>
                    <Button disabled={processing} type="submit">
                        Reenviar correo de verificacion
                    </Button>

                    <Button
                        // @ts-expect-error -- we dont support this helpert in TS yet
                        href={route("logout")}
                        method="post"
                        component={RouterLink}
                    >
                        Cerrar sesión
                    </Button>
                </Box>
            </form>
        </GuestLayout>
    );
}
