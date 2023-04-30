import { FunctionComponent, ReactNode } from "react";
import ThemeSwitchButton from "./ThemeSwitchButton";
// import "./Header.css";

interface HeaderProps {
    children?: ReactNode;
}

const Header: FunctionComponent<HeaderProps> = ({ children }) => {
    return (
        <div className="header__container">
            <div>Header</div>
            <div>
                <ThemeSwitchButton></ThemeSwitchButton>
            </div>
        </div>
    );
}

export default Header;