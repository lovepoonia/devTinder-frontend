import React from 'react'

const UserCard = ({user}) => {
    const {firstName, lastName, age, gender, about, photoUrl } = user
  return (
    <div className="card bg-base-300 w-96 shadow-xl">
  <figure>
    <img
      src={photoUrl}
      alt="User Photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    <p>{"age :" +age+ ", gender :" + gender}</p>
    <p>{about}</p>
   


    <div className="card-actions justify-center my-1">
      <button className="btn btn-secondary">Ignore</button>
      <button className="btn btn-primary">interested</button>
    </div>
  </div>
</div>
  )
}

export default UserCard