import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const[email, setEmail] = useState("");
  const [password, setPasssword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [gender, setGender] = useState("");
  const [isLogin, setIsLogin] = useState(false);
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

  const handleSignUp = async () => {
    try {
      const res = await axios.post(BASE_URL + "/auth/signup" , 
        {firstName,
          lastName,
          gender,
          email,
          password
        } , {withCredentials:true})
        dispatch(addUser(res?.data?.data))
        navigate("/profile")
    } catch (error) {
      setError(error?.response?.data);
      console.error(error)
    }
  }

  return (
    <div className="card bg-base-300 w-96 shadow-xl  m-auto my-12">
        <div className="card-body">
          <h2 className="card-title">{isLogin ? "Login" :"SignUp"}</h2>
          {!isLogin && (
            <>
              <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input type="text" placeholder="ABC" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input input-bordered w-full max-w-xs" required/>
          </label>
          <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input type="text" placeholder="XYZ" value={lastName} onChange={(e) => setlastName(e.target.value)} className="input input-bordered w-full max-w-xs" required/>
          </label>
          <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Gender</span>
              </div>
              <input type="text" placeholder="..." value={gender} onChange={(e) => setGender(e.target.value)} className="input input-bordered w-full max-w-xs" required/>
          </label>
          </>)}
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
          <div className="card-actions justify-center m-2">
            <button className="btn btn-primary" onClick={isLogin ? handleLogin: handleSignUp}>{isLogin? "Login":"SignUp"}</button>
          </div>
        </div>
        <p
            className="m-auto cursor-pointer py-2"
            onClick={() => setIsLogin((value) => !value)}
          >
            {isLogin
              ? "New User? Signup Here"
              : "Existing User? Login Here"}
          </p>
    </div>
      
  
  )
}

export default Login