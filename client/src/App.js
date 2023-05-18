//files imported -- posts.js and form.js from components , getPosts method from /actions/posts
import React from "react";
import { Container } from '@material-ui/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

//layout of our app with material-ui styling
const App = () => {
  <BrowserRouter>
    <Container maxWidth="lg">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Container> 
  </BrowserRouter>
};

//exporting this component as default to index.js
export default App;
