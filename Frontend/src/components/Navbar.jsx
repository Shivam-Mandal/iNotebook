import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'
const Navbar = () => {
    let location = useLocation();
    // useEffect(()=>{

    // },[location])
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login")

    }
    return (
        <>
            <nav className="p-3 px-10 flex flex-col md:flex-row justify-between items-center bg-slate-800 text-white">
                <div className="brand text-2xl font-bold mb-2 md:mb-0">iNotebook</div>

                {!localStorage.getItem('token') ? <div className="justify-between items-center flex">
                    {/* <input type="text" className='bg-slate-600 rounded py-1 px-2 mb-2 md:mb-0' placeholder='Search' /> */}
                    <Link
                        to="/login"
                        className=" mx-2 border rounded px-3 py-1"
                    >Login</Link>
                    <Link
                        to="/signup"
                        className=" mx-2 border rounded px-3 py-1 "
                    >
                        Signup
                    </Link>

                    {/* <span className="mx-3 rounded-full items-center justify-center flex font-bold w-8 h-8 border-2 border-cyan-500" >S</span> */}
                </div> : <> <div className="nav-links flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-10">
                    <Link to="/" className={`${location.pathname === "/" ? "font-semibold" : ""}`}>Home</Link>
                    <Link to="/about" className={`${location.pathname === "/about" ? "font-semibold" : ""}`}>About</Link>
                    <Link to="/" className={`${location.pathname === "/contact" ? "" : ""}`}>Contact</Link>
                </div><button onClick={handleLogout} className='border rounded px-3 py-1 items-center flex'>Logout</button></>}
            </nav>
        </>
    );
};

export default Navbar;
