// import { Button, Grid, TextField, Box } from "@mui/material";
// import React from "react";
// // import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// // import { login } from "../../../State/Auth/Action";

// const LoginForm = () => {
//   const navigate = useNavigate();
//   // const dispatch = useDispatch();
  
//   const handleSubmit = (event) => {
//            event.preventDefault();
//            const data = new FormData(event.currentTarget);

//            const userData = {
//             email: data.get("email"),
//             password: data.get("password")
//            }

//           //  dispatch(login(userData));

//            console.log("user data from login form is sent to server");

           
//   };
//   return (
//     <div className="mt-[200px]">
//       <form onSubmit={handleSubmit}>
//         <Box className="flex justify-center items-center">
//       <Box className="w-[70vw] md:w-full max-w-[600px]">
//         <Grid container spacing={3} direction="column">
//           <Grid item xs={12}>
//             <TextField
//               required
//               id="email"
//               name="email"
//               label="Email"
//               fullWidth
//               autoComplete="email"
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               required
//               id="password"
//               name="password"
//               label="Password"
//               fullWidth
//               autoComplete="password"
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <Button
//               className="bg-[#9155FD] w-full"
//               type="submit"
//               variant="contained"
//               size="large"
//               sx={{ padding: ".8rem 0" }}
//             >
//               Login
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//       </form>
//       <div className="flex justify-center items-center">
//               <div className="py-3 flex items-center">
//                 <p>if you don't have account ? </p>
//                 <Button onClick={()=>navigate("/register")} className="ml-5" size="small">Register</Button>
//               </div>
//             </div>
//     </div>
//   );
// };

// export default LoginForm;






// import { Box, Button, Grid, TextField } from "@mui/material";
// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const LoginForm = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     console.log("Data sending to backend:", formData);

//     try {
//       const response = await axios.post(
//         "http://localhost:8080/api/user/login",
//         formData,
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       console.log("Login Success:", response.data);

//       // Example: store userId or userName in localStorage
//       localStorage.setItem("userId", response.data.userId);
//       localStorage.setItem("userName", response.data.userName);

//       // Redirect after success
//       navigate("/dashboard"); 
//     } catch (error) {
//       console.error("Login Failed:", error.response?.data || error.message);
//     }
//   };

//   return (
//     <div className="mt-[200px]">
//       <form onSubmit={handleSubmit}>
//         <Box className="flex justify-center items-center">
//           <Box className="w-[70vw] md:w-full max-w-[600px]">
//             <Grid container spacing={3} direction="column">
//               {/* Email */}
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   id="email"
//                   name="email"
//                   label="Email"
//                   fullWidth
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//               </Grid>

//               {/* Password */}
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   id="password"
//                   name="password"
//                   label="Password"
//                   type="password"
//                   fullWidth
//                   value={formData.password}
//                   onChange={handleChange}
//                 />
//               </Grid>

//               {/* Submit */}
//               <Grid item xs={12}>
//                 <Button
//                   className="bg-[#9155FD] w-full"
//                   type="submit"
//                   variant="contained"
//                   size="large"
//                   sx={{ padding: ".8rem 0" }}
//                 >
//                   Login
//                 </Button>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//       </form>

//       {/* Register link */}
//       <div className="flex justify-center items-center">
//         <div className="py-3 flex items-center">
//           <p>Don't have an account?</p>
//           <Button
//             onClick={() => navigate("/register")}
//             className="ml-5"
//             size="small"
//           >
//             Register
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;




import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userName, setUserName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    console.log("sending userdata to backend", userData);
try {
    const response = await axios.post(
      "http://localhost:8080/api/user/login",
      userData,
      { withCredentials: true } // important for session cookie
    );
     localStorage.setItem("latestCropData", JSON.stringify(response.data.buyingCropInfo));
      localStorage.setItem("userData", JSON.stringify(response.data.user));

console.log("localstorage has the crop data from login form....")
     // Fire a global event
  window.dispatchEvent(new CustomEvent("updateCropData", { detail: response.data }));
  console.log(" event triggered from login form.....")

    const fetchedUsername = response.data.user.userName || "";
    console.log("username is ....", fetchedUsername);
     localStorage.setItem("username",fetchedUsername);
        window.dispatchEvent(new Event("usernameChanged"));
    // ✅ Success
    setSuccess(response.data.message || "Login successful!");
    setUserName(response.data.user.userName || "");
    setError("");
    console.log("✅ Session data received:", response.data);

    navigate("/");

  } catch (err) {
    console.error("❌ Login error details:", err);

    // If server responded with an error (status code outside 2xx)
    if (err.response) {
      const status = err.response.status;
      const message = err.response.data?.message || "Something went wrong.";

      switch (status) {
        case 400:
          setError("Invalid request. Please check your input.");
          break;
        case 401:
          setError("Incorrect email or password. Please try again.");
          break;
        case 403:
          setError("You don’t have permission to log in.");
          break;
        case 404:
          setError("Login service not found (404). Check backend URL.");
          break;
        case 500:
          setError("Server error. Please try again later.");
          break;
        default:
          setError(`Unexpected error (${status}): ${message}`);
      }

      console.warn(`⚠️ Backend responded with ${status}: ${message}`);
    } 
    // If request was made but no response received (like server down)
    else if (err.request) {
      console.error("🕸️ No response received from server:", err.request);
      setError("Cannot reach the server. Please check your internet or backend status.");
    } 
    // If something went wrong in setting up the request
    else {
      console.error("⚙️ Request setup error:", err.message);
      setError("An unexpected error occurred while sending the request.");
    }

    setSuccess("");
  }
};
  return (
    <div className="mt-[200px]">
      <form onSubmit={handleSubmit}>
        <Box className="flex justify-center items-center">
          <Box className="w-[70vw] md:w-full max-w-[600px]">
            <Grid container spacing={3} direction="column">
              <Grid item xs={12}>
                <TextField
                  required
                  id="email"
                  name="email"
                  label="Email"
                  fullWidth
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  fullWidth
                  autoComplete="current-password"
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  className="bg-[#9155FD] w-full"
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ padding: ".8rem 0" }}
                >
                  Login
                </Button>
              </Grid>
            </Grid>

            {success && (
              <Typography color="green" className="mt-3">
                {success} 🎉 Welcome {userName}
              </Typography>
            )}
            {error && (
              <Typography color="red" className="mt-3">
                {error}
              </Typography>
            )}
          </Box>
        </Box>
      </form>

      <div className="flex justify-center items-center">
        <div className="py-3 flex items-center">
          <p>Don’t have an account?</p>
          <Button
            onClick={() => navigate("/register")}
            className="ml-5"
            size="small"
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
