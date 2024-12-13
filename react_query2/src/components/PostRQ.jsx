import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

//GET - method
const fetchPost = () => {
    return axios.get("http://localhost:4000/posts")

}

//POST-method
const addPost = (post) => {
    return axios.post("http://localhost:4000/posts", post)
}

const PostRQ = () => {

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPost,
        // staleTime:3000
        // refetchInterval:1000,
        // refetchIntervalInBackground:true
        // enabled: false
    })
   const queryClient= useQueryClient();
    const { mutate: addPostMutation } = useMutation({
        mutationFn: addPost,
        onSuccess:()=>{
            queryClient.invalidateQueries("posts")
        }
    })


    if (isLoading) {
        return <div>Loading....</div>
    }
    if (isError) {
        return <div>{error.message}</div>
    }
    console.log(data)
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("post data", { title, body });
        const post= { title, body };
        addPostMutation(post)
        setTitle("");
        setBody("");
    }
    return (
        <div className='post-list'>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='post title' onChange={(e) => setTitle(e.target.value)} value={title} />
                <input type="text" placeholder='post body' onChange={(e) => setBody(e.target.value)} value={body} />
                <button type='submit'>Post</button>
            </form>
            <button onClick={refetch}>Fetch Posts</button>
            {data?.data.map((post) => {
                return <Link to={`/rq-posts/${post.id}`}> <div className='post-item' key={post.id}>
                    <h3 className='post-title'>{post.title}</h3>
                    <p className='post-body'>{post.body}</p>
                </div>
                </Link>
            })}
        </div>
    )
}

export default PostRQ
