import React from 'react';
import WallatNav from '../../components/WallatNav';

const FundWithdraw = () => {
    return (
        <div className='container pt-28 mx-auto px-4'>
            <WallatNav />
            <form action="" className='m-4 sm:m-8 md:m-12 lg:m-20'>
                <div className='grid grid-cols-1 gap-4 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto'>
                    <h1 className='font-semibold text-xl sm:text-2xl'>Withdraw</h1>
                    <input className="appearance-none border rounded py-2 px-3 focus:shadow-outline" id="amount" type="text" placeholder="Enter Amount" />
                    <input className="appearance-none border rounded py-2 px-3 focus:shadow-outline" id="address" type="text" placeholder="TRC20 Address" />
                    <input className="appearance-none border rounded py-2 px-3 focus:shadow-outline" id="otp" type="text" placeholder="OTP code" />
                </div>
                <div className='mt-6 sm:mt-8 md:mt-10 lg:mt-12 grid grid-cols-1 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto'>
                    <h1 className='font-semibold text-lg sm:text-xl md:text-2xl'>Withdraw Password</h1>
                    <div className='flex flex-col sm:flex-row items-center'>
                        <input className="w-full sm:w-4/5 appearance-none border rounded py-2 px-3 focus:shadow-outline" id="withdraw-password" type="text" placeholder="Withdraw password" />
                        <button className='bg-primary p-2 sm:p-4 rounded-lg sm:rounded-2xl mt-4 sm:mt-0 ms-0 sm:ms-5 text-white w-full sm:w-auto'>Withdraw</button>
                    </div>
                </div>
                <p className='text-sm sm:text-base md:text-lg text-primary mt-4'>
                    <li className='py-2'>To initiate a withdrawal, you need to have a minimum of 10.00 USDT in your account</li>
                </p>
            </form>
        </div>
    );
};

export default FundWithdraw;
