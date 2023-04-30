import { createContext } from "react";

export enum Theme {
    Dark = "",
    Light = "white-contet"
};

export const ThemeContext = createContext({
    theme: Theme.Dark,
    changeTheme: (theme: Theme) => { }
})