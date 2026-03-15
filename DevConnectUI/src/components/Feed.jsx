import React, { use, useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addFeed } from "../store/feedSlice";
import UserCard from "./common/UserCard";

const Feed = () => {
  const dispatch = useDispatch();

  const getFeed = async () => {
    const res = await axios.get(`${BASE_URL}/feed`, { withCredentials: true });
    console.log(res.data.data, "dsdsd");
    dispatch(addFeed(res?.data?.data));
  };

  const feed = useSelector((store) => store.feed);
  console.log(feed,"feed")

  // useEffect(() => {
  //   if (!feed) {
  //     getFeed();
  //   }
  // }, []);

  useEffect(() => {
    getFeed();
  }, []);

  return feed && <UserCard data={feed.length > 0 ? feed[0] : []} />;
};

export default Feed;
