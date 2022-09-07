import Link from "next/link"
import { fetcher } from "../../utilities/api"

export async function getStaticPaths() {
    const users = await fetcher(`${process.env.NEXT_JSON_PLACEHOLDER_URL}/users`)

    const paths = users.map(user => (
        { params: { userId: user.id.toString() }}
    ))

    return {
        paths: paths,
        fallback: false
    }
}

export async function getStaticProps ({ params }) {
    const user = await fetcher(`${process.env.NEXT_JSON_PLACEHOLDER_URL}/users/${params.userId}`)
    const posts = await fetcher(`${process.env.NEXT_JSON_PLACEHOLDER_URL}/users/${params.userId}/posts`)
    
    return {
        props: {
            user: user,
            posts: posts
        }
    }
}

export default function SingleUserPage({ user, posts }) {
    return (
        <div>
            <div>
                <header>
                    <h1>{user.name}</h1>
                </header>
                <div>
                    <h3>Personal Information</h3>
                    <p>{user.username}</p>
                    <p>{user.phone}</p>
                    <p>{user.address.street}</p>
                </div>
                <div>
                    <h3>My posts</h3>
                    {posts && posts.map(post => (
                            <div key={post.id}>
                                <Link href={`/posts/${post.id}/`}>
                                    <div>
                                        #{post.id} - { post.title }
                                    </div>
                                </Link>
                                <br />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}