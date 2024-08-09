import React from 'react';
import signUp from '../assets/register.jpeg'
import Logo from '../assets/Logo.png'
import { Link } from 'react-router-dom';
const SignUp = () => {
    return (
        <div className="font-[sans-serif] text-[#333] bg-white md:h-screen p-4">


            <div className="grid grid-cols-2 justify-center items-center gap-8">
                <div className="  w-full  md:rounded-tr-xl md:rounded-br-xl lg:p-12 grid grid-cols-1 justify-center items-center gap-6 p-8">
                    <img src={Logo} className=" w-2/5 object-contain block mx-auto" alt="login-image" />
                    <img src={signUp} className="  w-full h-full object-contain block mx-auto" alt="login-image" />

                </div>
                <form className="max-w-md w-full mx-auto">
                    <div className="mb-12">
                        <h3 className=" text-primary text-center text-4xl font-extrabold">Sign up</h3>
                        <p className='m-3 text-primary text-center'>Create Your account start investing today</p>
                    </div>
                    <div className='bg-bg2 p-8 rounded'>
                        <div className=''>
                            <p>User Id</p>
                            <div className="relative flex items-center">
                                <input name="email" type="text" required className="w-full text-sm border-b border-gray-300 bg-bg2 focus:border-blue-600  py-3 outline-none" placeholder="Enter user id" />
                            </div>
                        </div>
                        <div className=''>
                            <p>Full name</p>
                            <div className="relative flex items-center">
                                <input name="email" type="text" required className="w-full text-sm border-b border-gray-300 bg-bg2 focus:border-blue-600  py-3 outline-none" placeholder="Enter your name" />
                            </div>
                        </div>
                        <div className=''>
                            <p>Email</p>
                            <div className="relative flex items-center">
                                <input name="email" type="text" required className="w-full text-sm border-b border-gray-300 bg-bg2 focus:border-blue-600  py-3 outline-none" placeholder="Enter your email" />
                            </div>
                        </div>
                        <div className=''>
                            <p>referral Id</p>
                            <div className="relative flex items-center">
                                <input name="email" type="text" required className="w-full text-sm border-b border-gray-300 bg-bg2 focus:border-blue-600  py-3 outline-none" placeholder="Enter referral id" />
                            </div>
                        </div>
                        <div className=''>
                            <p>Phone</p>
                            <div className="relative flex items-center">
                                <input name="email" type="text" required className="w-full text-sm border-b border-gray-300 bg-bg2 focus:border-blue-600  py-3 outline-none" placeholder="Enter your phone"/>
                            </div>
                        </div>
                        <div className=''>
                            <p>password</p>
                            <div className="relative flex items-center">
                                <input name="email" type="text" required className="w-full text-sm border-b border-gray-300 bg-bg2 focus:border-blue-600  py-3 outline-none" placeholder="Enter password" />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2 cursor-pointer" viewBox="0 0 128 128">
                                <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                            </svg>
                            </div>
                        </div>
                        <div className=''>
                            <p>Confirm Password</p>
                            <div className="relative flex items-center">
                                <input name="email" type="text" required className="w-full text-sm border-b border-gray-300 bg-bg2 focus:border-blue-600  py-3 outline-none" placeholder="Enter confirm password " />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2 cursor-pointer" viewBox="0 0 128 128">
                                <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                            </svg>
                            </div>
                        </div>
                        <div className="flex items-center justify-between gap-2 mt-6">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-primary focus:ring-blue-500 border-gray-300 rounded" />
                                <label for="remember-me" className="ml-3 block text-sm">
                                    I agree <span className='text-primary'> term and condition</span>
                                </label>
                            </div>

                        </div>
                        <div className="mt-12 grid justify-center">
                            <button type="button" className="w-full  shadow-xl py-2.5 px-4 text-sm font-semibold rounded-full text-white bg-primary hover:bg-blue-700 focus:outline-none">
                                Sign Up
                            </button>
                            <p className="text-sm text-center mt-8">Already have an account <Link to='/login' className="text-primary font-semibold hover:underline ml-1 whitespace-nowrap">log in</Link></p>
                        </div>
                    </div>

                </form>
            </div>

        </div>
    );
};

export default SignUp;