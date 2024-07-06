import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import img1 from '../assets/img2.jpg'
const Login = ({ showAlert }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(credentials.email!==''&& credentials.password!==''){

    try {

      const response = await fetch("http://localhost:5173/api/auth/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
      })
      // if(!response.ok){
      //   throw new Error(`HTTP error status ${response.status}`)
      // }
      console.log('Response:', response); // Check the type and content of the response
      const json = await response.json();
      console.log('JSON:', json);
      if (json.success) {
        // save the auth token and redirect
        localStorage.setItem("token", json.authToken)
        navigate("/home")
        showAlert("Login successful", "success")
      }
      else {

        showAlert("email or password is not correct", "error")
      }
    } catch (error) {
      console.log('error occured:', error)
    }
  }
else{
  showAlert('enter all the fields','warning')
}
  }
  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <>
      <div className="flex items-center justify-center min-h-screen"style={{background:`url(${img1})`,backgroundSize:"cover", backgroundRepeat:"no-repeat"}}>
        <div className="bg-white p-8 rounded-lg shadow-2xl w-80">
          <h1 className="text-2xl font-bold mb-6">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" id="email" name="email" value={credentials.email} onChange={onchange} placeholder='Enter email address' className="mt-1 p-2 block w-full border border-slate-500 focus:border-transparent rounded-md shadow-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" id="password" name="password" value={credentials.password} onChange={onchange} placeholder='Enter password' className="mt-1 p-2 block w-full border border-slate-500 focus:border-transparent rounded-md shadow-sm" />
            </div>  
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Log In</button>
          </form>
        </div>
      </div>
    </>
  )
}
export default Login;