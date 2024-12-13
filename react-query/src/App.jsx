import { useState } from 'react'
import './App.css'
import PostList from './components/PostList';

function App() {

  return (
    <>
    <h2 className='title'>My posts</h2>
      <PostList/>
    </>
  )
}

export default App
