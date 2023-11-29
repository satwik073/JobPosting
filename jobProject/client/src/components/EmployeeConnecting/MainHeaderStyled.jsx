import React from 'react';
import Navbar from './Navbar';
import "./StyleSheets/Global.css";
import UserDash from '../PostedContent/UserDash';
import DummyPost from '../PostedContent/DummyPost';
import UserDummyDash from '../PostedContent/userDummyDash';

const Home = () => {
  return (
    <div>
      <Navbar/>
    <div className='p-5 md:p-10 lg:p-16 md:flex'>
      <div className='md:w-1/2 md:mt-[5rem] mt-[3rem] md:pr-8'>
        <h1 className='HeadingStyled text-4xl md:text-6xl lg:text-7xl mt-8 md:mt-0 leading-9'>Get hired by popular teams</h1>
        <p className='ParaStyled mt-7 text-sm md:text-base lg:text-lg text-gray-500 font-light'>Find jobs according to your interest. Simply click on search and choose a category based on your skills.</p>
      </div>
   
    </div>
    <UserDummyDash/>
    </div>
  );
}

export default Home;
