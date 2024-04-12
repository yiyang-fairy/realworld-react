import { useContext, useEffect, useState } from "react";
import { UserContext } from "../utils/user";
import { useNavigate } from "react-router-dom";

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

  const navList = [
    {
      name: "Sign in",
      url: "/login",
      needToken: false,
    },
    {
      name: "Sign up",
      url: "/register",
      needToken: false,
    },
    {
      name: "New Article",
      url: "/create",
      needToken: true,
    },
    {
      name: "Setting",
      url: "/setting",
      needToken: true,
    },
    {
      name: (
        <>
          <span className=" w-10 h-10 rounded-full overflow-hidden mr-2">
            <img className="w-full h-full" src={userImage} alt="" />
          </span>
          <span>{username}</span>
        </>
      ),
      url: `/user/${username}`,
      needToken: true,
    },
  ];

  return (
    <div className="w-full h-14 flex items-center justify-center">
      <div className="main  flex justify-between items-center">
        <div
          className="text-2xl font-black main-color cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          conduit
        </div>
        <div className="flex justify-center text-base">
          <div
            className=" mx-5 flex justify-center items-center truncate header-item cursor-pointer text-gray-300  hover:text-gray-500"
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </div>
          {navList.map((item) => {
            const show = !!localStorage.getItem("token") === item.needToken;
            const hasTokenClass =
              "mx-5 flex justify-center items-center truncate header-item create text-gray-300 cursor-pointer  hover:text-gray-500";
            const noTokenClass =
              "mx-5 truncate header-item login text-gray-300 cursor-pointer  hover:text-gray-500";
            return show ? (
              <div
                key={item.name}
                className={item.needToken ? hasTokenClass : noTokenClass}
                onClick={() => {
                  navigate(item.url);
                }}
              >
                {item.name}
              </div>
            ) : (
              ""
            );
          })}
        </div>
      </div>
    </div>
  );
}
