import { Button, CircularProgress, type ButtonProps } from "@mui/material";

interface ButtonLoaderProps extends ButtonProps {
    isLoading?: boolean;
}
const ButtonLoader = ({
    isLoading = false,
    ...buttonProps
}: ButtonLoaderProps) => {
    return (
        <Button
            startIcon={
                isLoading && <CircularProgress size={16} color="inherit" />
            }
            {...buttonProps}
        />
    );
};

export default ButtonLoader;
