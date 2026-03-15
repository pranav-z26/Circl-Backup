import axios from "axios";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/userSlice";

const Body = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(store => store.user);

  const fecthUser = async () => {
    try {
      if(userData) return;
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(res?.data?.data));
    } catch (err) {
      if(err.status === 401 || err?.response?.data.includes("jwt expired")){
        navigate("/login");
      }
      console.error("Error fetching user data:", err?.message);
    }
  };

  useEffect(() => {
    if(!userData){
      fecthUser();
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Body;
