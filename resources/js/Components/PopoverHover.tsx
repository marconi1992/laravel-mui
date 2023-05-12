import { Box, type IconButtonProps, IconButton, Popover } from "@mui/material";
import type React from "react";
import { useState } from "react";

interface PopoverOnHoverProps extends IconButtonProps {
    children: React.ReactNode;
    content: React.ReactNode;
}

const PopoverOnHover = ({
    children,
    content,
    ...buttonProps
}: PopoverOnHoverProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <IconButton
                {...buttonProps}
                aria-owns={open ? "mouse-over-popover" : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            >
                {children}
            </IconButton>
            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: "none",
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Box p={2}>{content}</Box>
            </Popover>
        </>
    );
};

export default PopoverOnHover;
