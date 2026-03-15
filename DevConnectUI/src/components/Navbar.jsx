import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../store/userSlice";
import Toast from "./common/Toast";
import { useState, useEffect } from "react";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [ showToast, setShowToast ] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser())
      setShowToast(true);
      navigate('/login')
    } catch (err) {
      //TODO: Err logic - Redirect to err page
    }
  };

  useEffect(() => {
      setTimeout(() => setShowToast(false), 3000);
  },[showToast]);



  return (
    <>
    {showToast && <Toast message={"Logout Successful!"}/>}
    <div className="navbar bg-base-300 shadow-md px-4">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          DevConnect
        </Link>
      </div>
      <div className="flex gap-2 items-center">
        <div>
          Welcome{" "}
          <span className="font-mono text-yellow-400">{user?.firstName}</span>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={
                  user?.photoUrl
                    ? user.photoUrl
                    : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
              />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link to="/requests">Requests</Link>
              <Link to="/connections">Connections</Link>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </>
  );
};

export default Navbar;
