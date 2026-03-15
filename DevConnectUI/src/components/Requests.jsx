import ConnectionsCard from "./common/connectionsCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../store/requestsSlice";

const Requests = () => {
  const dispatch = useDispatch();

  const requestsInStore = useSelector((store) => store.requests);

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequests(_id));
    } catch (err) {
      console.error("Error reviewing request:", err?.message);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.error("Error fetching requests:", err?.message);
    }
  };

  const fromUsersArray =
    requestsInStore && requestsInStore.map((item) => item.fromUserId);

  useEffect(() => {
    fetchRequests();
  }, []);

  if(!requestsInStore || requestsInStore.length === 0){
    return <div className="text-center text-3xl mt-10">No pending requests!</div>
  }

  return (
    <div className="flex flex-col w-3/5 justify-center my-10 mx-auto">
      {requestsInStore &&
        requestsInStore.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, skills } =
            request.fromUserId;

          return (
            <div
              key={request._id}
              className="border-sky-500 m-5 p-5 rounded-lg flex items-center gap-8 bg-base-300"
            >
              <div className="mx-10">
                <img
                  src={photoUrl}
                  alt={firstName}
                  className="w-32 h-32 rounded-full object-cover"
                />
              </div>

              <div className="flex flex-col gap-2 w-1/3">
                <div className="text-2xl text-yellow-400">{`${firstName} ${lastName}`}</div>
                <div>{`Age: ${age}`}</div>
                <div>{`Gender: ${gender}`}</div>
                <div>Know's about:</div>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(skills) && skills.length > 0 ? (
                    skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-sky-100 text-sky-800 text-sm px-2 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-400">
                      No skills listed
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  className="btn btn-success"
                  onClick={() => reviewRequest("accepted", request?._id)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-secondary mx-2"
                  onClick={() => reviewRequest("rejected", request?._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Requests;
