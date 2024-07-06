import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import img1 from '../assets/img4.jpg'

const Signup = (props) => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (credentials.password != credentials.cpassword){
            props.showAlert("Password not matched", "error");
            return;
        }
        if(credentials.password.length<5){
            props.showAlert("Password length should be more than 4 character",'error')
            return;
        }
        try{
            const res = await fetch("http://localhost:5173/api/auth/createuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
            })
            const json = await res.json();
            console.log(json);

            if (json.authToken) {
                // save the auth token and redirect
                console.log(json.authToken)
                // localStorage.setItem("token", json.authToken)
                navigate("/Login")
                props.showAlert("Account created Successfully", "success")
            }
            else {
                props.showAlert("Email is already registered", "error")
            }
        }catch(error){
            console.log('Error creating user',error)
            props.showAlert("Error creating user", "error");
        }


    }
    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100" style={{background:`url(${img1})`,backgroundSize:"cover", backgroundRepeat:"no-repeat"}}>
                <div className="bg-white p-8 rounded-lg shadow-2xl w-80">
                    <h1 className="text-2xl font-bold mb-6">Signup Form</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                // value={credentials.name}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                // value={credentials.email}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                // value={credentials.password}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                id="cpassword"
                                name="cpassword"
                                // value={credentials.cpassword}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Signup;