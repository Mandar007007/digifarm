import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs';

function Footer() {
    return (
        <>
            <div className="relative flex justify-center">
                <div className=" bg-black w-full">
                    <div className=" grid md:grid-cols-5 grid-cols-1 ">
                        <div className=" col-span-2 flex flex-col md:px-12 px-8 md:py-12 pt-12 md:justify-start justify-center ">

                            <h1 className=" text-[36px] text-green-400 font-bold mb-3 md:text-left text-center " >DigiFarm</h1>
                            <p className=' md:mb-16 mb-0 text-[16px] text-gray-400 md:text-left text-center ' >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae, porro omnis, dolores illo iusto adipisci fugiat voluptate voluptat</p>       

                            <div className=" md:flex hidden items-center md:justify-start ">
                                <a className=" mr-3 border border-white rounded-full p-2 text-white " target="_blank" href="http://facebook.com/"><BsFacebook /></a>
                                <a className=" mr-3 border border-white rounded-full p-2 text-white " target="_blank" href="https://www.instagram.com/"><BsInstagram/></a>
                                <a className=" mr-3 border border-white rounded-full p-2 text-white " target="_blank" href="https://twitter.com/"><BsTwitter/></a>
                                <a className=" mr-3 border border-white rounded-full p-2 text-white " target="_blank" href="https://www.linkedin.com/"><BsLinkedin/></a>
                            </div>

                        </div>
                        <div className=" col-span-3 flex flex-col md:px-12 px-8 md:py-12 py-10">
                            
                            <h2 className=" sm:text-[30px] text-[25px] text-white text-whitefont-semibold sm:border-b border-gray-600 pb-3 md:mb-3 mb-0 flex md:justify-start justify-center">Get the latest news !</h2>
                            <p className=' text-[16px] text-gray-400 my-3 flex md:justify-start justify-center md:text-left text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum laboriosam, suscipit voluptates numquam facilis sed aliquam.</p>

                            <div className="mt-6 flex sm:justify-start justify-center gap-x-4">
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="min-w-0 flex-auto rounded-sm border-0 bg-white/5 px-4 py-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    placeholder="Enter your email"
                                />
                                <button
                                    type="submit"
                                    className="flex-none rounded-sm bg-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                                    Subscribe
                                </button>
                            </div>

                        </div>

                        <div className=" md:hidden flex items-center justify-center mb-5 ">
                            <a className=" mr-3 border border-white rounded-full p-2 text-white " target="_blank" href="http://facebook.com/"><BsFacebook /></a>
                            <a className=" mr-3 border border-white rounded-full p-2 text-white " target="_blank" href="https://www.instagram.com/"><BsInstagram/></a>
                            <a className=" mr-3 border border-white rounded-full p-2 text-white " target="_blank" href="https://twitter.com/"><BsTwitter/></a>
                            <a className=" mr-3 border border-white rounded-full p-2 text-white " target="_blank" href="https://www.linkedin.com/"><BsLinkedin/></a>
                        </div>
                    </div>

                    <div className=" border-t border-gray-600 py-4 px-4">
                        <p className=" text-gray-500 text-center " >© 2024 DigiFarm™. All Rights Reserved.</p>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Footer;