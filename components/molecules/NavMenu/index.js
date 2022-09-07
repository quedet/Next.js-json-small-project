import NavLink from "../../atoms/Link"
import * as NavMenuLink from "./navmenu.module.css"

export default function NavMenu ({ NavLinks }) {

    return (
        <nav className={NavMenuLink.nav_menu}>
            {NavLinks && NavLinks.map(item => (
                <NavLink key={item.id} path={item.path} label={item.label} />
            ))}
        </nav>
    )
}