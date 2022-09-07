import '../styles/globals.css'
import Link from 'next/link'

const NavLists = [
    {
        id: 1,
        path: '/',
        label: 'Home'
    },
    {
        id: 2,
        path: '/posts',
        label: 'Posts'
    },
    {
        id: 3,
        path: '/help',
        label: 'Help'
    }
]

export default function MyApp({ Component, pageProps }) {
    return (
        <div id='my-app'>
            <header>
                <nav>
                    {NavLists && NavLists.map(nav => (
                        <div key={nav.id}>
                            <Link href={nav.path}>{nav.label}</Link>
                        </div>
                    ))}
                </nav>
            </header>
            <main>
                <Component {...pageProps} />
            </main>
            <footer></footer>
        </div>
    )
}