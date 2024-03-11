import { useEffect, useState } from "react";
import Button from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PaginationSection from "./Pagination";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = users.slice(firstItemIndex, lastItemIndex);

  //debouncing can be added here, remove your name
  useEffect(() => {
    axios
      .get(
        "https://paytm-backend-l42x.onrender.com/api/v1/user/bulk?filter=" +
          filter
      )
      .then((response) => setUsers(response.data.users));
  }, [filter]);
  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
          onChange={(e) => setFilter(e.target.value)}
        ></input>
      </div>
      <div>
        {currentItems.map((user) => {
          return <User user={user} key={user._id} />;
        })}
      </div>
      <div className="mt-4">
        <PaginationSection
          totalItems={users.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();
  function navigateToSendMoney() {
    navigate(`/send?id=${user._id}&name=${user.firstName}`);
  }
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-ful">
        <Button label={"Send Money"} onClick={navigateToSendMoney} />
      </div>
    </div>
  );
}

export default Users;
