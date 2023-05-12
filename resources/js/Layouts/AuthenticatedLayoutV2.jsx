import {
    AppBar as MuiAppBar,
    Toolbar,
    IconButton,
    Button,
    Box,
    Drawer as MuiDrawer,
    CssBaseline,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Container,
    useMediaQuery,
} from "@mui/material";
import {
    Menu as MenuIcon,
    ChevronLeft,
    ChevronRight,
    Dashboard,
} from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { Link as RouterLink, usePage } from "@inertiajs/react";
import AccountMenu from "@/Components/Toolbar/AccountMenu";
import useMiniDrawer from "@/Hooks/useMiniDrawer";
import route from "ziggy-js";

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    [theme.breakpoints.up("sm")]: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    },
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    [theme.breakpoints.down("sm")]: {
        display: "none",
    },
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

const MobileDrawer = styled(MuiDrawer)(({ theme }) => ({
    [theme.breakpoints.up("sm")]: {
        display: "none",
    },
    "& .MuiDrawer-paper": {
        width: drawerWidth,
    },
}));

const NavItemButton = styled(ListItemButton, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    px: 2.5,
    justifyContent: open ? "initial" : "center",
}));

const AuthenticatedLayout = ({ children }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const { auth } = usePage().props;

    const [open, setOpen] = useMiniDrawer(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const hasDrawer = auth.user.is_admin || auth.user.is_onboarded;

    const drawer = hasDrawer ? (
        <>
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === "rtl" ? (
                        <ChevronRight />
                    ) : (
                        <ChevronLeft />
                    )}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <NavItemButton
                        component={RouterLink}
                        href={route("dashboard")}
                        selected={route().current("dashboard")}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : "auto",
                                justifyContent: "center",
                            }}
                        >
                            <Dashboard />
                        </ListItemIcon>
                        <ListItemText
                            primary="Dashboard"
                            sx={{ opacity: open ? 1 : 0 }}
                        />
                    </NavItemButton>
                </ListItem>
            </List>
        </>
    ) : undefined;

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    {hasDrawer && (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                ...(open && { display: "none" }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Container
                        fixed
                        sx={{ px: { xs: 0, sm: "inherit" }, display: "flex" }}
                    >
                        {!hasDrawer && (
                            <Box display="flex" alignItems="center">
                                <Button
                                    component={RouterLink}
                                    color="inherit"
                                    sx={{ mr: 1, textTransform: "capitalize" }}
                                    href={route("my-project")}
                                >
                                    Emprende
                                </Button>
                                <Button
                                    component={RouterLink}
                                    color="secondary"
                                    sx={{ mr: 1, textTransform: "capitalize" }}
                                    href={route("investments.projects.index")}
                                >
                                    Invierte
                                </Button>
                            </Box>
                        )}
                        <Box
                            display="flex"
                            flexGrow={1}
                            justifyContent="flex-end"
                        >
                            <AccountMenu />
                        </Box>
                    </Container>
                </Toolbar>
            </AppBar>
            {hasDrawer ? (
                isMobile ? (
                    <MobileDrawer
                        container={window.document.body}
                        variant="temporary"
                        open={open}
                        onClose={handleDrawerClose}
                    >
                        {drawer}
                    </MobileDrawer>
                ) : (
                    <Drawer variant="permanent" open={open}>
                        {drawer}
                    </Drawer>
                )
            ) : undefined}
            <Box
                component="main"
                sx={{
                    pt: { xs: 7, sm: 8 },
                    width: "100%",
                    minHeight: "100vh",
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default AuthenticatedLayout;
