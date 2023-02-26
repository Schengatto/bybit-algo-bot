import { FunctionComponent, ReactNode } from "react";
import ThemeSwitchButton from "./ThemeSwitchButton";

interface HeaderProps {
    children?: ReactNode;
}


const Header: FunctionComponent<HeaderProps> = ({ children }) => {
    return (
        <div>
            <div>Header</div>
            <div>
                <ThemeSwitchButton></ThemeSwitchButton>
            </div>
        </div>
    );
}

export default Header;