import { type InertiaLinkProps, Link as RouterLink } from "@inertiajs/react";
import { ListItemButton, type ListItemButtonProps } from "@mui/material";

type ListItemLinkProps = ListItemButtonProps & InertiaLinkProps;

const ListItemLink = (props: ListItemLinkProps) => {
    return <ListItemButton component={RouterLink} {...props} />;
};

export default ListItemLink;
