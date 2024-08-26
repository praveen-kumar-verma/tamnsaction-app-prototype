import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Button } from "./Button";
import debounce from "lodash/debounce";
import { ShimmerButton, ShimmerCategoryItem } from "react-shimmer-effects";
import API_ROUTES from "../config.js/apiRoutes";
import { useAuthRedirect } from "../hooks/useAuthRedirect";
import apiClient from "../config.js/axiosConfig";
import { Navigate, useNavigate } from "react-router-dom";

export const Users = () => {
  // useAuthRedirect("user.jsx");
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async (currentFilter) => {
    setLoading(true);
    try {
      const response = await apiClient.get(
        `${API_ROUTES.USER_LIST}?filter=${currentFilter}`
      );
      setUsers(response.data.usersDetails);
    } catch (error) {
      console.error("An error occurred while fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const debouncedFetchUsers = useCallback(
    debounce((currentFilter) => {
      fetchUsers(currentFilter);
    }, 300),
    [fetchUsers]
  );

  useEffect(() => {
    fetchUsers(filter);

    if (filter.trim()) {
      debouncedFetchUsers(filter);
    }

    return () => {
      debouncedFetchUsers.cancel();
    };
  }, [filter, debouncedFetchUsers, fetchUsers]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          onChange={handleFilterChange}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
          disabled={loading}
        />
      </div>
      <div>
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <User key={index} loading={loading} />
            ))
          : users.map((user) => (
              <User key={user._id} user={user} loading={loading} />
            ))}
      </div>
    </>
  );
};
function User({ user, loading }) {
    const navigate = useNavigate();
    const sendMoney =()=>{
        navigate(`/fundTransfer/?id=${user._id}&name=${user.firstName}`);
    } 
  if (loading) {
    return (
      <div className="flex justify-between p-4">
        <ShimmerCategoryItem
          hasImage
          imageType="circular"
          imageWidth={50}
          imageHeight={50}
          contentCenter={true}
          cta
        />

        <ShimmerButton size="md" />
      </div>
    );
  }

  return (
    <div className="flex justify-between p-4">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center h-full">
        <Button label={"Send Money"} onClick={sendMoney}  />
      </div>
    </div>
  );
}
