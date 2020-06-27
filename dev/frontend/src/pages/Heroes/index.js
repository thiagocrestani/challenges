import React, { useEffect, useState } from "react";
import "./styles.css";
import "../../static/css/global.css";
import api from "./../../services/api";
import { useHistory } from "react-router-dom";
import Header from "../../components/header/";
import ListHeroes from "../../components/listHeroes";

async function getHeroes() {
  try {
    const response = await api.get("/getAllHeroes", {
      headers: {
        authorization: localStorage.getItem("iHeroToken"),
      },
    });
    return response.data;
  } catch (e) {
    if (e.message === "Request failed with status code 401") {
      return 401;
    }
  }
}

function Heroes(props) {
  const history = useHistory();
  const [listHeroes, setListHeroes] = useState([]);

  useEffect(() => {
    getHeroes().then((value) => {
      if (value === 401) history.push("/login");
      else setListHeroes(value);
    });
  }, [history]);

  async function deleteItem(id) {
    try {
      await api.post(
        "/deleteHero",
        {
          _id: id,
        },
        {
          headers: {
            authorization: localStorage.getItem("iHeroToken"),
          },
        }
      );
      getHeroes().then((value) => {
        if (value === 401) history.push("/login");
        else setListHeroes(value);
      });
    } catch (e) {
      if (e.message === "Request failed with status code 401") {
        history.push("/login");
      }
    }
  }

  async function editItem(id) {
    history.push(`/hero/${id}`);
  }

  return (
    <>
      <Header />
      <div className="container">
        <div className="table-center-title">
          Heróis
          <button
            type="button"
            className="send"
            onClick={() => history.push(`/hero/new`)}
            data-testid="send-button"
          >
            Novo Herói
          </button>
        </div>
        <div className="table-center">
          <table cellSpacing="0">
            <thead data-testid="table-heroes-head">
              <tr>
                <th></th>
                <th>Nome</th>
                <th>Classe</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <ListHeroes
              list={listHeroes}
              deleteItem={deleteItem}
              editItem={editItem}
            />
          </table>
        </div>
      </div>
    </>
  );
}

export default Heroes;
