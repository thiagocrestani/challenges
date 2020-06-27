import React from "react";
import "../../static/css/global.css";
import "./styles.css";
import { useHistory } from "react-router-dom";

function Header() {
  const history = useHistory();

  if (localStorage.getItem("iHeroToken") === "") {
    history.push("/login");
  }

  function logout(e) {
    e.preventDefault();
    localStorage.setItem("iHeroToken", "");
    localStorage.setItem("iHeroUser", "");
    history.push("/login");
  }

  return (
    <div className="header">
      <div className="logo">iHero</div>

      <div className="menu">
        <div className="menu-item">
          <a href="/heroes">Heróis</a>
        </div>
        <div className="menu-item">
          <a href="/">Batalhas</a>
        </div>
      </div>

      <div className="user-header">
        {localStorage.getItem("iHeroUser")}{" "}
        <button type="button" className="button-logout" onClick={logout}>
          Sair
        </button>
      </div>
    </div>
  );
}

export default Header;
