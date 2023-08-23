import { useState, useEffect, useContext } from "react";
import { getUser, updateUser } from "../api/user";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utils/user";

export default function Setting() {
  const [image, setImage] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const {setUser} = useContext(UserContext)
  useEffect(() => {
    getUser().then(res => {
        console.log(res, 'res')
        setImage(res.user.image)
        setUsername(res.user.username),
        setBio(res.user.bio)
        setEmail(res.user.email)
        setPassword(res.user.password)
    })
  }, [])
  function updateSetting() {
    updateUser({
        username,
        image,
        bio,
        email,
        password
    }).then(res => {
        console.log('res update', res)
    })
  }
  return (
    <div className="flex justify-center items-center">
      <div className=" mt-8" style={{ width: "30%" }}>
        <h1 className=" text-center text-4xl">Your Setting</h1>
        <p className=" mt-5 flex items-center border border-solid border-gray-300 p-4 mb-5 rounded-md font-blod">
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="URL for profile picture"
            className=" w-full"
            type="text"
          />
        </p>
        <p className="flex items-center border border-solid border-gray-300 p-4 mb-5 rounded-md font-blod">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className=" w-full"
            type="text"
          />
        </p>
        <p className="flex items-center border border-solid border-gray-300 p-4 mb-5 rounded-md font-blod">
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Short bio about you"
            className=" w-full"
          />
        </p>
        <p className="flex items-center border border-solid border-gray-300 p-4 mb-5 rounded-md font-blod">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className=" w-full"
            type="text"
          />
        </p>
        <p className="flex items-center border border-solid border-gray-300 p-4 mb-5 rounded-md font-blod">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className=" w-full"
            type="text"
          />
        </p>
        <div className="flex justify-end mb-5">
          <button
            onClick={updateSetting}
            className="main-bg px-8 py-3 text-white rounded-md "
          >
            Update Setting
          </button>
        </div>
        <div className=" border-t border-gray-300 border-solid py-5">
        <button
            onClick={() => {
                localStorage.clear("token")
                setUser(null)
                navigate('/')
            }}
            className=" px-2 py-1 text-amber-700 rounded-md border border-amber-700 border-solid text-sm"
          >
            Or click here to logout
          </button>
        </div>
      </div>
    </div>
  );
}
