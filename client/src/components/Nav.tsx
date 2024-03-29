import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import axios from "axios";
import Register from "./Auth/Register";
import Login from "./Auth/Login";

interface CustomNavLinkProps {
  to: string;
  className: string;
  activeClassName?: string;
  children: React.ReactNode;
}

const CustomNavLink: React.FC<CustomNavLinkProps> = ({
  to,
  className,
  activeClassName,
  children,
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <NavLink to={to} className={isActive ? activeClassName : className}>
      {children}
    </NavLink>
  );
};

export default function Nav({ toggleLogin, isLoggedIn, routes, user }: any) {

  const dispatch = useDispatch();

  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onClose: onCloseLogin,
  } = useDisclosure();
  const {
    isOpen: isOpenReg,
    onOpen: onOpenReg,
    onClose: onCloseReg,
  } = useDisclosure();

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
      <nav className="border-b border-gray-800 fixed w-full z-20 top-0 start-0 glassy-effect-navbar">
        <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto md:py-2 py-2 md:px-10 px-5">
          <CustomNavLink
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <div className="flex items-center">
              <img src="/logo.png" className="md:h-12 h-6" alt="vite" />
              <p className="md:ml-4 ml-2 text-xl text-green-300 font-semibold ">Digi<span className="text-slate-300">Farm</span></p>
            </div>
          </CustomNavLink>
          <div className="flex md:order-2 space-x-3 md:space-x-0  rtl:space-x-reverse">
            {!isLoggedIn && (

              <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-sm group bg-gradient-to-br from-green-800 to-green-400 group-hover:from-green-800 group-hover:to-green-500 hover:text-white dark:text-white focus:ring-0 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800" onClick={onOpenLogin}>
                <span className=" text-white relative px-3 py-2.5 transition-all ease-in-out duration-300 bg-[#1a1a1b] dark:bg-gray-900 rounded-sm group-hover:bg-opacity-0">
                  Login/Register
                </span>

                <Login
                  isOpen={isOpenLogin}
                  onClose={onCloseLogin}
                  onOpenRegister={onOpenReg}
                  toggleLogin={toggleLogin}
                />
                <Register
                  isOpen={isOpenReg}
                  onClose={onCloseReg}
                  onOpenLogin={onOpenLogin}
                />
              </button>
            )}
            {isLoggedIn && (
              <Menu>
                <MenuButton className="border-2 border-white-500 rounded-full">
                  <Avatar name="Dan Abrahmov" src={"/avatar.jpeg"} size={"sm"} />
                </MenuButton>
                <MenuList bg={"gray.900"}>
                  <CustomNavLink
                    className=""
                    activeClassName="text-blue-400"
                    to="/profile"
                  >
                    <MenuItem bg={"gray.900"}>{user?.name}</MenuItem>
                  </CustomNavLink>
                  <MenuItem onClick={logout} bg={"gray.900"}>
                    <span className="text-red-500">Logout</span>
                  </MenuItem>
                </MenuList>
              </Menu>
            )}

            <div className="block md:hidden my-auto">
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<HamburgerIcon />}
                  // variant="outline"
                  bg={"gray.300"}
                  _hover={{
                    bg: "gray.400",
                  }}
                  _active={{
                    bg: "gray.500",
                  }}
                  _focus={{
                    bg: "gray.500",
                  }}

                />
                <MenuList bg={"gray.900"}>
                  {routes.map((route: any, index: any) => (
                  <MenuItem key={index} bg={"gray.900"}>
                    <CustomNavLink
                      to={route.path}
                      className=""
                      activeClassName="text-green-500"
                    >
                      {route.name}
                    </CustomNavLink>
                  </MenuItem>
                  ))}

                </MenuList>
              </Menu>
            </div>
          </div>

          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
              <li>
                <CustomNavLink
                  to={routes[0].path}
                  className="text-white hover:text-green-300 font-semibold hover:transition-colors ease-in-out delay-50 "
                  activeClassName="text-green-400 font-semibold "
                >
                  {routes[0].name}
                </CustomNavLink>
              </li>
              <li>
                <CustomNavLink
                  to={routes[1].path}
                  className="text-white hover:text-green-300 font-semibold hover:transition-colors ease-in-out delay-50 "
                  activeClassName="text-green-400 font-semibold "
                >
                  {routes[1].name}
                </CustomNavLink>
              </li>
              <li>
                <Menu>
                  <MenuButton className="hover:text-green-300 hover:transition-colors ease-in-out delay-50" >Services</MenuButton>
                  <MenuList bg={"gray.900"}>
                    <MenuItem bg={"gray.900"}>
                      <CustomNavLink
                        to={routes[2].path}
                        className="hover:text-green-300 font-semibold hover:transition-colors ease-in-out delay-50"
                        activeClassName="text-green-500"
                      >
                        {routes[2].name}
                      </CustomNavLink>
                    </MenuItem>
                    <MenuItem bg={"gray.900"}>
                      <CustomNavLink
                        to={routes[3].path}
                        className="hover:text-green-300 font-semibold hover:transition-colors ease-in-out delay-50"
                        activeClassName="text-green-500"
                      >
                        {routes[3].name}
                      </CustomNavLink>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </li>
              <li>
                <CustomNavLink
                  to={routes[4].path}
                  className="text-white hover:text-green-300 font-semibold hover:transition-colors ease-in-out delay-50 "
                  activeClassName="text-green-400 font-semibold "
                >
                  {routes[4].name}
                </CustomNavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}