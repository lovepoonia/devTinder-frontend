import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests } from '../utils/requestSlice'

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests)
    const fetchRequest = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received" , {withCredentials:true});
            dispatch(addRequests(res?.data?.data));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{
        fetchRequest();
    },[])
    if(!requests) return;

    if(requests.length === 0) return <h1 className='font-bold text-xl'>No Request Found</h1>;
  return (
    <div className='text-center my-10'>
        <h1 className='font-bold text-xl'>Panding Request</h1>

        {requests.map((request) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about, experience, githubUrl, linkedinUrl, skills} = request.fromUserId;
            return (
                <div key={_id} className='m-10'>
                    <div className="card card-side bg-base-100 shadow-2xl mx-20 max-w-2xl ">
                        <figure>
                            <img
                                src={photoUrl}
                                alt={firstName+ " photo"} className='w-60 h-80' />
                        </figure> 
                        <div className="card-body">
                            <h2 className="card-title">{firstName+ " " +lastName}</h2>
                            <p className='text-start'>{"age: " +age}</p>
                            <p className='text-start'>{"gender: " +gender}</p>
                            <p className='text-start'>{"experience: " +experience}</p>
                            <p className='text-start'>{"skills: " +skills}</p>
                            <p className='text-start'>{"githubUrl: " +githubUrl}</p>
                            <p className='text-start'>{"linkedinUrl: " +linkedinUrl}</p>
                            <p className='text-start'>{"about: " +about}</p>
                            <button className="btn btn-error ">Rejected</button>   
                    <button className="btn btn-active btn-accent">Accepted</button> 
                        </div>   
                    </div> 
                </div>
            )
        })}
    </div>
  )
}

export default Requests