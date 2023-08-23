import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../utils/user";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setUserImage(user.image);
      setUsername(user.username);
    }
  }, [user]);
  const [username, setUsername] = useState("");
  const [userImage, setUserImage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const pathname = location.pathname.split("/")[1] || "home";
    document.querySelectorAll(".header-item").forEach((item) => {
      item.classList.remove("text-gray-500");
    });
    if(pathname !== 'article') {
       document.querySelector(`.${pathname}`).classList.add("text-gray-500");
    }
  }, [location]);

  return (
    <div className="w-full h-14 flex items-center justify-center">
      <div className="main  flex justify-between items-center">
        <div
          className="text-2xl font-black main-color"
          onClick={() => {
            navigate("/");
          }}
        >
          conduit
        </div>
        <div className="flex justify-center text-base">
          <div
            className=" mx-5 flex justify-center items-center truncate header-item home text-gray-300  hover:text-gray-500"
            onClick={(e) => {
              navigate("/");
            }}
          >
            Home
          </div>
          {!localStorage.getItem("token") ? (
            <>
              <div
                className="mx-5 truncate header-item login text-gray-300  hover:text-gray-500"
                onClick={(e) => {
                  navigate("/login");
                }}
              >
                Sign in
              </div>
              <div
                className="mx-5 truncate header-item register text-gray-300  hover:text-gray-500"
                onClick={(e) => {
                  navigate("/register");
                }}
              >
                Sign up
              </div>
            </>
          ) : (
            <>
              <div
                className="mx-5 flex justify-center items-center truncate header-item create text-gray-300  hover:text-gray-500"
                onClick={(e) => {
                  navigate("/create");
                }}
              >
                New Article
              </div>
              <div
                className="mx-5 flex justify-center items-center truncate header-item setting text-gray-300  hover:text-gray-500"
                onClick={(e) => {
                  navigate("/setting");
                }}
              >
                Setting
              </div>
              <div
                className="mx-5 flex justify-center items-center truncate header-item user text-gray-300  hover:text-gray-500"
                onClick={(e) => {
                  navigate(`/user/${username}`);
                }}
              >
                <span className=" w-10 h-10 rounded-full overflow-hidden mr-2">
                  <img className="w-full h-full" src={userImage} alt="" />
                </span>
                <span>{username}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
