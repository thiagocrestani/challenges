import React, { useState } from "react";
import "../../static/css/global.css";
import api from "./../../services/api";
import "./styles.css";
import { useHistory } from "react-router-dom";
import heroIcon from "../../assets/hero.svg";

function Login(props) {
  const history = useHistory();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await api.post("/authenticateUser", {
      login,
      password,
    });
    localStorage.setItem("iHeroToken", `Bearer ${response.data.token}`);
    localStorage.setItem("iHeroUser", response.data.user.name);
    history.push(`/`);
  }

  return (
    <>
      <div className="container">
        <div className="line-form-avatar hero-avatar-login">
          <div className="hero-avatar ">
            <img src={heroIcon} alt="Hero" />
          </div>
          Login
        </div>
        <div className="form-center">
          <form autoComplete="off">
            <div className="line-form">
              <div className="label-input">Nome</div>
              <input
                type="text"
                id="login"
                name="login"
                data-testid="login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </div>

            <div className="line-form">
              <div className="label-input">Senha</div>
              <input
                type="password"
                id="password"
                name="password"
                data-testid="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="line-form">
              <button
                type="submit"
                className="send"
                onClick={handleSubmit}
                data-testid="login-button"
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
