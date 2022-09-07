import '../styles/globals.css'
import HeaderComponent from '../components/organisms/Header'

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
            <header className='app-header'>
                <HeaderComponent NavLinks={NavLists} />
            </header>
            <main>
                <Component {...pageProps} />
            </main>
            <footer></footer>
        </div>
    )
}