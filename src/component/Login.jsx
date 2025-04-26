import React, { useState } from 'react'
import axios from 'axios';

const Login = () => {
  const[email, setEmail] = useState("");
  const [password, setPasssword] = useState("");

  const handleLogin = async () =>{
    try {
      await axios.post("http://localhost:7777/login", 
        {
          email,
          password
        }, {
          withCredentials:true
        })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input type="text" placeholder="Type here" value={email} onChange={(e) => setEmail(e.target.value)} className="input input-bordered w-full max-w-xs" />
          </label>
          <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input type="text" placeholder="Type here" value={password} onChange={(e) => setPasssword(e.target.value)} className="input input-bordered w-full max-w-xs" />
          </label>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
    </div>
      
  
  )
}

export default Login