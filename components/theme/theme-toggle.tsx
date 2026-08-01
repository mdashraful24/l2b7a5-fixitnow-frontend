/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <Button
            variant="outline"
            size="icon"
            className="cursor-pointer"
            onClick={() => {
                if (theme === "light") {
                    setTheme("dark");
                } else if (theme === "dark") {
                    setTheme("system");
                } else {
                    setTheme("light");
                }
            }}
        >
            {theme === "light" ? (
                <Sun className="h-4 w-4" />
            ) : theme === "dark" ? (
                <Moon className="h-4 w-4" />
            ) : (
                <Monitor className="h-4 w-4" />
            )}

            <span className="sr-only">
                Toggle theme
            </span>
        </Button>
    );
}
