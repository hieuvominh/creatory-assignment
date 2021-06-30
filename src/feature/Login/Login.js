import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import Cookies from "js-cookie";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(undefined);

  const classes = useStyles();

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("/auth", {
        username: userName,
        password: password,
      })
      .then(function (response) {
        Cookies.set("isAuthenticated", true);
        props.history.push("/");
      })
      .catch(function (error) {
        setError(true);
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img
          alt="avatar"
          src="data:image/png;base64,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"
        />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            value={userName}
            onInput={(e) => setUserName(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={error}
            label="User Name"
            autoComplete="username"
            autoFocus
          />
          <TextField
            value={password}
            onInput={(e) => setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            error={error}
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            onClick={() => {
              console.log(userName);
            }}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
      <Snackbar open={error} autoHideDuration={6000}>
        <Alert severity="error">invalid username or password!</Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
