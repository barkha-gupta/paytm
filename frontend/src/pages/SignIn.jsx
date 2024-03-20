import axios from "axios";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function userSignin() {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://paytm-backend-l42x.onrender.com/api/v1/user/signin",
        {
          username,
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
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            placeholder="john@gmail.com"
            label={"Email"}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputBox
            placeholder="123456"
            label={"Password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="pt-4">
            <Button
              label={isLoading ? <Loader /> : "Sign In"}
              onClick={userSignin}
            />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign Up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
