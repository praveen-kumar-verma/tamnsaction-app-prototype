// export const Appbar = () => {

//     const logout = ()=>{
//         localStorage.clear();
//     }

//     const userInfo = JSON.parse(localStorage.getItem("userInfo"))
//     return <div className="shadow h-14 flex justify-between">
//         <div className="flex flex-col justify-center h-full ml-4">
//             PayTM App
//         </div>
//         <div className="flex">
//             <div className="flex flex-col justify-center h-full mr-4">
//                 {userInfo.firstName} {userInfo.lastName}
//             </div>
//             <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
//                 <div className="flex flex-col justify-center h-full text-xl">
//                     {userInfo.firstName[0]}
//                 </div>                
//             </div>
            
//             <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 m-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={logout} >Logout</button>


//         </div>
//     </div>
// }


import { useNavigate } from "react-router-dom";

export const Appbar = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/signin"); // Redirect to sign-in page after logout
    }

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo) {
        return null; // Alternatively, you could redirect to the sign-in page here as well
    }

    return (
        <div className="shadow h-14 flex justify-between">
            <div className="flex flex-col justify-center h-full ml-4">
                PayTM App
            </div>
            <div className="flex">
                <div className="flex flex-col justify-center h-full mr-4">
                    {userInfo.firstName} {userInfo.lastName}
                </div>
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {userInfo.firstName[0]}
                    </div>                
                </div>
                
                <button 
                    type="button" 
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 m-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    onClick={logout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
