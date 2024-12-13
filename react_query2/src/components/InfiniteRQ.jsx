import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect } from 'react'
import { InView, useInView } from "react-intersection-observer";

const fetchFruits = ({pageParam}) => {
    return axios.get(`http://localhost:4000/fruits/?_limit=10&_page=${pageParam}`)
}

const InfiniteRQ = () => {

    const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ["fruits"],
        queryFn: fetchFruits,
        initialPageParam:1,
        getNextPageParam:(_lastPage, allPages)=>{
            if(allPages.length<5){
                return allPages.length + 1 ;
            }else{
                return undefined;
            }
        }
    })
    console.log(data, "data")

    const {ref, inView}=useInView();

    useEffect(()=>{
        if(inView){
             fetchNextPage();
        }
    },[fetchNextPage, inView])

    if (isLoading) {
        return <div>Loading....</div>
    }
    if (isError) {
        return <div>{error.message}</div>
    }
    return (
        <div className='container'>
            {data?.pages.map((page)=>{
                return page?.data.map((fruit)=>{
                    return <div className='fruit-item' key={fruit.id}>
                        {fruit.name}
                    </div>
                })
            })}

            {/* <button disabled={!hasNextPage} onClick={fetchNextPage}>Load More...</button> */}
            <div ref={ref}>{isFetchingNextPage && "Loading..."}</div>
        </div>
    )
}

export default InfiniteRQ
