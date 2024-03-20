import { useState } from "react";
import axios from "axios";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
const SignUp = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function userSignup() {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://paytm-backend-l42x.onrender.com/api/v1/user/signup",
        {
          username,
          firstname,
          lastname,
          password,
        }
      );
      setIsLoading(false);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      setIsLoading(false);
      const errorMsg = error.response.data.message;
      alert(errorMsg);
    }
  }

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your infromation to create an account"} />
          <InputBox
            placeholder="John"
            label={"First Name"}
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
          />
          <InputBox
            placeholder="Doe"
            label={"Last Name"}
            onChange={(e) => {
              setLastname(e.target.value);
            }}
          />
          <InputBox
            placeholder="john@gmail.com"
            label={"Email"}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <InputBox
            placeholder="123456"
            label={"Password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="pt-4">
            <Button
              label={isLoading ? <Loader /> : "Sign In"}
              onClick={userSignup}
            />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
