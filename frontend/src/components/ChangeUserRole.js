import React, { useState } from "react";
import ROLE from "../common/role";
import { IoMdClose } from "react-icons/io";
import summaryAPI from "../common/index";
import axios from "axios";
import { toast } from "react-toastify";

const ChangeUserRole = ({ userDetails, onClose, callFunc }) => {
  const [role, setRole] = useState("");

  const handleOnChangeSelect = (e) => {
    setRole(e.target.value);
  };

  const updateUserRole = () => {
    axios
      .post(
        summaryAPI.updateUser.url,
        { id: userDetails.id, role },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          onClose();
          callFunc();
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
        onClose();
        console.log(err);
      });
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-100 bg-opacity-40">
      <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-lg font-medium">Change User Role</h1>
          <button className="text-2xl hover:text-red-600" onClick={onClose}>
            <IoMdClose></IoMdClose>
          </button>
        </div>

        <p>Name: {userDetails?.name}</p>
        <p>Email: {userDetails?.email}</p>
        <div className="flex items-center gap-x-3 my-4">
          <p>Role: </p>
          <select
            className="border px-4 py-1"
            value={role !== "" ? role : userDetails?.role}
            onChange={handleOnChangeSelect}
          >
            {Object.keys(ROLE).map((role) => {
              return (
                <option value={role} key={role}>
                  {role}
                </option>
              );
            })}
          </select>
        </div>
        <button
          className="w-fit mx-auto block border px-3 py-1 rounded-full bg-red-600 text-white hover:bg-red-700"
          onClick={updateUserRole}
        >
          Change Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
