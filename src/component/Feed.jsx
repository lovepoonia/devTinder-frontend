
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
    const dispatch = useDispatch();

    const getFeed = async () => {
        if(feed) return;

        try {
            const res = await axios.get(BASE_URL + "/user/feed", {withCredentials:true});
            console.log(res);
            
            dispatch(addFeed(res?.data?.data));
        } catch (error) {
            console.error(error)
        }
    }

    useState(() => {
        getFeed();
    },[])
    if (!feed) return;

    if (feed.length <= 0)
      return <h1 className="flex justify-center font-bold text-2xl my-10">No new users founds!</h1>;
  return (
   feed && (<div className='flex justify-center my-10'>
      <UserCard user = {feed[0]}/>
    </div>)
  )
}

export default Feed