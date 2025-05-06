import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  console.log(user)
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [experience, setExperience] = useState(user.experience );
  const [linkedinUrl, setLinkedinUrl] = useState(user.linkedinUrl );
  const [githubUrl, setGithubUrl] = useState(user.githubUrl );
  const [skills, setSkills] = useState([user.skills] );
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);


  const saveProfile = async () =>{
    setError("");
    try {
      const res = await axios.patch(BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
          experience
      },
      {
        withCredentials:true
      }
    )
    dispatch(addUser(res?.data?.data))
    setShowToast(true)
    setTimeout(() => {
      setShowToast(false)
    }, 2000)
    } catch (error) {
      if (error.response) {
        console.error(error.response.data); // backend responded with error
      }
      setError(error.response.data);      
    }
  }

  return (
    <>
    <div className="flex flex-col lg:flex-row justify-center gap-10 my-10 px-4">
      {/* Edit Profile Form */}
      <div className="card bg-base-300 w-full max-w-md shadow-xl mx-auto">
        <div className="card-body">
          <h2 className="card-title justify-center">Edit Profile</h2>
  
          {/* Form Fields */}
          {[
            { label: "First Name", value: firstName, setter: setFirstName },
            { label: "Last Name", value: lastName, setter: setLastName },
            { label: "Photo URL", value: photoUrl, setter: setPhotoUrl },
            { label: "Age", value: age, setter: setAge },
            { label: "Gender", value: gender, setter: setGender },
            { label: "Experience", value: experience, setter: setExperience },
            { label: "Skills", value: skills, setter: setSkills },
            { label: "About", value: about, setter: setAbout },
            { label: "LinkedIn URL", value: linkedinUrl, setter: setLinkedinUrl },
            { label: "GitHub URL", value: githubUrl, setter: setGithubUrl },
          ].map(({ label, value, setter }) => (
            <label className="form-control w-full my-2" key={label}>
              <div className="label">
                <span className="label-text">{label}:</span>
              </div>
              <input
                type="text"
                value={value}
                className="input input-bordered w-full"
                onChange={(e) => setter(e.target.value)}
              />
            </label>
          ))}
  
          {/* Error and Submit */}
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center mt-4">
            <button className="btn btn-primary" onClick={saveProfile}>
              Save Profile
            </button>
          </div>
        </div>
      </div>
  
      {/* User Card (Preview or Sidebar) */}
      <div className="w-full max-w-md mx-auto">
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>
    </div>
  
    {/* Toast Notification */}
    {showToast && (
      <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>Profile saved successfully.</span>
        </div>
      </div>
    )}
  </>
  
  );
};
export default EditProfile;