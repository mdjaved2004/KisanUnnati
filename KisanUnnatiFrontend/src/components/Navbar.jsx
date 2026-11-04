import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// 1. CSS INJECTION FUNCTION: Hides logo/text and styles the dropdown
const injectTranslateStyles = () => {
  const styleId = "google-translate-style";
  if (document.getElementById(styleId)) return;

  const style = document.createElement("style");
  style.id = styleId;
  style.innerHTML = `
    /* HIDE the Google Logo, "Powered by," and "Translate" text */
    .goog-logo-link, 
    .goog-te-gadget span {
      display: none !important;
    }
    
    /* Shrink the main gadget container to eliminate excess space */
    .goog-te-gadget {
      font-size: 0 !important;
      padding: 0 !important;
      line-height: 0 !important;
      margin-top: -5px; /* Adjust vertical alignment if needed */
    }

    /* Target the dropdown select element for professional styling */
    .goog-te-gadget .goog-te-combo {
      /* Reset Font Size (it was set to 0 by the parent rule) */
      font-size: 14px !important; 
      
      /* Professional Design Changes */
      background-color: #f0f0f0 !important; /* Light gray background */
      color: #15803d !important; /* Darker green text */
      border: 1px solid #34d399 !important; /* Light green border */
      border-radius: 4px !important;
      padding: 4px 8px !important;
      cursor: pointer;
      box-shadow: none !important; /* Remove default Google box shadow */
    }
  `;
  document.head.appendChild(style);
};


const loadGoogleTranslateScript = () => {
  if (document.getElementById("google-translate-script")) return;

  window.googleTranslateElementInit = function () {
    new window.google.translate.TranslateElement(
      { pageLanguage: "en" },
      "google_translate_element"
    );
    // Note: The previous interval/timeout logic is removed as the CSS is more reliable.
  };

  const script = document.createElement("script");
  script.id = "google-translate-script";
  script.type = "text/javascript";
  script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  document.body.appendChild(script);
};

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem("username") || "");

  const handleUserClick = (event) => setAnchorEl(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorEl(null);
  const openUserMenu = Boolean(anchorEl);

  const handleLogout = () => {
    localStorage.removeItem("username");
    window.dispatchEvent(new Event("usernameChanged"));
    handleCloseUserMenu();
    navigate("/login");
  };

  useEffect(() => {
    // 2. Load the CSS and Script
    injectTranslateStyles();
    loadGoogleTranslateScript();

    const handleUsernameChange = () => {
      const updatedUsername = localStorage.getItem("username") || "";
      setUsername(updatedUsername);
    };

    window.addEventListener("storage", handleUsernameChange);
    window.addEventListener("usernameChanged", handleUsernameChange);

    return () => {
      window.removeEventListener("storage", handleUsernameChange);
      window.removeEventListener("usernameChanged", handleUsernameChange);
    };
  }, []);

  const firstLetter = username ? username[0].toUpperCase() : "";

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-green-700 text-white shadow-md z-50">
        
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center p-2 bg-green-600 gap-2">

          {/* 🔍 Centered Search Bar */}
          <div className="flex w-full md:w-1/2 max-w-lg justify-center">
            <input
              type="text"
              placeholder="Search for Agriculture"
              className="px-3 py-1 rounded-l-md w-4/5 text-gray-800 focus:outline-none"
            />
            <button className="bg-yellow-400 px-3 py-1 rounded-r-md text-black font-semibold hover:bg-yellow-500 transition-colors">
              🔍
            </button>
          </div>

          {/* 🗣️ Google Translate (Clean, Professional Dropdown) */}
          <div
            id="google_translate_element"
            className="hidden md:block translate-container p-0 m-0" // Removed background/padding/margin for a cleaner look
            style={{
              // Removed transform for native size and cleaner look
              marginTop: "5px", // Subtle adjustment to center vertically
              marginRight: "10px", 
            }}
          ></div>
        </div>

        {/* 🌾 Main Navigation */}
        <nav className="flex items-center justify-between px-4 py-3 relative z-50">
          <a
            href="/"
            className="text-2xl font-bold tracking-wide hover:text-yellow-300 transition-colors"
          >
            Kissan Unnati
          </a>

          <button
            className="block lg:hidden focus:outline-none p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className="text-3xl">☰</span>
          </button>

          <ul
            className={`flex-col lg:flex lg:flex-row lg:items-center absolute lg:static bg-green-700 left-0 w-full lg:w-auto transition-all duration-300 ease-in-out z-50 shadow-lg lg:shadow-none ${
              menuOpen ? "top-full opacity-100" : "top-[-400px] opacity-0 lg:opacity-100"
            }`}
            onClick={() => setMenuOpen(false)}
          >
            <li className="px-4 py-2 hover:bg-green-600 transition-colors">
              <a href="/cropInfo">About Agriculture</a>
            </li>
            <li className="px-4 py-2 hover:bg-green-600 transition-colors">
              <a href="/">Market Rate</a>
            </li>
            <li className="px-4 py-2 hover:bg-green-600 transition-colors">
              <a href="/demCrop">Demanding Crop</a>
            </li>
            <li className="px-4 py-2 hover:bg-green-600 transition-colors">
              <a href="/buyCrop">Buy Crop</a>
            </li>
            <li className="px-4 py-2 hover:bg-green-600 transition-colors">
              <a href="/sellCrop">Sell Crop</a>
            </li>
            <li className="px-4 py-2 hover:bg-green-600 transition-colors">
              <a href="/govtScheme">Government Schemes</a>
            </li>

            <li className="px-4 py-3 flex justify-center lg:hidden border-t border-green-500 mt-2">
              {username ? (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleLogout}
                  sx={{ bgcolor: deepPurple[500], color: "white", width: "80%" }}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/login");
                  }}
                  variant="contained"
                  color="warning"
                  sx={{ width: "80%" }}
                >
                  Sign in
                </Button>
              )}
            </li>
          </ul>

          <div className="hidden lg:flex items-center space-x-3 z-50">
            {username ? (
              <>
                <Avatar
                  className="text-white"
                  onClick={handleUserClick}
                  aria-controls={openUserMenu ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openUserMenu ? "true" : undefined}
                  sx={{
                    bgcolor: deepPurple[500],
                    color: "white",
                    cursor: "pointer",
                    transition: "transform 0.2s",
                    "&:hover": { transform: "scale(1.1)" },
                  }}
                >
                  {firstLetter}
                </Avatar>

                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openUserMenu}
                  onClose={handleCloseUserMenu}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      navigate("/profile");
                    }}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      navigate("/orders");
                    }}
                  >
                    My Orders
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                onClick={() => navigate("/login")}
                className="text-sm font-medium text-white hover:text-yellow-300 transition-colors"
                sx={{
                  textTransform: "none",
                  "&:hover": { backgroundColor: "transparent" },
                }}
              >
                <span className="animate-pulse">Sign in</span>
              </Button>
            )}
          </div>
        </nav>
      </header>

      <div className="pt-[110px]"></div>
    </>
  );
};

export default Navbar;
