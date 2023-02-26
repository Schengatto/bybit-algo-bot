import { createContext } from "react";

export const themes = {
    dark: "",
    light: "white-contet"
};

export const ThemeContext = createContext({
    theme: themes.dark,
    changeTheme: (theme: any) => { }
})