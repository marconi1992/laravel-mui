import { useState } from "react";
import {
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    Divider,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import { Link as RouterLink, usePage } from "@inertiajs/react";

const AccountMenu = () => {
    const { auth } = usePage().props;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                onClick={handleClick}
                size="small"
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
            >
                <Avatar
                    sx={{
                        width: 32,
                        height: 32,
                        backgroundColor: "secondary.main",
                    }}
                >
                    {auth.user.name.charAt(0)}
                </Avatar>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
            >
                <MenuItem
                    component={RouterLink}
                    href={route("profile.edit")}
                    onClick={handleClose}
                >
                    Perfil
                </MenuItem>
                <Divider />
                <MenuItem
                    component={RouterLink}
                    href={route("logout")}
                    method="post"
                    onClick={handleClose}
                >
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Cerrar sesión
                </MenuItem>
            </Menu>
        </>
    );
};

export default AccountMenu;
