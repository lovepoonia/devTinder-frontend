import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../utils/requestSlice'

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

    const reviewRequest = async (status, _id) =>{
        await axios.post(BASE_URL + "/request/review/" +status+"/"+_id ,{} , {withCredentials:true})
        dispatch(removeRequest(_id))
    }

    useEffect(()=>{
        fetchRequest();
    },[])
    if(!requests) return <h1 className='font-bold flex justify-center text-3xl'>No Request Found</h1>;;

    if(requests.length === 0) return <h1 className='font-bold flex justify-center text-3xl'>No Request Found</h1>;
  return (
    <div className='text-center my-10'>
        <h1 className='font-bold text-xl mb-5'>Pending Requests</h1>

        {requests.map((request) => {
            const {
            _id,
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            about,
            experience,
            skills,
        } = request.fromUserId;

        return (
        <div key={_id} className='m-5'>
            <div className="card card-side bg-base-100 shadow-2xl max-w-full sm:max-w-2xl mx-auto">
            <figure>
                <img
                src={photoUrl}
                alt={firstName + " photo"}
                className="w-full h-auto sm:w-60 sm:h-80"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                <p className='text-start'>Age: {age}</p>
                <p className='text-start'>Gender: {gender}</p>
                <p className='text-start'>Experience: {experience}</p>
                <p className='text-start'>Skills: {skills}</p>

                

                <p className='text-start'>About: {about}</p>

                {/* Action buttons for review */}
                <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center">
                <button
                    className="btn btn-error w-full sm:w-auto"
                    onClick={() => reviewRequest("rejected", request._id)}
                >
                    Reject
                </button>
                <button
                    className="btn btn-active btn-accent w-full sm:w-auto"
                    onClick={() => reviewRequest("accepted", request._id)}
                >
                    Accept
                </button>
                </div>
                </div>
            </div>
            </div>
            );
        })}
   </div>

  )
}

export default Requests