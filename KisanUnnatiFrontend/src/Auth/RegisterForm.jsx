import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  // Step control: false = register form, true = OTP form
  const [isOtpStage, setIsOtpStage] = useState(false);

  // User data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    state: "",
    district: "",
    cityVillage: "",
    fullAddress: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });

  // OTP state
  const [otp, setOtp] = useState("");

  // State and District dropdown
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);

  // Validation errors - Now only used for client-side errors before API call
  // API errors will be set directly to the state/alerted
  const [errors, setErrors] = useState({});
  // New state for API-side validation/business logic errors
  const [apiErrors, setApiErrors] = useState({});
  const [generalApiError, setGeneralApiError] = useState("");

  const API_KEY =
    "ZERCaVYybU1zcXNMRzJuOWdBekNQOG1oNXlCRTVodDdXUFdmcW5mUA==";

  // Fetch States (kept as is)
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get(
          "https://api.countrystatecity.in/v1/countries/IN/states",
          { headers: { "X-CSCAPI-KEY": API_KEY } }
        );
        setStates(response.data);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };
    fetchStates();
  }, []);

  // Fetch Districts (kept as is)
  useEffect(() => {
    const fetchDistricts = async () => {
      if (!formData.state) return;
      try {
        const selectedState = states.find((s) => s.name === formData.state);
        if (!selectedState) return;
        const response = await axios.get(
          `https://api.countrystatecity.in/v1/countries/IN/states/${selectedState.iso2}/cities`,
          { headers: { "X-CSCAPI-KEY": API_KEY } }
        );
        setDistricts(response.data.map((d) => d.name));
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    };
    fetchDistricts();
  }, [formData.state, states]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear client-side errors on change
    setErrors({ ...errors, [e.target.name]: "" }); 
    // Clear API-side errors on change
    setApiErrors({ ...apiErrors, [e.target.name]: "" }); 
    setGeneralApiError(""); // Clear general API error
  };

  // Client-side form validation (kept as is)
  const validateForm = () => {
    let tempErrors = {};

    if (!formData.name.trim()) tempErrors.name = "Full Name is required";
    if (!formData.email.trim()) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      tempErrors.email = "Invalid email format";

    if (!formData.mobileNumber.trim())
      tempErrors.mobileNumber = "Mobile Number is required";
    else if (!/^[0-9]{10}$/.test(formData.mobileNumber))
      tempErrors.mobileNumber =
        "Mobile number must be 10 digits, also check it contains valid first digit";

    if (!formData.state) tempErrors.state = "State is required";
    if (!formData.district) tempErrors.district = "District is required";
    if (!formData.cityVillage.trim())
      tempErrors.cityVillage = "City / Village is required";
    if (!formData.fullAddress.trim())
      tempErrors.fullAddress = "Full Address is required";

    if (!formData.userName.trim()) tempErrors.userName = "User Name is required";
    else if (formData.userName.trim().length < 3)
      tempErrors.userName = "User Name must be at least 3 characters long";
    else if (formData.userName.trim().length > 50)
      tempErrors.userName = "User Name cannot exceed 50 characters";

    if (!formData.password) tempErrors.password = "Password is required";
    else if (formData.password.length < 6)
      tempErrors.password = "Password must be at least 6 characters";

    if (!formData.confirmPassword)
      tempErrors.confirmPassword = "Confirm your password";
    else if (formData.password !== formData.confirmPassword)
      tempErrors.confirmPassword = "Passwords do not match";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Step 1 → Register form submit (generate OTP)
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset API errors before submission
    setApiErrors({});
    setGeneralApiError("");

    if (!validateForm()) return; // stop if client-side errors

    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/register",
        formData,
        { withCredentials: true }
      );

      console.log("Registration Success:", response.data);

      alert("✅ OTP sent to your email / mobile!");
      setIsOtpStage(true);
    } catch (error) {
      console.error("Registration Failed:", error.response?.data || error.message);

      const responseData = error.response?.data;

      if (responseData && responseData.errors) {
        // Backend returned a list of errors (either validation or single string array)
        const errorList = responseData.errors;

        if (Array.isArray(errorList)) {
            // Case 1: Multiple JSR-303/Spring Validation Errors (e.g., ["Name is required", "Email is invalid"])
            // We need a helper to map these generic messages to specific fields.
            // Since the backend doesn't provide field names, we must infer the field based on the message content.

            // --- START FIELD MAPPING LOGIC ---
            const newApiErrors = {};
            let isPasswordMismatch = false;
            let isDuplicateUser = false;
            let generalErrors = [];
            
            errorList.forEach(errMsg => {
                const lowerMsg = errMsg.toLowerCase();
                
                // Business logic errors from the backend have a clear string format
                if (lowerMsg.includes("password and confirm-password do not match")) {
                    newApiErrors.confirmPassword = errMsg;
                    isPasswordMismatch = true;
                } else if (lowerMsg.includes("already register") || lowerMsg.includes("email already exists")) {
                    setGeneralApiError(errMsg);
                    isDuplicateUser = true;
                } 
                // JSR-303 validation errors (must infer field name)
                else if (lowerMsg.includes("name")) {
                    newApiErrors.name = errMsg;
                } else if (lowerMsg.includes("email")) {
                    newApiErrors.email = errMsg;
                } else if (lowerMsg.includes("mobile")) {
                    newApiErrors.mobileNumber = errMsg;
                } else if (lowerMsg.includes("district")) {
                    newApiErrors.district = errMsg;
                } else if (lowerMsg.includes("state")) {
                    newApiErrors.state = errMsg;
                } else if (lowerMsg.includes("city") || lowerMsg.includes("village")) {
                    newApiErrors.cityVillage = errMsg;
                } else if (lowerMsg.includes("address")) {
                    newApiErrors.fullAddress = errMsg;
                } else if (lowerMsg.includes("user-name")) {
                    newApiErrors.userName = errMsg;
                } else if (lowerMsg.includes("password")) {
                    // Be careful not to overwrite confirmPassword mismatch error
                    if (!isPasswordMismatch) {
                        newApiErrors.password = errMsg;
                    }
                } else {
                    generalErrors.push(errMsg);
                }
            });
            // --- END FIELD MAPPING LOGIC ---

            setApiErrors(newApiErrors);
            if (!isDuplicateUser && generalErrors.length > 0) {
                 // Fallback for any unmapped errors
                 setGeneralApiError("Registration failed: " + generalErrors.join(", "));
            }

        } else if (typeof errorList === 'string') {
            // Case 2: Backend returns a single error message wrapped in an "errors" key (e.g. from RuntimeException)
            setGeneralApiError(errorList);
        }

      } else if (responseData && (responseData.message || responseData.error)) {
        // Fallback for non-standard error structures
         setGeneralApiError(responseData.message || responseData.error);
      } else {
        setGeneralApiError("Registration failed! Please check your network or try again.");
      }
    }
  };

  // Step 2 → OTP form submit (kept as is)
  const handleOtpSubmit = async (event) => {
    event.preventDefault();

    if (!otp.trim()) {
      alert("Please enter OTP!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/sendOtp",
        { otp },
        { withCredentials: true }
      );

      console.log("OTP verification success:", response.data);

      if (response.data?.message) {
        alert(response.data.message);
      } else if (response.data?.error) {
        alert(response.data.error);
        return;
      } else {
        alert("OTP Verified Successfully ✅");
      }

      navigate("/login");
    } catch (error) {
      console.error("OTP Verification Failed:", error.response?.data || error.message);

      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Invalid or expired OTP ❌");
      }
    }
  };

  return (
    <div className="mt-[200px] mb-[100px]">
      {!isOtpStage ? (
        // =====================================
        // STEP 1: USER REGISTRATION FORM
        // =====================================
        <form onSubmit={handleSubmit}>
          <Box className="flex flex-col justify-center items-center">
            <Box className="w-[70vw] md:w-full max-w-[600px]">
              <Typography
                variant="h5"
                className="text-center mb-4 font-bold text-[#9155FD]"
              >
                Create Your Account
              </Typography>
              
              {/* === GENERAL API ERROR DISPLAY === */}
              {generalApiError && (
                <Typography color="error" align="center" variant="body2" sx={{ mb: 2, fontWeight: 'bold', border: '1px solid red', p: 1, borderRadius: '4px' }}>
                    {generalApiError}
                </Typography>
              )}
              {/* ================================== */}

              <Grid container spacing={3} direction="column">
                {/* Full Name */}
                <Grid item>
                  <TextField
                    required
                    label="Full Name"
                    name="name"
                    fullWidth
                    value={formData.name}
                    onChange={handleChange}
                    error={!!errors.name || !!apiErrors.name}
                    helperText={errors.name || apiErrors.name}
                  />
                </Grid>

                {/* Email */}
                <Grid item>
                  <TextField
                    required
                    label="Email"
                    name="email"
                    fullWidth
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email || !!apiErrors.email}
                    helperText={errors.email || apiErrors.email}
                  />
                </Grid>

                {/* Mobile Number */}
                <Grid item>
                  <TextField
                    required
                    label="Mobile Number"
                    name="mobileNumber"
                    fullWidth
                    inputProps={{ maxLength: 10 }}
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    error={!!errors.mobileNumber || !!apiErrors.mobileNumber}
                    helperText={errors.mobileNumber || apiErrors.mobileNumber}
                  />
                </Grid>

                {/* State */}
                <Grid item>
                  <FormControl fullWidth required error={!!errors.state || !!apiErrors.state}>
                    <InputLabel>State</InputLabel>
                    <Select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                    >
                      {states.map((s) => (
                        <MenuItem key={s.iso2} value={s.name}>
                          {s.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {(errors.state || apiErrors.state) && (
                      <Typography color="error" variant="caption">
                        {errors.state || apiErrors.state}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                {/* District */}
                <Grid item>
                  <FormControl
                    fullWidth
                    required
                    disabled={!districts.length}
                    error={!!errors.district || !!apiErrors.district}
                  >
                    <InputLabel>District</InputLabel>
                    <Select
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                    >
                      {districts.map((d) => (
                        <MenuItem key={d} value={d}>
                          {d}
                        </MenuItem>
                      ))}
                    </Select>
                    {(errors.district || apiErrors.district) && (
                      <Typography color="error" variant="caption">
                        {errors.district || apiErrors.district}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                {/* City / Village */}
                <Grid item>
                  <TextField
                    required
                    label="City / Village"
                    name="cityVillage"
                    fullWidth
                    value={formData.cityVillage}
                    onChange={handleChange}
                    error={!!errors.cityVillage || !!apiErrors.cityVillage}
                    helperText={errors.cityVillage || apiErrors.cityVillage}
                  />
                </Grid>

                {/* Full Address */}
                <Grid item>
                  <TextField
                    required
                    label="Full Address"
                    name="fullAddress"
                    fullWidth
                    multiline
                    rows={3}
                    value={formData.fullAddress}
                    onChange={handleChange}
                    error={!!errors.fullAddress || !!apiErrors.fullAddress}
                    helperText={errors.fullAddress || apiErrors.fullAddress}
                  />
                </Grid>

                {/* User Name */}
                <Grid item>
                  <TextField
                    required
                    label="User Name"
                    name="userName"
                    fullWidth
                    value={formData.userName}
                    onChange={handleChange}
                    error={!!errors.userName || !!apiErrors.userName}
                    helperText={errors.userName || apiErrors.userName}
                  />
                </Grid>

                {/* Password */}
                <Grid item>
                  <TextField
                    required
                    label="Password"
                    type="password"
                    name="password"
                    fullWidth
                    value={formData.password}
                    onChange={handleChange}
                    error={!!errors.password || !!apiErrors.password}
                    helperText={errors.password || apiErrors.password}
                  />
                </Grid>

                {/* Confirm Password */}
                <Grid item>
                  <TextField
                    required
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    fullWidth
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={!!errors.confirmPassword || !!apiErrors.confirmPassword}
                    helperText={errors.confirmPassword || apiErrors.confirmPassword}
                  />
                </Grid>

                {/* Register Button */}
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ width: "100%", padding: "10px" }}
                  >
                    Register
                  </Button>
                </Grid>
              </Grid>

              <div className="flex justify-center items-center py-3">
                <Typography>Already have an account?</Typography>
                <Button onClick={() => navigate("/login")}>Login</Button>
              </div>
            </Box>
          </Box>
        </form>
      ) : (
        // =====================================
        // STEP 2: OTP VERIFICATION FORM (kept as is)
        // =====================================
        <form onSubmit={handleOtpSubmit}>
          <Box className="flex flex-col justify-center items-center">
            <Box className="w-[70vw] md:w-full max-w-[400px] text-center">
              <Typography variant="h5" className="mb-4">
                Verify Your OTP
              </Typography>
              <Typography variant="body1" className="mb-3">
                Enter the 6-digit OTP sent to your registered Email.
              </Typography>

              <TextField
                required
                id="otp"
                label="Enter OTP"
                fullWidth
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                inputProps={{ maxLength: 6 }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 3, width: "100%" }}
              >
                Verify OTP
              </Button>
            </Box>
          </Box>
        </form>
      )}
    </div>
  );
};

export default RegisterForm;