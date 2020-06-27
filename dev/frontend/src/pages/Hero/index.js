import React, { useState, useEffect } from "react";
import "../../static/css/global.css";
import api from "./../../services/api";
import "./styles.css";
import { useHistory } from "react-router-dom";
import Header from "../../components/header";
import heroIcon from "../../assets/super-heroi.svg";

function Hero(props) {
  const history = useHistory();
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [heroClass, setHeroClass] = useState("S");

  useEffect(() => {
    async function getData(id) {
      try {
        const response = await api.post(
          "/getHero",
          {
            _id: id,
          },
          {
            headers: {
              authorization: localStorage.getItem("iHeroToken"),
            },
          }
        );

        setId(response.data._id);
        setName(response.data.name);
        setHeroClass(response.data.class);
      } catch (e) {
        if (e.message === "Request failed with status code 401") {
          history.push("/login");
        }
      }
    }

    if (props.match.params.id && props.match.params.id !== "new") {
      getData(props.match.params.id);
    }
  }, [history, props.match.params.id]);

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      if (id == null) {
        await api.post(
          "/createNewHero",
          {
            name: name,
            class: heroClass,
          },
          {
            headers: {
              authorization: localStorage.getItem("iHeroToken"),
            },
          }
        );
      } else {
        await api.post(
          "/updateHero",
          {
            _id: id,
            name: name,
            class: heroClass,
          },
          {
            headers: {
              authorization: localStorage.getItem("iHeroToken"),
            },
          }
        );
      }
      history.push("/heroes");
    } catch (e) {
      if (e.message === "Request failed with status code 401") {
        history.push("/login");
      }
    }
  }

  return (
    <>
      <Header />
      <div className="container">
        <div className="form-center">
          <div className="line-form-avatar">
            <div className="hero-avatar">
              <img src={heroIcon} alt="Hero" />
            </div>
          </div>

          <form autoComplete="off">
            <div className="line-form">
              <div className="label-input">Nome</div>
              <input
                type="text"
                id="name"
                name="name"
                data-testid="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="line-form">
              <div className="label-input">Classe</div>
              <select
                name="heroClass"
                id="heroClass"
                data-testid="heroClass"
                onChange={(e) => setHeroClass(e.target.value)}
                value={heroClass}
              >
                <option value="S">Classe S</option>
                <option value="A">Classe A</option>
                <option value="B">Classe B</option>
                <option value="C">Classe C</option>
              </select>
            </div>
            <div className="line-form">
              <button
                type="submit"
                className="send"
                onClick={handleSubmit}
                data-testid="send-button"
              >
                Cadastrar
              </button>

              <button
                type="button"
                className="cancel-button"
                data-testid="cancel-button"
                onClick={() => history.push("/heroes")}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Hero;
