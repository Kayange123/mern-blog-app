import {
  Avatar,
  Box,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { googleId } from "../../secretKeys/googleId";
import { GoogleLogin } from "react-google-login";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Paper, Toolbar } from "@material-ui/core";
import { AUTH } from "../../constants/actionTypes";
import { signin, signup } from "../../actions/auth";
import { useStyles } from "./style";
const initialState = { fullname: "", email: "", password: "" };
const Auth = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPasword] = useState(false);
  const [loginFeedback, setLoginFeedback] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [inputs, setInputs] = useState(initialState);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      dispatch(signup(inputs, navigate));
    } else {
      dispatch(signin(inputs, navigate));
    }
  };
  const handleShowPassword = () => {
    setShowPasword((PrevShowPassword) => !PrevShowPassword);
  };
  const googleSuccess = async (res) => {
    const result = await res?.profileObj;
    const token = await res?.token;
    try {
      dispatch({ type: AUTH, data: { result, token } });
    } catch (error) {}
  };
  const googleFailure = (error) => {
    // console.log(error);
    // console.log("Google signin was unsuccessful, Try again later!");
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={0}>
        <form onSubmit={handleSubmit}>
          <Box className={classes.card}>
            {loginFeedback && <Toolbar>{loginFeedback}</Toolbar>}
            <Toolbar className={classes.card_head}>
              {isSignUp ? "SignUp" : <Avatar></Avatar>}
            </Toolbar>
            {isSignUp && (
              <TextField
                name="fullname"
                autoFocus
                fullWidth
                required
                onBlur={(e) => setLoginFeedback(null)}
                onChange={handleChange}
                type={"text"}
                value={inputs.fullname}
                label="Full Name"
                margin="normal"
              />
            )}
            <TextField
              name="email"
              onChange={handleChange}
              value={inputs.email}
              type={"email"}
              fullWidth
              required
              onBlur={(e) => setLoginFeedback(null)}
              autoFocus
              label="E-mail"
              margin="normal"
            />
            <TextField
              name="password"
              onChange={handleChange}
              value={inputs.password}
              fullWidth
              type={showPassword ? "text" : "password"}
              required
              onBlur={(e) => setLoginFeedback(null)}
              label="Password"
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleShowPassword}
                      size="small"
                      color="blue"
                    >
                      {!showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit" variant="contained">
              Submit
            </Button>
            <div className="mt-2">
              <GoogleLogin
                clientId={googleId}
                render={(renderProps) => (
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    fullWidth
                  >
                    Google sign in
                  </Button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy="single_host_origin"
              />
            </div>
            <Button
              sx={{ marginTop: 1 }}
              variant="contained"
              onClick={() => setIsSignUp((prevIsSignUp) => !prevIsSignUp)}
            >
              {isSignUp
                ? "Already have account? Login"
                : "Don't have account? Sign Up"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;