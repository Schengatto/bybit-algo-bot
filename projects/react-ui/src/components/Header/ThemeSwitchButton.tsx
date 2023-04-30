import React, { FunctionComponent } from "react";
import { ThemeContext, Theme } from "../../contexts/Theme";

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
                            changeTheme(darkMode ? Theme.Light : Theme.Dark);
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