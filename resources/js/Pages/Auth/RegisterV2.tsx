import { useEffect, useState } from "react";
import GuestLayout from "@/Layouts/GuestLayoutV2";
import { Head, Link as RouterLink, useForm } from "@inertiajs/react";
import {
    TextField,
    Link,
    Box,
    Button,
    Radio,
    RadioGroup,
    FormControl,
    FormLabel,
    FormControlLabel,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import route from "ziggy-js";
import { type Dayjs } from "dayjs";

interface FormState {
    name: string;
    last_name: string;
    gender: "male" | "female" | "other";
    birthdate: string;
    email: string;
    password: string;
    password_confirmation: string;
}

const initialFormState: FormState = {
    name: "",
    last_name: "",
    gender: "male",
    birthdate: "",
    email: "",
    password: "",
    password_confirmation: "",
} as const;

export default function Register() {
    const [bithdateObj, setBirthDateObj] = useState<null | Dayjs>(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        ...initialFormState,
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
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

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <GuestLayout>
                <Head title="Registro" />

                <form onSubmit={submit}>
                    <div>
                        <TextField
                            fullWidth
                            size="small"
                            label="Nombre"
                            id="name"
                            name="name"
                            value={data.name}
                            autoComplete="name"
                            onChange={handleOnChange}
                            required
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                    </div>

                    <Box sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Apellidos"
                            id="name"
                            name="last_name"
                            value={data.last_name}
                            onChange={handleOnChange}
                            required
                            error={!!errors.last_name}
                            helperText={errors.last_name}
                        />
                    </Box>

                    <FormControl sx={{ mt: 2 }}>
                        <FormLabel id="gender">Sexo</FormLabel>
                        <RadioGroup
                            sx={{ flexDirection: "row" }}
                            aria-labelledby="gender"
                            value={data.gender}
                            name="gender"
                            onChange={handleOnChange}
                        >
                            <FormControlLabel
                                label="Masculino"
                                value="male"
                                control={<Radio />}
                            />
                            <FormControlLabel
                                label="Femenino"
                                value="female"
                                control={<Radio />}
                            />
                            <FormControlLabel
                                label="Otro"
                                value="other"
                                control={<Radio />}
                            />
                        </RadioGroup>
                    </FormControl>

                    <FormControl sx={{ mt: 1 }}>
                        <FormLabel id="birthdate">
                            Fecha de Nacimiento
                        </FormLabel>
                        <DesktopDatePicker
                            sx={{
                                mt: 1,
                                ".MuiInputBase-input": {
                                    height: "8px",
                                },
                            }}
                            value={bithdateObj}
                            onChange={(newValue) => {
                                setBirthDateObj(newValue);
                                setData(
                                    "birthdate",
                                    newValue ? newValue.format() : ""
                                );
                            }}
                        />
                    </FormControl>

                    <Box sx={{ mt: 2 }}>
                        <TextField
                            label="Correo Electronico"
                            fullWidth
                            size="small"
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            autoComplete="username"
                            onChange={handleOnChange}
                            required
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                    </Box>

                    <Box sx={{ mt: 2 }}>
                        <TextField
                            label="Contraseña"
                            fullWidth
                            size="small"
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            autoComplete="new-password"
                            onChange={handleOnChange}
                            required
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                    </Box>

                    <Box sx={{ mt: 2 }}>
                        <TextField
                            label="Confirmar Contraseña"
                            fullWidth
                            size="small"
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={handleOnChange}
                            required
                            error={!!errors.password_confirmation}
                            helperText={errors.password_confirmation}
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
                            component={RouterLink}
                            variant="body1"
                            href={route("login")}
                        >
                            ¿Estas registrado?
                        </Link>

                        <Button
                            sx={{ ml: 4 }}
                            type="submit"
                            variant="contained"
                            disabled={processing}
                        >
                            Registrate
                        </Button>
                    </Box>
                </form>
            </GuestLayout>
        </LocalizationProvider>
    );
}
