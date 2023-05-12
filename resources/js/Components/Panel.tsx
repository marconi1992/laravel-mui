import {
    Paper,
    type PaperProps,
    Typography,
    Box,
    type BoxProps,
} from "@mui/material";

interface PanelProps extends BoxProps {
    title: string;
    extraTitle?: React.ReactNode;
    children: React.ReactNode;
    paperProps?: Omit<PaperProps, "sx">;
}

const Panel = ({
    title,
    extraTitle,
    children,
    paperProps,
    sx,
    ...boxProps
}: PanelProps) => {
    return (
        <Box {...boxProps}>
            <Paper sx={{ p: 3, ...sx }} {...paperProps}>
                <Box display="flex" alignItems="center" mb={3}>
                    <Typography variant="h6" flexGrow={1}>
                        {title}
                    </Typography>
                    {extraTitle}
                </Box>

                {children}
            </Paper>
        </Box>
    );
};

export default Panel;
