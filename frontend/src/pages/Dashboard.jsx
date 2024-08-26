// import { toast } from "react-toastify";
// import { Appbar } from "../components/Appbar"
// import { Balance } from "../components/Balance"
// import { Users } from "../components/Users"
// import API_ROUTES from "../config.js/apiRoutes";
// import { useAuthRedirect } from "../hooks/useAuthRedirect";
// import { useCallback, useEffect, useState } from "react";
// import apiClient from "../config.js/axiosConfig";

// export const Dashboard = ()=>{
//     console.log("hahahdkjf")
//     useAuthRedirect("user.jsx");

//     const [balance, setBalance] = useState(0);
//     const [loading, setLoading] = useState(false);

//     const fetchBalance = useCallback(async () => {
//         setLoading(true);

//         try {
//             const response = await apiClient.get(`${API_ROUTES.GETBALANCE}`);
//             setBalance(response.data.balance);
//         } catch (error) {
//             toast(error)
//             console.error("An error occurred while fetching balance:", error);
//         } finally {
//             setLoading(false);
//         }
//     }, []);


//     useEffect(() => {
//         fetchBalance();


//     }, [fetchBalance]);
    

//     return <div>
//         <Appbar />
//         <div className="m-8">
//             <Balance value={balance} />
//             <Users />

//         </div>
//     </div>
// }


import { toast } from "react-toastify";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import API_ROUTES from "../config.js/apiRoutes";
import { useAuthRedirect } from "../hooks/useAuthRedirect";
import { useCallback, useEffect, useState } from "react";
import apiClient from "../config.js/axiosConfig";

export const Dashboard = () => {
  const authLoading = useAuthRedirect("user.jsx"); // Get loading state

  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchBalance = useCallback(async () => {
    setLoading(true);

    try {
      const response = await apiClient.get(`${API_ROUTES.GETBALANCE}`);
      setBalance(response.data.balance);
    } catch (error) {
      toast(error);
      console.error("An error occurred while fetching balance:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  if (authLoading) {
    return <div></div>; // Show a loading indicator while auth is being checked
  }

  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance value={balance} />
        <Users />
      </div>
    </div>
  );
};
