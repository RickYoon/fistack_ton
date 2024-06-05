import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled, { keyframes } from 'styled-components';

import TopNavLanding from "component/topNavLanding"

import Landing from "pages/Landing"

// import ProductsPage from "pages/ProductsPage"

// import DetailStaking from "pages/Detail_Staking"
// import DetailLending from "pages/Detail_Lending"

import ScrollTop from 'ScrollTop';
import './App.css';


function App() {
  

  return (
    <>
      <Router>

        <ScrollTop />
          <Routes>
            <Route path="/" element={<TopNavLanding />} />
            <Route path="/products" element={<TopNavLanding />} />
          </Routes>
          
          <Routes>
            <Route exact path="/" element={<Landing />} />
            {/* <Route path="/products" element={<ProductsPage />} />
            <Route path="/detail/lending/:id" element={<DetailLending />} />
            <Route path="/detail/staking/:id" element={<DetailStaking />} /> */}
          </Routes>
          <Routes>
          
          <Route path="/" element={<Footer />} />

        </Routes>
      </Router>
    </>
  );
}


function Footer () {

  return (
    <FooterBox>
    <footer class="bg-white rounded-lg shadow dark:bg-gray-800">
        <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024
          <span class="hover:underline"> Pure Velley Labs™</span>. All Rights Reserved.
        </span>
          <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            {/* <li>
                <a href="#" class="hover:underline me-4 md:me-6">About</a>
            </li>
            <li>
                <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
            </li>
            <li>
                <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
            </li> */}
            <li>
                <a href="mailto:yoon1515@gmail.com" class="hover:underline">Contact</a>
            </li>
        </ul>
        </div>
    </footer>
    </FooterBox>
  )
}


const FooterBox = styled.div`
  /* height: 100px; */
  /* position : relative;
  transform : translateY(-100%); */
`

export default App;
