import React from 'react';
const AppStore = () => {
    return (
        <div>
            <div className='flex flex-row gap-4'>
                <div className='flex flex-row items-center justify-center gap-2'>
                    <div className='inline-flex items-center justify-center h-[30px] w-[30px]'>
                        <p className='text-xl'><i className="ri-google-play-fill"></i></p>
                    </div>
                    <div className='text-center'>
                        <p className='text-sm'>Get it on</p>
                        <h1 className='font-bold text-md'>Google Play</h1>
                    </div>
                </div>
                <div className='inline-flex items-center justify-center h-[30px] w-[30px]'>
                    <p className='text-xl'><i className="ri-android-fill"></i></p>
                </div>
                <div className='flex flex-row items-center justify-center gap-2'>
                    <div className='inline-flex items-center justify-center h-[30px] w-[30px]'>
                        <p className='text-xl'><i className="ri-apple-fill"></i></p>
                    </div>
                    <div className='text-center'>
                        <p className='text-sm'>Download on the</p>
                        <h1 className='font-bold text-md'>App Store</h1>
                    </div>
                </div>
            </div>


            <div>

            </div>
        </div>
    );
};

export default AppStore;