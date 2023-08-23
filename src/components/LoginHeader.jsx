import { Link } from "react-router-dom";
export default function LoginHeader(props) {
  return (
    <div className="flex justify-center items-center flex-row">
      <div>
        <h1 className="text-center text-4xl">
          {props.type === "login" ? "Sign in" : "Sign up"}
        </h1>
        <Link to={props.type === "login" ? "/register" : "/login"}>
          <p className=" text-green-500 text-lg mb-8 mt-3">
            {props.type === "login" ? "Need an account?" : "Have an account?"}
          </p>
        </Link>
      </div>
    </div>
  );
}
