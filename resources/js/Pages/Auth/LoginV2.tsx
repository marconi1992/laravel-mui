import { type FormEvent, useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayoutV2";
import { Head, Link as RouterLink, useForm } from "@inertiajs/react";
import {
    TextField,
    Checkbox,
    Box,
    FormControlLabel,
    Link,
    Button,
    Typography,
} from "@mui/material";

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData(
            // @ts-expect-error by default the target can be any string
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();

        // @ts-expect-error -- we dont support this helper in TS yet
        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Inicia sesión" />
            <Typography variant="h4" textAlign="center" fontWeight="500" mb={3}>
                Inicia sesión
            </Typography>
            <form onSubmit={submit}>
                <div>
                    <TextField
                        fullWidth
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="username"
                        onChange={handleOnChange}
                        variant="outlined"
                        label="Correo Electronico"
                        helperText={errors.email}
                        error={!!errors.email}
                    />
                </div>

                <Box sx={{ mt: 3 }}>
                    <TextField
                        fullWidth
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={handleOnChange}
                        label="Contraseña"
                        helperText={errors.password}
                        error={!!errors.password}
                    />
                </Box>

                <Box sx={{ mt: 2 }}>
                    <FormControlLabel
                        label="Recordar usuario"
                        control={
                            <Checkbox
                                name="remember"
                                value={data.remember}
                                onChange={handleOnChange}
                            />
                        }
                    />
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "end",
                        mt: 2,
                    }}
                >
                    <Link
                        variant="body1"
                        component={RouterLink}
                        // @ts-expect-error -- we dont support this helper in TS yet
                        href={route("register")}
                    >
                        ¿Aún no tienes cuenta?
                    </Link>
                    <Button
                        type="submit"
                        sx={{ ml: 4 }}
                        variant="contained"
                        disabled={processing}
                    >
                        Iniciar Sesion
                    </Button>
                </Box>
            </form>
        </GuestLayout>
    );
}
