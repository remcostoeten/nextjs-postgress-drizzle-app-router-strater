'use client';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import React, { useState, useEffect } from 'react';
const ThemeToggle = () => {
    const [theme, setTheme] = useState(localStorage.theme);

    const toggleTheme = () => {
        if (theme === 'dark') {
            localStorage.theme = 'light';
            document.documentElement.classList.remove('dark');
            setTheme('light');
        } else {
            localStorage.theme = 'dark';
            document.documentElement.classList.add('dark');
            setTheme('dark');
        }
    };

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            setTheme('dark');
        } else {
            document.documentElement.classList.remove('dark');
            setTheme('light');
        }
    }, []);

    return (
        <button onClick={toggleTheme}>
            {theme === 'dark' ? <SunIcon/> : <MoonIcon/>}
        </button>
    );
};

export default ThemeToggle;