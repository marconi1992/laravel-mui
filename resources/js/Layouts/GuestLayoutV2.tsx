import { Box } from "@mui/system";
import { CssBaseline } from "@mui/material";
import type React from "react";

interface GuestProps {
    children: React.ReactNode;
}

export default function Guest({ children }: GuestProps) {
    return (
        <>
            <CssBaseline />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                minHeight="inherit"
                height="100vh"
            >
                <Box width="360px">{children}</Box>
            </Box>
        </>
    );
}
