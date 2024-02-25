import axios from "axios";
import { Navigate } from "react-router-dom";
import AddButton from "../Upload/Add";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useEffect } from "react";


type Props = {
  toggleLogin: () => void;
  isLoggedIn: boolean;
  user: any;
  dispatch: any;
};

export default function ProfilePage({
  toggleLogin,
  isLoggedIn,
  user,
  dispatch,
}: Props) {
  // const dispatch = useDispatch();
  const logout = async () => {


    try {
      await axios.get("http://localhost:3000/api/v1//logout", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      dispatch({
        type: "CLEAR_USER",
      });

      toast.success("Logged out successfully");
      toggleLogin();
    } catch (err) {
      toast.error("Error");
    }



  };

  return (
    <div>
      {/* <h1 className="bg-red-400 text-white text-4xl mt-36"> Profile Page </h1> */}
      {!isLoggedIn && <Navigate to="/" />}

      <div className="w-[30rem] max-w-full my-20 py-6 border  rounded-lg shadow glassy-effect flex justify-around align-middle items-center px-4">
        <div>
          <img
            className="md:w-32 md:h-32 h-20 w-20 rounded-full shadow-lg "
            src="./avatar2.jpg"
            alt={user?.name}
          />
        </div>
        <div className="flex flex-col">
          <h5 className="mb-1 md:text-3xl text-center text-xl font-medium text-white">
            {user?.name} 
          </h5>
          <span className="md:text-md text-sm text-gray-500 dark:text-gray-400 leading-10 ">
            {user?.email}
          
          </span>

          <div className="w-fit mx-auto">
            <a
              onClick={logout}
              className="inline-flex items-center mt-5 md:px-4 px-1 md:py-2 py-1 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none bg-red-500 hover:bg-red-600 focus:ring-red-300 cursor-pointer"
            >
              Logout
            </a>
          </div>
        </div>
      </div>

      <AddButton isLoggedIn={isLoggedIn} toggleLogin={toggleLogin} />
    </div>
  );
}