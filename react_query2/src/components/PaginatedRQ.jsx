import { keepPreviousData, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'

const fetchFruits = (pageId) => {
    return axios.get(`http://localhost:4000/fruits?_limit=4&_page=${pageId}`)
}

const PaginatedRQ = () => {
    const [page, setPage] = useState(1);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["fruits",page],
        queryFn: () => fetchFruits(page),
        placeholderData:keepPreviousData

    })
    if (isLoading) {
        return <div>Loading....</div>
    }
    if (isError) {
        return <div>{error.message}</div>
    }
    return (
        <div className='container'>
            {data?.data.map((fruit) => {
                return <div key={fruit.id} className='fruit-label'>
                    {fruit.name}
                </div>
            })}
            <div>
                <button onClick={() => { setPage(prev => prev - 1) }} disabled={page == 1}>Prev</button>
                <button onClick={() => { setPage(prev => prev + 1) }} disabled={page == 5}>Next</button>
            </div>

        </div>
    )
}

export default PaginatedRQ
