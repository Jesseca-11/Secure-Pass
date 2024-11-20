import React from 'react';


const Home = () => {
    return (
        <>
            <div className="bg-gray-50 py-20 sm:py-30">
                <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
                    <h2 className="text-center text-6xl font-bold text-gray-500">Shop non-stop <span className='text-blue-300' >With Confidence</span> </h2>
                    <p className="mx-auto mt-2 text-center lg:text-3xl font-light tracking-normal  text-gray-600 sm:text-5xl">
                        Better experience with payment on delivery for businesses and customers.
                    </p>

                    <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2 gap-x-12">
                        <div className="relative lg:row-span-2 ">
                            <div className="absolute inset-px rounded-lg g-4 bg-white lg:rounded-l-[2rem]"></div>
                            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                                <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                                        Secure payment
                                    </p>
                                    <p className="mt-2 mb-5 max-w-lg text-sm/10 text-gray-600 max-lg:text-center">
                                        Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
                                    </p>
                                </div>

                                <div className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
                                    <img
                                        className="size-full object-cover object-top sm:pb-4"
                                        src="/Images/pix 1.jpg"
                                        alt=""
                                    />
                                </div>
                                
                            </div>
                            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]"></div>
                        </div>

                        <div className="relative max-lg:row-start-1">
                            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
                            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Open Transaction</p>
                                    <p className="mt-2 max-w-lg text-sm/10 text-gray-600 max-lg:text-center">
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit maiores impedit.
                                    </p>
                                </div>
                                <div className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
                                    <img
                                        className="w-full max-lg:max-w-xs"
                                        src="/Images/pix1 small.png"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem]"></div>
                        </div>

                        <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
                            <div className="absolute inset-px rounded-lg bg-white"></div>
                            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
                                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Security</p>
                                    <p className="mt-2 max-w-lg text-sm/10 text-gray-600 max-lg:text-center">
                                        Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi.
                                    </p>
                                </div>
                                <div className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
                                    <img
                                        className="w-full max-lg:max-w-xs"
                                        src="/Images/pix2.jpg"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5"></div>
                        </div>

                        <div className="relative lg:row-span-2">
                            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
                            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                                <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                                        Trusted platform
                                    </p>
                                    <p className="mt-2 mb-5 max-w-lg text-sm/10 text-gray-600 max-lg:text-center">
                                        Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget sem sodales gravida.
                                    </p>
                                </div>
                                        <div className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm ">
                                            
                                            <img
                                                className="size-full object-cover object-top sm:pb-4 "
                                                src="/Images/pix2.jpg"
                                                alt=""
                                            />
                                        
                                        </div>
                            </div>
                            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;