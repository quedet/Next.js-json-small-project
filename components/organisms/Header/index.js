import NavMenu from "../../molecules/NavMenu"
import * as headerStyle from "./Header.module.css"

export default function HeaderComponent ({ NavLinks }) {
    return (
        <div className={headerStyle.header_container}>
            <NavMenu NavLinks={NavLinks}/>
        </div>
    )
}