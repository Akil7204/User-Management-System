import React from 'react';
import {Link} from "react-router-dom";

function SignUp() {
  return (
    <div className='p-4 max-w-lg mx-auto '>
      <h1 className='text-3xl text-center font-semibold my-8'>Sign Up</h1>
      <form className='flex flex-col gap-4' >
        <input type="text" placeholder='userName' id="username" className='bg-slate-200 p-3 rounded-lg' />
        <input type="email" placeholder='Email' id="email" className='bg-slate-200 p-3 rounded-lg' />
        <input type="password" placeholder='password' id="username" className='bg-slate-200 p-3 rounded-lg' />
        <button className='bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80'>Sign up</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to="/signIn">
          <span className='text-blue-500'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp