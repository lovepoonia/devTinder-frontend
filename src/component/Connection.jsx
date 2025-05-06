import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants';
import { addConnection } from '../utils/connectionSlice';
import { Link } from 'react-router-dom';

const Connection = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connections);

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", {withCredentials:true})
            
            dispatch(addConnection(res?.data?.data));
            
        } catch (error) {
            console.error(error);
        }
    }

    useEffect( ()=>{
        fetchConnections();
    },[])

    if(!connections) return;

    if(connections.length === 0) return <h1 className='flex justify-center font-bold text-2xl my-10'>No Connection Found</h1>;
  return (
    <div className="text-center my-10 px-4">
        <h1 className="font-bold text-xl mb-6">Connection</h1>

        {connections.map((connection) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about, experience, githubUrl, linkedinUrl, skills } = connection;

            return (
                <div key={_id} className="mb-10">
                    <div className="card bg-base-100 shadow-2xl max-w-4xl mx-auto flex flex-col sm:flex-row items-center sm:items-start">
                        <figure className="w-full sm:w-60 h-60">
                            <img
                                src={photoUrl}
                                alt={`${firstName} photo`}
                                className="w-full h-full object-cover"
                            />
                        </figure>
                        <div className="card-body w-full sm:w-auto text-left space-y-2">
                            <h2 className="card-title text-lg">{firstName + " " + lastName}</h2>
                            <p>Age: {age}</p>
                            <p>Gender: {gender}</p>
                            <p>Experience: {experience}</p>
                            <p>Skills: {skills}</p>
                            <p>About: {about}</p>
                            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline break-all">
                                GitHub: {githubUrl}
                            </a>
                            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline break-all">
                                LinkedIn: {linkedinUrl}
                            </a>
                            <Link to={`/chat/${_id}`}>
                                <button className="btn btn-outline btn-info mt-2">💬 Message</button>
                            </Link>
                        </div>
                    </div>
                </div>
            );
        })}
    </div>

  )
}

export default Connection