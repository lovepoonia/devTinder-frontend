import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const[email, setEmail] = useState("love@gmail.com");
  const [password, setPasssword] = useState("Love@1234");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate =useNavigate();

  const handleLogin = async () =>{
    try {
     const res = await axios.post(BASE_URL + '/auth/login', 
      { email, password }, 
      { withCredentials: true }
     )
dispatch(addUser(res.data))
return navigate("/")
    } catch (error) {
      setError(error?.response?.data);
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
              <input type="email" placeholder="...@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} className="input input-bordered w-full max-w-xs" required/>
          </label>
          <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input type="password" placeholder="A@1.." value={password} onChange={(e) => setPasssword(e.target.value)} className="input input-bordered w-full max-w-xs"  required  />
          </label>
          <p className='text-red-500'>{error}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
    </div>
      
  
  )
}

export default Login