import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../Components/AdminNav";
import { useSelector } from "react-redux";

function AdminDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmation, setConfirmation] = useState("");

  const { currentAdmin } = useSelector((state) => state.admin);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('BackEnd/admin/getdashboarddata', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });

        if (response.ok) {
          const responseData = await response.json();
          if (responseData.success) {
            setData(responseData.dashboardData.sort((a, b) => a.username > b.username ? 1 : -1));
          }
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function deleteHandler(userId) {
    const res = confirm("Do you want to delete ?");
    if (res) {
      async function deleteUser(userId) {
        try {
          await fetch(`/BackEnd/admin/delete/${userId}`, {
            method: "DELETE",
          });
  
          // Reload the page after deletion
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      }
      deleteUser(userId);
    }
  }

  return (
    <>
    <AdminNavbar />
    <div className="flex flex-col items-center">
      {confirmation && <p className="text-green-500">{confirmation}</p>}
      <button
        className="p-2 m-2 bg-lime-400 rounded"
        onClick={() => navigate("/admin/add")}
      >
        Add User
      </button>
      <div className="flex align-middle justify-center m-6">
        {loading ? (
          <p>Loading...</p>
        ) : data && data.length > 0 ? (
          <table className="table-auto border border-slate-500">
            <thead>
              <tr className="border border-slate-500">
                <th>S.No</th>
                <th>Username</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user, i) => (
                <tr key={user.id} className="border border-slate-500 font-bold">
                  <td>{i + 1}</td>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      className="p-1 m-2 bg-blue-700 rounded-md text-white"
                      onClick={() => {
                        navigate(`/admin/edit`, { state: user });
                      }}
                    >
                      📝Edit
                    </button>
                    <button
                      className="p-1 m-2 bg-red-700 rounded-md text-white"
                      onClick={() => deleteHandler(user._id)}
                    >
                      🗑️Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
    </>
  );
}

export default AdminDashboard;
