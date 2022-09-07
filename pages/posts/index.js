import Link from 'next/link'
import useSWR from 'swr'

import { useState } from 'react'
import { fetcher } from '../../utilities/api'

export async function getStaticProps() {
    const posts = await fetcher(`${process.env.NEXT_JSON_PLACEHOLDER_URL}/posts`)

    return {
        props: {
            posts
        }
    }
}

export default function PostsPage({ posts }) {
    const [pageIndex, setPageIndex] = useState(1)

    const {data} = useSWR(`https://jsonplaceholder.typicode.com/posts?pagination[page]=${pageIndex}&pagination[pageSize]=4`, fetcher, {
        fallbackData: posts
    })
    
    return (
        <div className="posts-page">
            <div className="posts-container">
                <header className="posts-page--header">
                    <h1>All Posts</h1>
                </header>
                <div className="posts-page--body">
                    <div>
                        {data && data.map(post => (
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