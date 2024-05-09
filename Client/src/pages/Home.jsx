import React from 'react'
import { useSelector } from 'react-redux';
import Header from '../Components/Header';

function Home() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
    <Header />
    <div className='px-4 py-12 max-w-2xl mx-auto'>
    <h1 className='text-3xl font-bold  mb-4 text-slate-800'>
      Welcome to my User Management System!
    </h1>
    <h2 className='text-3xl font-bold text-center underline mb-4 text-slate-800'>{currentUser && `Hi ${currentUser.userName}`}</h2>
    
  </div>
  </>
  )
}

export default Home