import React, { useState, useEffect } from "react";
import UserCard from "./common/UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import Toast from "./common/Toast";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [emailId, setEmailId] = useState(user?.emailId || "");
  const [age, setAge] = useState(user?.age || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [skills, setSkills] = useState(user?.skills || "");

  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  const editProfile = async () => {
    const res = await axios.patch(
      `${BASE_URL}/profile/edit`,
      {
        firstName,
        lastName,
        age,
        gender,
        photoUrl,
        about,
        skills,
      },
      { withCredentials: true }
    );

    dispatch(addUser(res?.data?.data));
    setShowToast(true);
  };

  useEffect(() => {
    setTimeout(() => setShowToast(false), 3000);
  }, [showToast]);

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-10">
      <div>
        <div className="flex justify-center my-20">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body items-center text-center">
              <h2 className="card-title">Login</h2>

              <fieldset className="fieldset w-full">
                <label className="fieldset-legend">First Name:</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  className="input"
                />
              </fieldset>

              <fieldset className="fieldset w-full">
                <label className="fieldset-legend">Last Name:</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  className="input"
                />
              </fieldset>

              {emailId && (
                <fieldset className="fieldset w-full">
                  <label className="fieldset-legend">Email:</label>
                  <input
                    type="text"
                    value={emailId}
                    onChange={(e) => {
                      setEmailId(e.target.value);
                    }}
                    className="input"
                    disabled
                  />
                </fieldset>
              )}

              <fieldset className="fieldset w-full">
                <label className="fieldset-legend">Age:</label>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                  className="input"
                />
              </fieldset>

              <fieldset className="fieldset w-full">
                <label className="fieldset-legend">PhotoUrl:</label>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => {
                    setPhotoUrl(e.target.value);
                  }}
                  className="input"
                />
              </fieldset>

              <fieldset className="fieldset w-full">
                <label className="fieldset-legend">Gender:</label>
                <input
                  type="text"
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                  className="input"
                />
              </fieldset>

              <fieldset className="fieldset w-full">
                <label className="fieldset-legend">About:</label>
                <input
                  type="text"
                  value={about}
                  onChange={(e) => {
                    setAbout(e.target.value);
                  }}
                  className="input"
                />
              </fieldset>

              <div className="card-actions my-4">
                <button className="btn btn-primary" onClick={editProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UserCard
        isEdit={true}
        data={{
          firstName,
          lastName,
          emailId,
          age,
          gender,
          photoUrl,
          about,
          skills,
        }}
      />
      {showToast && <Toast message={"Profile Updated Successfully!"} />}
    </div>
  );
};

export default EditProfile;
