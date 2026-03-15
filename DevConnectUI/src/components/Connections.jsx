import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../store/connectionsSlice";
import ConnectionsCard from "./common/connectionsCard";

const Connections = () => {
  const dispatch = useDispatch();

  const connectionsInStore = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const connections = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(connections?.data?.data));
    } catch (err) {
      console.error("Error fetching connections:", err?.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connectionsInStore) {
    return <div>No connections found!</div>;
  }

  return (
    <div className="flex flex-col w-2/3 justify-center my-10 mx-auto">
      <div className="text-4xl mx-auto">Your Connections:</div>
      <ConnectionsCard data={connectionsInStore} />
    </div>
  );
};

export default Connections;
