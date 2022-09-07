import Link from "next/link"

export async function getStaticPaths () {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/`)
    const posts = await response.json()

    const paths = posts.map((post) => ({ 
        params: { id: post.id.toString() },
    }))

    return {
        paths: paths,
        fallback: false
    }
    
}

export async function getStaticProps ({ params }) {
    const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
    const post = await postResponse.json()

    const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
    const user = await userResponse.json()

    const commentResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}/comments`)
    const comments = await commentResponse.json()

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
                            <div><em>"{comment.body}"</em></div>
                            <br />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}