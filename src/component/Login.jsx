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
  const [age, setAge] = useState();
  const [isLogin, setIsLogin] = useState(true);
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
          age,
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
    <div className="flex justify-center items-center min-h-screen px-2 bg-base-300">
      <div className="card bg-base-300 w-full max-w-md shadow-xl my-12">
        <div className="card-body">
          <h2 className="card-title text-center">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
    
          {!isLogin && (
            <>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">First Name</span>
                </div>
                <input
                  type="text"
                  placeholder="ABC"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input input-bordered w-full"
                  required
                />
              </label>
    
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Last Name</span>
                </div>
                <input
                  type="text"
                  placeholder="XYZ"
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                  className="input input-bordered w-full"
                  required
                />
              </label>
    
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Age</span>
                </div>
                <input
                  type="text"
                  placeholder="..."
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="input input-bordered w-full"
                  required
                />
              </label>
            </>
          )}
    
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="email"
              placeholder="...@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </label>
    
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="password"
              placeholder="A@1.."
              value={password}
              onChange={(e) => setPasssword(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </label>
    
          <p className="text-red-500 text-sm">{error}</p>
    
          <div className="card-actions justify-center mt-4">
            <button
              className="btn btn-primary w-full"
              onClick={isLogin ? handleLogin : handleSignUp}
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </div>
    
          <p
            className="text-center mt-4 text-sm cursor-pointer hover:underline"
            onClick={() => setIsLogin((prev) => !prev)}
          >
            {isLogin ? "New User? Sign Up Here" : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login