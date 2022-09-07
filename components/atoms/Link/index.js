import * as link_style from './link.module.css';
import Link from 'next/link'

export default function NavLink ({ path, label, active }) {

    //.replace(/^\/+|\/+$/g, '')
    

    return (
        <div className={link_style.nav_item}>
            <Link href={path} className={active && link_style.active}>{label}</Link>
        </div>
    )
}