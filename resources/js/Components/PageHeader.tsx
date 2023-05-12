import {
    Box,
    Breadcrumbs,
    Container,
    Link,
    Paper,
    type PaperProps,
    Typography,
} from "@mui/material";
import { Link as RouterLink } from "@inertiajs/react";
import type React from "react";

export interface BreadcrubmLink {
    title: string;
    href: string;
}

interface PageHeaderProps extends PaperProps {
    title: string;
    extraTitle?: React.ReactNode;
    breadcrumbLinks?: BreadcrubmLink[];
    children?: React.ReactNode;
}

const PageHeader = ({
    title,
    extraTitle,
    breadcrumbLinks = [],
    children,
    ...paperProps
}: PageHeaderProps) => {
    return (
        <Paper elevation={0} sx={{ py: 3 }} square {...paperProps}>
            <Container fixed>
                <Box display="flex">
                    <Typography variant="h5" sx={{ mb: 2 }}>
                        {title}
                    </Typography>
                    {extraTitle}
                </Box>
                <Breadcrumbs>
                    <Link
                        underline="hover"
                        component={RouterLink}
                        color="inherit"
                        // @ts-expect-error -- we dont support this helper in TS yet
                        href={route("dashboard")}
                    >
                        Dashboard
                    </Link>
                    {breadcrumbLinks.map((link) => (
                        <Link
                            key={link.href}
                            underline="hover"
                            component={RouterLink}
                            color="inherit"
                            href={link.href}
                        >
                            {link.title}
                        </Link>
                    ))}
                    <Typography color="text.primary">{title}</Typography>
                </Breadcrumbs>
                {children}
            </Container>
        </Paper>
    );
};

export default PageHeader;
