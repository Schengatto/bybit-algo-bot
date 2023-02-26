import React, { FunctionComponent } from "react";
import { ThemeContext, themes } from "../../contexts/Theme";

const ThemeSwitchButton: FunctionComponent = () => {
    const [darkMode, setDarkMode] = React.useState(true);

    return (
        <div className="App">
            <ThemeContext.Consumer>
                {({ changeTheme }) => (
                    <button
                        color="link"
                        onClick={() => {
                            setDarkMode(!darkMode);
                            changeTheme(darkMode ? themes.light : themes.dark);
                        }}
                    >
                        <i className={darkMode ? '🔆' : '🌜'}></i>
                        <span className="d-lg-none d-md-block">{darkMode ? '🔆' : '🌙'}</span>
                    </button>
                )}
            </ThemeContext.Consumer>
        </div>
    );
}

export default ThemeSwitchButton;