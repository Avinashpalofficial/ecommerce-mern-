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
  Card,
  IconButton,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext"; // ✅ Cart Context
import { Navigate } from "react-router-dom";

/* ================= PROFILE MENU ================= */

const profileMenuItems = [
  { label: "My Profile", icon: UserCircleIcon },
  { label: "Edit Profile", icon: Cog6ToothIcon },
  { label: "Inbox", icon: InboxArrowDownIcon },
  { label: "Help", icon: LifebuoyIcon },
  { label: "Sign Out", icon: PowerIcon },
];

function ProfileMenu({onlogout}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate()
  
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5"
        >
          <Avatar
            variant="circular"
            size="sm"
            className="border p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d"
          />
          <ChevronDownIcon
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>

      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }) => (
          <MenuItem key={label} className="flex items-center gap-2"onClick={()=>{
            if(label === "Sign Out") {
              onlogout()
            }
           if(label==="My Profile"){
                 navigate('/myprofile')
           }
          }}>
            {React.createElement(icon, { className: "h-4 w-4" })}
            <Typography variant="small">{label}</Typography>
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
          <MenuItem className="flex items-center gap-2">
            {React.createElement(icon, { className: "h-5 w-5" })}
            <span>{label}</span>
          </MenuItem>
        </Link>
      ))}
    </ul>
  );
}

/* ================= MAIN NAVBAR ================= */

export default function ComplexNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const [user,setUser] = React.useState(null)

  // ✅ Cart Context (safe default)
  const { cartItem = [] } = useCart();

  const cartCount = cartItem.reduce(
    (total, item) => total + item.qty,
    0
  );
 React.useEffect(()=>{
          const saved = localStorage.getItem('user')
          if (saved) setUser(JSON.parse(saved));
 },[])
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setIsNavOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
   const handleLogout = ()=>{
          localStorage.removeItem('user')
          localStorage.removeItem('token')
          window.location.reload()
   }

  return (
    <Navbar className="mx-auto max-w-screen-xl p-2 lg:pl-6 shadow-none">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">

        {/* LEFT : LOGO */}
        <Link
          to="/"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium text-xl"
        >
          Clover
        </Link>

        {/* RIGHT : CONTENT */}
        <div className="flex items-center space-x-4">

          {/* Home */}
          <Link
            to="/"
            className="mr-4 ml-2 cursor-pointer font-medium text-xl hover:bg-red-300/10 lg:rounded-full px-2 py-2"
          >
            Home
          </Link>

           <Link
            to="/allproduct"
            className="mr-4 ml-2 cursor-pointer font-medium text-xl hover:bg-red-300/10 lg:rounded-full px-2 py-2"
          >
            Products
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:block">
            <NavList />
          </div>

          {/* 🛒 CART SECTION (ADDED) */}
          <Link to="/cart" className="relative cursor-pointer">
            <span className="text-2xl">🛒</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <IconButton
            size="sm"
            color="blue-gray"
            variant="text"
            onClick={() => setIsNavOpen((cur) => !cur)}
            className="lg:hidden"
          >
            <Bars2Icon className="h-6 w-6" />
          </IconButton>

          {/* Login */}
          {user ? (
            <>
              <span className="font-semibold">
                Hello, {user.firstName || "User"}
              </span>

              <ProfileMenu onlogout={handleLogout} />
            </>
          ) : (
            <Button size="sm" variant="text">
              <Link to="/login">Log In</Link>
            </Button>
          )}

          {/* Profile */}
        
        </div>
      </div>

      {/* MOBILE NAV */}
      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList />
      </MobileNav>
    </Navbar>
  );
}
