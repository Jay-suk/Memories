//files imported -- posts.js and form.js from components , getPosts method from /actions/posts
import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

//layout of our app with material-ui styling
const App = () => {

  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/posts" />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route 
            path="/auth" 
            element={user ? <Navigate to="/posts" /> : <Auth />} 
          />
        </Routes>
      </Container> 
    </BrowserRouter>
  );
};

//exporting this component as default to index.js
export default App;
