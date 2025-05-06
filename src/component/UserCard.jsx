import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';

const UserCard = ({user}) => {
    const {firstName, lastName, age, gender, about, photoUrl , _id } = user;
    const dispatch = useDispatch();
    const handelSendRequest = async (status, userId) => {
      await axios.post(BASE_URL + "/request/send/"+status+"/"+userId , {} ,{withCredentials:true});
      dispatch(removeFeed(userId));
    }

  return (
    <div className="card bg-base-300 w-full sm:w-96 shadow-xl mx-auto my-5">
      <figure>
        <img
          src={photoUrl}
          alt="User Photo"
          className="w-full h-auto sm:w-60 sm:h-60 rounded-full mx-auto"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-center">{firstName + " " + lastName}</h2>
        <p className="text-center">{"Age: " + age + " , Gender: " + gender}</p>
        <p className="text-center">{about}</p>
    
        <div className="card-actions justify-center my-4 flex flex-col sm:flex-row gap-2">
          <button
            className="btn btn-secondary w-full sm:w-auto"
            onClick={() => handelSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-primary w-full sm:w-auto"
            onClick={() => handelSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  
  )
}

export default UserCard