import LoginHeader from "../components/LoginHeader";
import LoginForm from "../components/LoginForm";
import { useContext, useState } from "react";
import { login } from "../api/user";
import { UserContext } from "../utils/user";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setemail] = useState("1196342044@qq.com");
  const [password, setPassword] = useState("12345678a");
  const {setUser} =  useContext(UserContext)
  const navigate = useNavigate()
  const loginFormArray = [
    {
      name: "email",
      value: email,
      handleChange: (e) => setemail(e.target.value),
    },
    {
      name: "password",
      value: password,
      handleChange: (e) => setPassword(e.target.value),
    },
  ];
function userLogin() {
  login({
    email,
    password
  }).then((res) => {
    alert('登陆成功')
    setUser(res.user)
    navigate('/')
  }).catch(err => {
    console.log(err, 'eee')
    alert(err)
  })
}
  return (
    <div className="flex items-center justify-center">
      <div style={{ width: "33%" }}>
        <LoginHeader type="login"  />
        <LoginForm inputArray={loginFormArray}></LoginForm>
        <div className="flex justify-end">
          <button onClick={() => {
            console.log('hi')
            userLogin()
          }} className="main-bg px-8 py-3 text-white rounded-md ">
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
