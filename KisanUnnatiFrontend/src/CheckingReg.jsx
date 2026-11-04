import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

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
    confirmPassword: ""
  });

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);

  const API_KEY = "ZERCaVYybU1zcXNMRzJuOWdBekNQOG1oNXlCRTVodDdXUFdmcW5mUA=="; // 🔹 Replace with your API key

  // 🔹 Fetch States of India
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

  // 🔹 Fetch Districts (Cities) when state changes
  useEffect(() => {
    const fetchDistricts = async () => {
      if (!formData.state) return;

      try {
        const selectedState = states.find(s => s.name === formData.state);
        if (!selectedState) return;

        const response = await axios.get(
          `https://api.countrystatecity.in/v1/countries/IN/states/${selectedState.iso2}/cities`,
          { headers: { "X-CSCAPI-KEY": API_KEY } }
        );

        setDistricts(response.data.map(d => d.name));
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    };
    fetchDistricts();
  }, [formData.state, states]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Data sending to backend:", formData);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/register",
        formData
      );
      console.log("Registration Success:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Registration Failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="mt-[230px]">
      <form onSubmit={handleSubmit}>
        <Box className="flex flex-col justify-center items-center">
          <Box className="w-[70vw] md:w-full max-w-[600px]">
            <Grid container spacing={3} direction="column">

              {/* Full Name */}
              <Grid item xs={12}>
                <TextField
                  required
                  id="name"
                  name="name"
                  label="Full Name"
                  fullWidth
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>

              {/* Email */}
              <Grid item xs={12}>
                <TextField
                  required
                  id="email"
                  name="email"
                  label="Email"
                  fullWidth
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>

              {/* Mobile Number */}
              <Grid item xs={12}>
                <TextField
                  required
                  id="mobileNumber"
                  name="mobileNumber"
                  label="Mobile Number"
                  fullWidth
                  inputProps={{ maxLength: 10 }}
                  value={formData.mobileNumber}
                  onChange={handleChange}
                />
              </Grid>

              {/* State Dropdown */}
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel id="state-label">State</InputLabel>
                  <Select
                    labelId="state-label"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  >
                    {states.map(state => (
                      <MenuItem key={state.iso2} value={state.name}>
                        {state.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* District Dropdown */}
              <Grid item xs={12}>
                <FormControl fullWidth required disabled={!districts.length}>
                  <InputLabel id="district-label">District</InputLabel>
                  <Select
                    labelId="district-label"
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                  >
                    {districts.map(district => (
                      <MenuItem key={district} value={district}>
                        {district}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* City / Village */}
              <Grid item xs={12}>
                <TextField
                  required
                  id="cityVillage"
                  name="cityVillage"
                  label="City / Village"
                  fullWidth
                  value={formData.cityVillage}
                  onChange={handleChange}
                />
              </Grid>

              {/* Full Address */}
              <Grid item xs={12}>
                <TextField
                  required
                  id="fullAddress"
                  name="fullAddress"
                  label="Full Address"
                  fullWidth
                  multiline
                  rows={3}
                  value={formData.fullAddress}
                  onChange={handleChange}
                />
              </Grid>

              {/* User Name */}
              <Grid item xs={12}>
                <TextField
                  required
                  id="userName"
                  name="userName"
                  label="User Name"
                  fullWidth
                  value={formData.userName}
                  onChange={handleChange}
                />
              </Grid>

              {/* Password */}
              <Grid item xs={12}>
                <TextField
                  required
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>

              {/* Confirm Password */}
              <Grid item xs={12}>
                <TextField
                  required
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  className="bg-[#9155FD] w-full"
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ padding: ".8rem 0" }}
                >
                  Register
                </Button>
              </Grid>
            </Grid>

            {/* Bottom link */}
            <div className="flex justify-center items-center py-3">
              <p>If you already have an account?</p>
              <Button
                onClick={() => navigate("/login")}
                className="ml-3"
                size="small"
              >
                Login
              </Button>
            </div>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default RegisterForm;
