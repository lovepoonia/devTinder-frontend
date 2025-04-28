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
    <div className="card bg-base-300 w-96 shadow-xl">
  <figure>
    <img
      src={photoUrl}
      alt="User Photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    <p>{"age :" +age+ " , gender :" + gender}</p>
    <p>{about}</p>
   


    <div className="card-actions justify-center my-1">
      <button className="btn btn-secondary" onClick={() => handelSendRequest("ignored", _id)}>Ignore</button>
      <button className="btn btn-primary" onClick={() => handelSendRequest("interested", _id)}>Interested</button>
    </div>
  </div>
</div>
  )
}

export default UserCard