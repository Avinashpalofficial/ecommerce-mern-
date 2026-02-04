import React from "react";

import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
} from "@material-tailwind/react";

import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  Bars2Icon,
} from "@heroicons/react/24/solid";

import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

import { motion } from "framer-motion";


/* ================= PROFILE MENU ================= */

const profileMenuItems = [
  { label: "My Profile", icon: UserCircleIcon, path: "/myprofile" },
  { label: "Edit Profile", icon: Cog6ToothIcon, path: "/send-otp" },
  { label: "Inbox", icon: InboxArrowDownIcon },
  { label: "Help", icon: LifebuoyIcon },
  { label: "Sign Out", icon: PowerIcon },
];

function ProfileMenu({ onLogout }) {

  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();


  const handleClick = (item) => {

    if (item.label === "Sign Out") {
      onLogout();
      return;
    }

    if (item.path) {
      navigate(item.path);
    }
  };


  return (

    <Menu open={open} handler={setOpen} placement="bottom-end">

      <MenuHandler>
        <Button
          variant="text"
          className="flex items-center gap-1 rounded-full py-1 pr-2 pl-1"
        >

          <Avatar
            size="sm"
            variant="circular"
            className="border p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d"
          />

          <ChevronDownIcon
            className={`h-4 w-4 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />

        </Button>
      </MenuHandler>


      <MenuList className="p-2 rounded-xl shadow-xl">

        {profileMenuItems.map((item) => (

          <MenuItem
            key={item.label}
            onClick={() => handleClick(item)}
            className="flex items-center gap-2 rounded-lg"
          >

            {React.createElement(item.icon, {
              className: "h-4 w-4 text-indigo-600",
            })}

            <Typography variant="small">
              {item.label}
            </Typography>

          </MenuItem>

        ))}

      </MenuList>

    </Menu>
  );
}


/* ================= NAV LIST ================= */

const navListItems = [
  { label: "Contact", icon: UserCircleIcon, link: "/contact" },
  { label: "About", icon: CubeTransparentIcon, link: "/about" },
  { label: "Blog", icon: CodeBracketSquareIcon, link: "/blog" },
];

function NavList() {

  return (

    <ul className="flex flex-col gap-2 lg:flex-row lg:items-center">

      {navListItems.map(({ label, icon, link }) => (

        <Link key={label} to={link}>

          <MenuItem className="flex items-center gap-2 rounded-lg">

            {React.createElement(icon, {
              className: "h-5 w-5 text-indigo-600",
            })}

            <span className="font-medium">
              {label}
            </span>

          </MenuItem>

        </Link>

      ))}

    </ul>
  );
}


/* ================= MAIN NAVBAR ================= */

export default function ComplexNavbar() {
    const {user,logout,isAuthenticated,loading}= useAuth()
    const navigate =  useNavigate()
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  if(loading) return null

  const { cartItem = [] } = useCart();


  /* ================= CART COUNT ================= */

  const cartCount = cartItem.reduce(
    (total, item) => total + item.qty,
    0
  );


  /* ================= LOAD USER ================= */

  


  /* ================= RESPONSIVE ================= */

  React.useEffect(() => {

    const handleResize = () => {
      if (window.innerWidth >= 960) setIsNavOpen(false);
    };

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener("resize", handleResize);

  }, []);


  /* ================= LOGOUT ================= */

  const handleLogout = async () => {

  await logout();        // backend + context clear
  navigate("/login");   // redirect
};



  return (

    /* ================= STICKY GLASS NAVBAR ================= */

    <Navbar
      className="
        sticky top-0 z-50
        mx-auto max-w-screen-xl
        p-3 lg:px-6
        bg-white/70 backdrop-blur-xl
        border border-white/40
        shadow-lg
      "
    >

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}

        className="
          relative mx-auto
          flex items-center justify-between
          text-blue-gray-900
        "
      >


        {/* ================= LOGO ================= */}

        <Link
          to="/"
          className="font-bold text-2xl text-indigo-600"
        >
          Clover
        </Link>


        {/* ================= RIGHT ================= */}

        <div className="flex items-center space-x-4">


          {/* LINKS */}
          <Link
            to="/"
            className="font-medium hover:text-indigo-600"
          >
            Home
          </Link>

          <Link
            to="/allproduct"
            className="font-medium hover:text-indigo-600"
          >
            Products
          </Link>


          {/* DESKTOP NAV */}
          <div className="hidden lg:block">
            <NavList />
          </div>


          {/* ================= CART ================= */}

          <Link to="/cart" className="relative">

            <span className="text-2xl">🛒</span>

            {cartCount > 0 && (

              <span
                className="
                  absolute -top-2 -right-2
                  bg-red-500 text-white
                  text-xs font-bold
                  w-5 h-5 flex items-center justify-center
                  rounded-full
                "
              >
                {cartCount > 9 ? "9+" : cartCount}
              </span>

            )}

          </Link>


          {/* ================= MOBILE ================= */}

          <IconButton
            size="sm"
            variant="text"
            onClick={() =>
              setIsNavOpen((cur) => !cur)
            }
            className="lg:hidden"
          >
            <Bars2Icon className="h-6 w-6" />
          </IconButton>


          {/* ================= AUTH ================= */}

          {isAuthenticated ? (

  <div className="flex items-center gap-2">

    <span className="font-semibold text-sm hidden sm:block">
      Hi, {user?.firstName || "User"}
    </span>

    <ProfileMenu onLogout={handleLogout} />

  </div>

) : (

  <Button
    size="sm"
    variant="gradient"
    className="rounded-xl from-indigo-600 to-purple-600"
  >
    <Link to="/login">Login</Link>
  </Button>

)}


        </div>

      </motion.div>


      {/* ================= MOBILE NAV ================= */}

      <MobileNav open={isNavOpen} className="rounded-xl mt-2">

        <NavList />

      </MobileNav>

    </Navbar>
  );
}
