/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";

import { useState } from "react";
import bookshelf from "./assets/bookshelf.svg";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import "bootstrap/dist/css/bootstrap-reboot.css";
import { Button, Input, FormGroup } from "./components/lib";

function LoginForm({ onSubmit, buttonText }) {
  function handleSubmit(event) {
    event.preventDefault();
    const [username, password] = event.target.elements;
    onSubmit({
      username: username.value,
      password: password.value,
    });
  }

  return (
    <form
      // eslint-disable-next-line react/no-unknown-property
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        "> div": {
          margin: "10px auto",
          width: "100%",
          maxWidth: "300px",
        },
      }}
      onSubmit={handleSubmit}
    >
      <FormGroup>
        <label htmlFor="username">Username</label>
        <Input id="username" type="text" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" />
      </FormGroup>
      <div>
        <Button type="submit">{buttonText}</Button>
      </div>
    </form>
  );
}
function App() {
  const [openModal, setOpenModal] = useState("none");

  function login(formData) {
    console.log("login", formData);
  }

  function register(formData) {
    console.log("Register", formData);
  }

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <img src={bookshelf} alt="bookshelf" width="80" height="80" />
      <h3 className="text-3xl bg-slate-500 font-bold underline">
        You are my God
      </h3>
      <h1>Bookshelf</h1>
      <div
        css={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gridGap: "0.75rem",
        }}
      >
        <Button
          variant="primary"
          onClick={() => {
            setOpenModal("login");
          }}
        >
          Login
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            setOpenModal("register");
          }}
        >
          Register
        </Button>
      </div>

      <Dialog aria-label="Login form" isOpen={openModal === "login"}>
        <Button
          onClick={() => {
            setOpenModal("none");
          }}
        >
          close
        </Button>
        <h3>Login</h3>

        <LoginForm onSubmit={login} buttonText="login" />
      </Dialog>

      <Dialog aria-label="Registration form" isOpen={openModal === "register"}>
        <Button
          onClick={() => {
            setOpenModal("none");
          }}
        >
          close
        </Button>
        <h3>Register</h3>
        <LoginForm onSubmit={register} buttonText="register" />
      </Dialog>
    </div>
  );
}

export default App;
