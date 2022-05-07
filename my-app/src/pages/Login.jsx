import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Container,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import React, { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import axios from "axios";
import AuthContext from "../context/AuthProvider";
import Home from "./Home";

let accessToken = "";
let statusCode = "";
function Logar(user, password) {
  return axios
    .post("http://191.252.59.151:81/authenticate", {
      username: user,
      password: password,
    })
    .then((response) => {
      if (response.status === 200) {
        console.log("Autorizado : ", response.data.jwttoken);
        localStorage.setItem("token", response.data.jwttoken);

        statusCode = response.status;
        accessToken = response.data.jwttoken;
      } else {
        statusCode = response.status;
        console.log("Não autorizado");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function Login() {
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const { setAuth } = useContext(AuthContext);
  // const userRef = useRef();
  // const errRef = useRef();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, password]);

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user, password);
    try {
      const response = await Logar(user, password);

      if (statusCode === 200) {
        setAuth({ user, password, accessToken });
        setUser("");
        setPassword("");
        setSuccess(true);
      } else if (statusCode === 400) {
        setErrMsg("Missing Username or Password");
      } else if (statusCode === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    } catch (err) {
      // if (!err?.response) {
      //   setErrMsg("No Server Response");
      // } else if (err.response?.status === 400) {
      //   setErrMsg("Missing Username or Password");
      // } else if (err.response?.status === 401) {
      //   setErrMsg("Unauthorized");
      // } else {
      //   setErrMsg("Login Failed");
      // }
      // errRef.current.focus();
    }
  };

  return (
    <Container maxWidth="sm">
      {localStorage.getItem("token") == null ? (
        <div className="container-login">
          <div className="box-login">
            <h1 className="titulo-login">Casa Aposta</h1>
            <section>
              <p aria-live="assertive">{errMsg}</p>
            </section>
            {success ? (
              <></>
            ) : (
              <>
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  placeholder="Informe seu e-mail"
                  sx={{ m: 1, width: "80%" }}
                  margin="normal"
                  size="small"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                />
                <FormControl
                  sx={{ m: 1, width: "80%" }}
                  variant="outlined"
                  size="small"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                >
                  <InputLabel
                    htmlFor="outlined-adornment-password"
                    sx={{ marginbottom: "2px" }}
                  >
                    Senha
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Senha"
                    placeholder="Informe sua senha"
                  />
                </FormControl>
                <Button variant="outlined" size="large" sx={{ m: 2 }} onClick={handleSubmit}>
                  Entrar
                </Button>
                </>
            )}
          </div>
        </div>
      ) : (
        <Home />
      )}
    </Container>
  );
}

export default Login;
