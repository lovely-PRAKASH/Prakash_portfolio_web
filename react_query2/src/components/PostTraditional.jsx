import axios from 'axios';
import React, { useEffect, useState } from 'react'

const PostTraditional = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{fetchPost()},[])

    const fetchPost = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get("http://localhost:4000/posts");
            setPosts(res.data);
            console.log(res.data)

        } catch (error) {
            setError(true)
        }
        finally {
            setIsLoading(false);
        }
    }

    if(isLoading){
        return <div>page is loading</div>
    }
    if(error){
        return <div>page had error</div>
    }
    return (
        <div className='post-list'>
            {posts.map((post) => {
                return <div className='post-item' key={post.id}>
                    <h3 className='post-title'>{post.title}</h3>
                    <p className='post-body'>{post.body}</p>

                </div>
            })}
        </div>
    )
}

export default PostTraditional
