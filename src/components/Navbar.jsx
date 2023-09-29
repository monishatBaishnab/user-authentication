import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBarsProgress } from 'react-icons/fa6'

const Navbar = () => {
    const [smNavShow, setSmNavShow] = useState(false);
    return (
        <div className="flex items-center justify-between py-3 border-b min-h-[65px]">
            <Link className="text-primary/80 text-xl font-medium" to={'/'}>User Authentication</Link>
            <div className={`absolute top-0 bottom-0 h-full bg-white w-60 border-r shadow-md shadow-[rgba(77,_71,_195,_0.40)] px-3 pt-5 transition-all
            ${smNavShow === true ? 'left-0 visible opacity-100' : 'left-[-10px] opacity-0 invisible'}
            sm:static sm:h-auto sm:w-auto sm:border-r-0 sm:shadow-none sm:bg-transparent sm:visible sm:opacity-100 sm:p-0`}>
                <ul className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                    <li><NavLink onClick={() => setSmNavShow(false)} className='text-gray-700 hover:text-primary/80 text-lg' to='/'>Home</NavLink></li>
                    <li><NavLink onClick={() => setSmNavShow(false)} className='text-gray-700 hover:text-primary/80 text-lg' to='/login'>Login</NavLink></li>
                </ul>
            </div>
            <button onClick={() => setSmNavShow(!smNavShow)} className="cursor-pointer  text-gray-700 hover:text-primary/80 p-2 inline-block sm:hidden">
                <FaBarsProgress className="text-2xl" />
            </button>
        </div>
    );
};

export default Navbar;