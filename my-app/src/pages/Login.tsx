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
import React from "react";
import "../styles/Login.css";

function Login() {
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <Container maxWidth="sm">
      <div className="container-login">
        <div className="box-login">
          <h1 className="titulo-login">Casa Aposta</h1>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            placeholder="Informe seu e-mail"
            sx={{ m: 1, width: "80%" }}
            margin="normal"
            size="small"
          />
          <FormControl sx={{ m: 1, width: "80%" }} variant="outlined" size="small">
            <InputLabel htmlFor="outlined-adornment-password" sx={{marginbottom: '2px'}}>
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
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Senha"
              placeholder="Informe sua senha"
            />
          </FormControl>
          <Button variant="outlined" size="large" sx={{m: 2}}>Entrar</Button>
        </div>
      </div>
    </Container>
  );
}

export default Login;
