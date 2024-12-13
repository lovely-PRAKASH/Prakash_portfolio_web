import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addPost, fetchPosts, fetchTags } from '../api/api'
const PostList = () => {
    const [page, setPage]=useState(1);
    const queryClient = useQueryClient();
    const { error, isLoading, data: postData, isError } = useQuery({
        queryKey: ['posts',{page}],
        queryFn:()=> fetchPosts(page),
        staleTime: 1000*60*5
    })

    const { error: tagError, isLoading: tagLoading, data: tagsData, isError: isTagError } = useQuery({
        queryKey: ['tags'],
        queryFn: fetchTags,
        staleTime:Infinity,
    })

    const { mutate, isError: isPostError, isPending, error: postError } = useMutation({
        mutationFn: addPost,
        onMutate: () => (
            { id: 1 }
        ),
        onSuccess: (data, variables, context) => (
            queryClient.invalidateQueries({
                queryKey: [`posts`],
            })
        )
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const title = formData.get("title");
        const tags = Array.from(formData.keys()).filter(
            (key) => (formData.get(key) === "on")
        );
        if (!title || !tags.length === 0) return;
        // console.log(title, tags)
        mutate({ id: postData?.data?.length + 1, title, tags });

        e.target.reset();
    };
    return (
        <div className='container'>
            <form onSubmit={handleSubmit} >
                <input
                    type="text"
                    placeholder='Enter your title'
                    className='postbox'
                    name='title' />
                <div className="tags">
                    {tagsData?.map((tag) => (
                        <div key={tag}>
                            <input type="checkbox" name={tag} id={tag} />
                            <label htmlFor={tag}>{tag}</label>
                        </div>
                    ))}
                </div>
                <button type='submit'>Post</button>
            </form>

            {isLoading && <h1>Loading...</h1>}
            {isError && <p>{error?.message}</p>}

            <div className="pages">
                <button onClick={()=>setPage((prevPage)=>Math.max(prevPage-1,0))}
                    disabled={!postData?.prev}
                    >Previous Page</button>
                <span>{page}</span>
                <button  
                onClick={()=>setPage((prevPage)=>prevPage+1)}
                disabled={!postData?.next}
                >
                    Next Page
                    </button>
            </div>

            {postData?.data?.map((post, index) => (
                <div key={post.id} className='post'>
                    <p>{index + 1}</p>&nbsp;
                    <h2>{post.title}</h2>
                    {post.tags.map((tag, index) => (
                        <span key={index + 1}>{tag}</span>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default PostList
