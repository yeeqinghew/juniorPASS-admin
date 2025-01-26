import React, { useEffect } from "react";
import toast from "react-hot-toast";

const AdminHome = () => {
  useEffect(() => {
    async function getAllUsers() {
      try {
        const response = await fetch(
          "http://localhost:5000/admins/getAllUsers",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const parseRes = await response.json();
      } catch (err) {
        console.error(err.message);
        toast.error("ERROR in /admins/getAllUsers");
      }
    }

    getAllUsers();
  }, []);
  return <>Users</>;
};

export default AdminHome;
