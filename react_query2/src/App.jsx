import React from 'react'
import Home from './components/Home';
import PostTraditional from './components/PostTraditional';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import PostRQ from './components/PostRQ';
import "./App.css"
import PostDetailsRQ from './components/PostDetailsRQ';
import PaginatedRQ from './components/PaginatedRQ';
import InfiniteRQ from './components/InfiniteRQ';
const App = () => {
  return (
    <BrowserRouter>
      <div className='app'>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/posts">Traditional Post</Link>
            </li>
            <li>
              <Link to="/rq-posts">React query post</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/posts' element={<PostTraditional />} />
          <Route exact path='/rq-posts' element={<PostRQ />} />
          <Route exact path='/rq-posts/:postId' element={<PostDetailsRQ/>} />
          <Route exact path='/paginated-fruits' element={<PaginatedRQ/>} />
          <Route exact path='/Infinite-fruits' element={<InfiniteRQ/>} />
        </Routes>
      </div>
    </BrowserRouter>

  )
}

export default App
