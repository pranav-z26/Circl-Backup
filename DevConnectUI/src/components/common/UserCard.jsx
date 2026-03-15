import { useDispatch } from "react-redux";
import axios from "axios";
import React from "react";
import { BASE_URL } from "../../utils/constants";
import { removeFeed } from "../../store/feedSlice";

const UserCard = ({ data, isEdit }) => {
  console.log(data, "data");
  const {
    _id,
    firstName,
    lastName,
    emailId,
    age,
    gender,
    photoUrl,
    about,
    skills,
  } = data;

  const dispatch = useDispatch();

  const handleSendRequest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${_id}`, //status = interested/ignored
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(_id));
    } catch (err) {
      console.error("Error reviewing request:", err?.message);
    }
  };

  if (!data) return;

  if (data?.length <= 0)
    return (
      <div className="flex items-center justify-center h-screen text-center px-4 mb-4 text-3xl font-bold text-heading md:text-5xl lg:text-3xl">
        <div className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Your feed is empty. No new people available on the platform!
        </div>
      </div>
    );

  return (
    <>
      {data && (
        <div className="flex justify-center my-20">
          <div className="card bg-base-300 w-96 shadow-sm">
            <figure>
              <img
                src={
                  photoUrl ||
                  "https://png.pngtree.com/element_our/20200610/ourmid/pngtree-black-default-avatar-image_2237212.jpg"
                }
                alt="user photo"
                className="w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{`${firstName} ${lastName || ""}`}</h2>
              <p className="">{"Email: " + emailId}</p>
              <p className="">{"Age: " + age}</p>
              <p className="">{"Gender: " + gender}</p>
              <p>{about}</p>
              {skills && <p>{"Skills: " + skills}</p>}
              <div className="card-actions justify-center mt-4">
                {!isEdit && (
                  <>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleSendRequest("interested", _id)}
                    >
                      Interested
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleSendRequest("ignored", _id)}
                    >
                      Ignore
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserCard;
