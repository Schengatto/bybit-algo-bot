import React, { useState, useEffect, FunctionComponent, ReactNode } from 'react';
import { ThemeContext, themes } from '../../contexts/Theme';

interface ThemeContextWrapperProps {
    children: ReactNode;
}

const ThemeContextWrapper: FunctionComponent<ThemeContextWrapperProps> = (props) => {
    const [theme, setTheme] = useState(themes.dark);

    const changeTheme = (theme: any) => setTheme(theme);

    useEffect(() => {
        switch (theme) {
            case themes.light:
                document.body.classList.add('white-content');
                break;
            case themes.dark:
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