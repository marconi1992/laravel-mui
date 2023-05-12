import { useTheme, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";

export const drawerOpenKey = "drawerOpen";

const useMiniDrawer = (defaultOpen: boolean) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const [open, setOpen] = useState(
        isMobile
            ? false
            : localStorage.getItem(drawerOpenKey)
            ? localStorage.getItem(drawerOpenKey) === "true"
            : defaultOpen
    );

    useEffect(() => {
        localStorage.setItem(drawerOpenKey, Boolean(open).toString());
    }, [open]);

    return [open, setOpen] as const;
};

export default useMiniDrawer;
