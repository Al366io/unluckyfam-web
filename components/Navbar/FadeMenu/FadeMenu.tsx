import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import navbarStyles from "../Navbar.module.css";
import Link from "next/link";


export default function FadeMenu() {
    const pages = ["HOME", "MUSIC", "LYRICS", "MERCH", "ABOUT"];
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={navbarStyles.burgerContainer}>
            <Button
                id="fade-button"
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                style={{ color: "white" }}
            >
                <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1}
                        stroke="currentColor"
                        className={navbarStyles.burgerMenu}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                    </svg>
            </Button>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    "aria-labelledby": "fade-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                {pages.map((page, index) => (
                    <li key={page}>
                        <Link href={page === "HOME" ? "/" : "/" + page.toLowerCase().replace(/[\s?]/g, "")}>
                            <MenuItem onClick={handleClose} className={navbarStyles.link}>
                                {page}
                            </MenuItem>
                            {index < pages.length - 1 && <hr className={navbarStyles.hr} />}
                        </Link>
                    </li>
                ))}
            </Menu>
        </div>
    );
}
