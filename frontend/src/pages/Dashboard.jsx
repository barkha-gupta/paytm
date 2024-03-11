import React, { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";

const Dashboard = () => {
  //get the user and balance
  const [name, setName] = useState("");
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://paytm-backend-l42x.onrender.com/api/v1/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setName(response.data.user.firstname));

    //to get balance of user
    axios
      .get("https://paytm-backend-l42x.onrender.com/api/v1/account/balance", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setBalance(response.data.balance));
  }, []);
  return (
    <div>
      <Appbar name={name} />
      <div className="m-8">
        <Balance value={balance.toFixed(2)} />
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
