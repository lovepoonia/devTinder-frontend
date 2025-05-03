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
    <div className='text-center my-10'>
        <h1 className='font-bold text-xl'>Connection</h1>

        {connections.map((connection) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about, experience, githubUrl, linkedinUrl, skills} = connection;
            return (
                <div key={_id} className='m-10'>
                    <div className="card card-side bg-base-100 shadow-2xl mx-20 max-w-2xl ">
                        <figure>
                            <img
                                src={photoUrl}
                                alt={firstName+ " photo"} className='w-60 h-60' />
                        </figure> 
                        <div className="card-body">
                            <h2 className="card-title">{firstName+ " " +lastName}</h2>
                            <p className='text-start'>{"age: " +age}</p>
                            <p className='text-start'>{"gender: " +gender}</p>
                            <p className='text-start'>{"experience: " +experience}</p>
                            <p className='text-start'>{"skills: " +skills}</p>
                            <a className='text-start' href={githubUrl}  target="_blank">{"githubUrl: " +githubUrl}</a>
                            <a className='text-start' href={linkedinUrl}  target="_blank">{"linkedinUrl: " +linkedinUrl}</a>
                            <p className='text-start'>{"about: " +about}</p>
                            <Link to={"/chat/"+_id}><button className="btn btn-outline btn-info">💬Message</button></Link>  
                        </div>  
                    </div>    
                </div>
            )
        })}
    </div>
  )
}

export default Connection