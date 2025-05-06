import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';

const NavBar = () => {

  const user = useSelector((store) => store.user);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control dropdown visibility

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };
  const logoutHandel = async () => {
    try {
      await axios.post(BASE_URL + "/auth/logout", {} ,{
        withCredentials:true
      })
      dispatch(removeUser())
      navigate("/login")
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="navbar bg-base-300 px-4 py-2">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">👩‍💻DevTinder</Link>
      </div>  

      {/* User info and avatar */}
      {user && (
        <div className="flex-none gap-2 ">
          <div className="form-control hidden sm:block">Welcome, {user.firstName}</div>
          
          {/* Dropdown Avatar */}
          <div className="dropdown dropdown-end mx-2 sm:mx-5" onClick={toggleDropdown}>
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user.photoUrl} alt="Profile Avatar" />
              </div>
            </div>

           {isDropdownOpen && <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg">
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">Edit</span>
                </Link>
              </li>
              <li><Link to="/connection">Connections</Link></li>
              <li><Link to="/requests">Upcoming Requests</Link></li>
              <li><Link onClick={logoutHandel}>Logout</Link></li>
            </ul>}
          </div>
        </div>
      )}

      {/* Mobile menu toggle */}
      {user && <div className="dropdown sm:hidden" onClick={toggleDropdown}>
  <label tabIndex={0} className="btn btn-ghost btn-circle"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </label>
  {isDropdownOpen && <ul
    tabIndex={0}
    className="menu menu-sm dropdown-content bg-base-100 rounded-box w-52 p-2 shadow-lg right-0 mt-3"
    onClick={() => setIsDropdownOpen(false)}
  >
    <li><Link to="/profile">Profile</Link></li>
    <li><Link to="/connection">Connections</Link></li>
    <li><Link to="/requests">Upcoming Requests</Link></li>
    <li><Link onClick={logoutHandel}>Logout</Link></li>
  </ul>}
      </div>}

    </div>

  )
}

export default NavBar