import Link from "next/link"
import { fetcher } from "../../lib/api"

export async function getStaticPaths () {
    const posts = await fetcher(`${process.env.NEXT_JSON_PLACEHOLDER_URL}/posts/`)

    const paths = posts.map((post) => ({ 
        params: { id: post.id.toString() },
    }))

    return {
        paths: paths,
        fallback: false
    }
    
}

export async function getStaticProps ({ params }) {
    const post = await fetcher(`${process.env.NEXT_JSON_PLACEHOLDER_URL}/posts/${params.id}`)
    const user = await fetcher(`${process.env.NEXT_JSON_PLACEHOLDER_URL}/users/${post.userId}`)
    const comments = await fetcher(`${process.env.NEXT_JSON_PLACEHOLDER_URL}/posts/${params.id}/comments`)

    return {
        props: {
            post: post,
            user: user,
            comments: comments
        }
    }
}

export default function SinglePostPage ({ post, user, comments }) {    
    return (
        <div className="single-post-page">
            <div className="single-post-page-container">
                <header>
                    <h1>#{post.id} - {post.title}</h1>
                    <p>Written by <Link href={`/users/${user.id}`}>{user.name}</Link></p>
                </header>
                <div>
                    <p>{post.body}</p>
                </div>
                <div>
                    <h3>Comments</h3>
                    {comments && comments.map(comment => (
                        <div key={comment.id}>
                            <div><strong>{comment.email}</strong> said: </div>
                            <div><em>&ldquo;{comment.body}&rdquo;</em></div>
                            <br />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}