// import { useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { toast } from "react-toastify";
// import apiClient from "../config.js/axiosConfig";
// import API_ROUTES from "../config.js/apiRoutes";

// export function useAuthRedirect(flag) {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const toastShown = useRef(false);

//   useEffect(() => {
//     const checkAuth = async () => {
//       const token = localStorage.getItem("token");
//       console.log(flag)

//       if (token) {
//         try {
//           const response = await apiClient.get(API_ROUTES.USER_DETAILS);
//           if(location.pathname == "/signup" || location.pathname == "/signin"  ){
//             console.log(location.pathname)
            
//           navigate("/dashboard");
//         }
//           const userInfo = JSON.stringify(response.data.userDetail); 
//           localStorage.setItem("userInfo",userInfo)

//         } catch (error) {
//           if (!toastShown.current && location.pathname !== "/signin") {
//             toastShown.current = true;
//             if(location.pathname !== "/signup"){
      
//                 toast("Please Login Again");
//             }
//           }
//           if(location.pathname == "/signup"){
//           navigate("/signup");

//           }else{

//               navigate("/signin");
//           }
          
//         }
//       } else if (location.pathname !== "/signin" ) {
//         if(location.pathname == "/signup"){
//           navigate("/signup");

//         } else{

//           navigate("/signin");
//         }
//       }
//     };

//     checkAuth();
//   }, [navigate, location.pathname]);
// }




import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import apiClient from "../config.js/axiosConfig";
import API_ROUTES from "../config.js/apiRoutes";

export function useAuthRedirect(flag) {
  const navigate = useNavigate();
  const location = useLocation();
  const toastShown = useRef(false);
  const [authLoading, setAuthLoading] = useState(true); // Add loading state

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      console.log(flag);

      if (token) {
        try {
          const response = await apiClient.get(API_ROUTES.USER_DETAILS);
          if (location.pathname === "/signup" || location.pathname === "/signin") {
            console.log(location.pathname);
            navigate("/dashboard");
          }
          const userInfo = JSON.stringify(response.data.userDetail);
          localStorage.setItem("userInfo", userInfo);
        } catch (error) {
          if (!toastShown.current && location.pathname !== "/signin") {
            toastShown.current = true;
            if (location.pathname !== "/signup") {
              toast("Please Login Again");
            }
          }
          if (location.pathname === "/signup") {
            navigate("/signup");
          } else {
            navigate("/signin");
          }
        } finally {
          setAuthLoading(false); // Set loading to false once auth check is done
        }
      } else if (location.pathname !== "/signin") {
        if (location.pathname === "/signup") {
          navigate("/signup");
        } else {
          navigate("/signin");
        }
        setAuthLoading(false); // Set loading to false if no token
      } else {
        setAuthLoading(false); // Set loading to false if already on signin page
      }
    };

    checkAuth();
  }, [navigate, location.pathname]);

  return authLoading; // Return loading state
}
