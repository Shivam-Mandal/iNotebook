import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'
// import Search from './Search';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Navbar = () => {
    let location = useLocation();
    // useEffect(()=>{

    // },[location])
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/")

    }
    return (
        <>
            <nav className="p-3 px-10 flex flex-col w-full md:flex-row border-b justify-between items-center bg-slate-800 text-white">
                <div className="brand text-2xl font-bold mb-2 md:mb-0"><Link to='/'> iNotebook</Link></div>

                {!localStorage.getItem('token') ? <div className="justify-between items-center flex">
                    {/* <input type="text" className='bg-slate-600 rounded py-1 px-2 mb-2 md:mb-0' placeholder='Search' /> */}
                    <Link
                        to="/login"
                        className=" mx-2 border bg-slate-300 text-slate-800 rounded-2xl px-3 py-1"
                    >Login</Link>
                    <Link
                        to="/signup"
                        className=" mx-2 border bg-slate-300 text-slate-800 rounded-2xl px-3 py-1 "
                    >
                        Signup
                    </Link>
                    

                    {/* <span className="mx-3 rounded-full items-center justify-center flex font-bold w-8 h-8 border-2 border-cyan-500" >S</span> */}
                </div> : <> <div className="">
                   <Link to="/home" className={`${location.pathname === "/home" ? "fa-lg py-1" : " fa-lg py-1"}`}> <FontAwesomeIcon icon={faHome}></FontAwesomeIcon></Link>
                    {/* <Search/> */}
                </div><div className="flex">
                        <button><Link to="/accounts" className={`${location.pathname === "/accounts" ? "font-semibold py-1.5 px-3 border rounded-2xl" : "item-center border px-3 rounded-2xl py-1.5"}`}>Accounts</Link></button>
                        <button onClick={handleLogout} className='border rounded-2xl text-slate-800 bg-slate-300 ms-5 px-3 py-1 items-center flex'>Logout</button></div></>}
            </nav>
        </>
    );
};

export default Navbar;
