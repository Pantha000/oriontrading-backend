import React from 'react';
import WallatNav from '../../components/WallatNav';

const FundTransfer = () => {
    return (
        <div className='pt-28 container mx-auto px-4'>
            <WallatNav />
            <div className='grid gap-8 sm:gap-12 md:gap-16 lg:gap-20 m-4 sm:m-8 md:m-12 lg:m-20 grid-cols-1 sm:grid-cols-2'>
                <div className='flex flex-col'>
                    <h1 className='text-2xl sm:text-3xl text-primary my-3 font-semibold'>Transfer to Spot</h1>
                    <div className='grid gap-4'>
                        <div>
                            <p className='text-sm sm:text-base'>From Wallet</p>
                            <input className="appearance-none border rounded py-2 px-3 focus:shadow-outline" id="from-wallet" type="text" placeholder="Funding" />
                        </div>
                        <div>
                            <p className='text-sm sm:text-base'>To Wallet</p>
                            <input className="appearance-none border rounded py-2 px-3 focus:shadow-outline" id="to-wallet" type="text" placeholder="Spot" />
                        </div>
                        <div>
                            <p className='text-sm sm:text-base'>Amount</p>
                            <input className="appearance-none border rounded py-2 px-3 focus:shadow-outline" id="amount" type="text" placeholder="Enter Amount" />
                        </div>
                    </div>
                    <button className='bg-primary p-2 sm:p-4 w-full sm:w-1/3 md:w-1/4 lg:w-1/5 my-4 rounded-xl text-white'>Transfer</button>
                </div>
                <div className='flex items-center justify-center sm:justify-end'>
                    <h1 className='text-end text-primary text-lg sm:text-xl font-semibold'>Available: 500.00 USD</h1>
                </div>
            </div>
        </div>
    );
};

export default FundTransfer;
