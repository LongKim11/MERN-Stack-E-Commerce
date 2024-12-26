import React, { useState, useEffect } from "react";
import axios from "axios";
import summaryAPI from "../common";
import { toast } from "react-toastify";
import format from "date-fns/format";
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [selectedUser, setSelectedUser] = useState({
    id: "",
    emai: "",
    name: "",
    role: "",
  });

  const fetchAllUsers = () => {
    axios
      .get(summaryAPI.allUsers.url, { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          setAllUsers(res.data.data);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="bg-white pb-4">
      <table className="w-full userTable">
        <thead>
          <tr className="bg-black text-white">
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers?.map((user, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{format(user.createdAt, "dd-MM-yyyy")}</td>
                <td>
                  <button
                    className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600"
                    onClick={() => {
                      setOpenUpdateRole(true);
                      setSelectedUser({
                        id: user._id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                      });
                    }}
                  >
                    <MdModeEdit></MdModeEdit>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole((prev) => !prev)}
          userDetails={selectedUser}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
