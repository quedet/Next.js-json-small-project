import Link from "next/link"

export async function getStaticPaths() {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`)
    const users = await response.json()

    const paths = users.map(user => (
        { params: { userId: user.id.toString() }}
    ))

    return {
        paths: paths,
        fallback: false
    }
}

export async function getStaticProps ({ params }) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${params.userId}`)
    const user = await response.json()

    const userPosts = await fetch(`https://jsonplaceholder.typicode.com/users/${params.userId}/posts`)
    const posts = await userPosts.json()

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