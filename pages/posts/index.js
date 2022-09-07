import Link from 'next/link'

export async function getStaticProps() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const posts = await response.json()

    return {
        props: {
            posts
        }
    }
}

export default function PostsPage({ posts }) {
    return (
        <div className="posts-page">
            <div className="posts-container">
                <header className="posts-page--header">
                    <h1>All Posts</h1>
                </header>
                <div className="posts-page--body">
                    <div>
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
        </div>
    )
}