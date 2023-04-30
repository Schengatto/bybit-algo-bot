import React, { useState, useEffect, FunctionComponent, ReactNode } from 'react';
import { ThemeContext, Theme } from '../../contexts/Theme';

interface ThemeContextWrapperProps {
    children: ReactNode;
}

const ThemeContextWrapper: FunctionComponent<ThemeContextWrapperProps> = (props) => {
    const [theme, setTheme] = useState(Theme.Dark);

    const changeTheme = (theme: any) => setTheme(theme);

    useEffect(() => {
        switch (theme) {
            case Theme.Light:
                document.body.classList.add('white-content');
                break;
            case Theme.Dark:
            default:
                document.body.classList.remove('white-content');
                break;
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
            {props.children}
        </ThemeContext.Provider>
    );
}

export default ThemeContextWrapper;