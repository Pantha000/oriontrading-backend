import React, { useState, useEffect } from 'react';
import WallatNav from '../../components/WallatNav';

const Ots = () => {
    const [modal, setModal] = useState(false);

    const handelModal = () => {
        setModal(!modal);
        console.log(modal);
    };

    useEffect(() => {
        if (modal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [modal]);

    return (
        <div className='pt-28 mx-auto container px-4'>
            <WallatNav />
            <div className='m-10'>
                <h1 className='text-primary text-2xl font-bold p-2'>Sent History</h1>
                <h1 className='p-2 font-bold'>0 item found</h1>
                <h1 className='p-2 font-bold'>Amount: 0.00 USD</h1>
                <button onClick={handelModal} className='px-6 w-full sm:w-1/3 py-3 mt-4 rounded-xl bg-primary text-white'>
                    Transfer
                </button>
            </div>
            <div className="flex flex-row m-10">
                <button className="px-5 py-2 mr-8 bg-[#FCEEF8] border-b-[1px] border-[#CB0881] rounded-t-md">All</button>
                <button className="px-5 py-2 mr-8 bg-[#f1f1f2] focus:bg-[#FCEEF8] border-b-[1px] focus:border-[#CB0881] rounded-t-md">
                    Sent
                </button>
                <button className="px-5 py-2 mr-8 bg-[#f1f1f2] focus:bg-[#FCEEF8] border-b-[1px] focus:border-[#CB0881] rounded-t-md">
                    Receive
                </button>
            </div>
            <div className='m-10 sm:my-10'>
                <h1>From Date</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <input className="appearance-none border rounded py-2 focus:shadow-outline" type="date" placeholder="Select date" />
                    <button className='bg-bg2 w-full sm:w-1/3 rounded-lg'>Filter</button>
                </div>
            </div>
            <div className='md:m-10 sm:my-10 bg-bg2 w-full sm:w-2/3 p-5 rounded-xl'>
                <div className='flex justify-between text-[#CB084B]'>
                    <p>From Date</p>
                    <p className='text-[#CB084B]'>Transfer From</p>
                </div>
                <h1 className='text-center font-bold text-2xl mt-4 text-[#CB084B]'>No Report Found</h1>
            </div>

            {modal && (
                <div id="popup-modal" tabIndex="-1" className="inset-0 bg-gray-500 bg-opacity-75 transition-opacity overflow-y-auto fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full">
                    <div className="relative p-4 w-full max-w-md h-auto max-h-full overflow-auto">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button onClick={handelModal} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-4 md:p-5 text-center">
                                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <div>
                                    <h1 className='text-primary text-2xl text-center'>Balance Transfer</h1>
                                    <h1 className='text-center'>Current Balance USD $0.00</h1>
                                    <div className='grid gap-2 my-5'>
                                        <p className='text-start'>Transfer to</p>
                                        <input className="mb-2 appearance-none border rounded py-2 focus:shadow-outline" id="amount" type="text" placeholder="User ID" />
                                        <p className='text-start'>Amount</p>
                                        <input className="appearance-none border rounded py-2 focus:shadow-outline" id="amount" type="text" placeholder="Enter amount" />
                                    </div>
                                    <p className='text-start pb-5'>Service charge 0.00 USD</p>
                                </div>
                                <button data-modal-hide="popup-modal" type="button" className="text-white bg-primary rounded-xl hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium text-sm inline-flex items-center px-5 py-2.5 text-center">
                                    Yes, I'm sure
                                </button>
                                <button onClick={handelModal} data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white border border-gray-200 rounded-xl hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                    No, cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Ots;
