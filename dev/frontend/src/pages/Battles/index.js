import React, { useEffect, useState } from "react";
import "./styles.css";
import "../../static/css/global.css";
import api from "../../services/api";
import { useHistory } from "react-router-dom";
import Header from "../../components/header";
import ListBattles from "../../components/listBattles";

async function getBattles() {
  try {
    const response = await api.get("/getAllBattles", {
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

function Battles(props) {
  const history = useHistory();
  const [listBattles, setListBattles] = useState([]);

  useEffect(() => {
    getBattles().then((value) => {
      if (value === 401) history.push("/login");
      else setListBattles(value);
    });
  }, [history]);

  async function finish(id) {
    try {
      await api.post(
        "/finishBattle",
        { _id: id },
        {
          headers: {
            authorization: localStorage.getItem("iHeroToken"),
          },
        }
      );
      getBattles().then((value) => {
        if (value === 401) history.push("/login");
        else setListBattles(value);
      });
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
        <div className="table-center-title table-battles-title">Batalhas</div>

        <div className="table-center">
          <table cellSpacing="0">
            <thead data-testid="battles-page-head-table">
              <tr>
                <th></th>
                <th>Herói</th>

                <th>Monstro</th>

                <th>Localização</th>

                <th></th>
              </tr>
            </thead>
            <ListBattles list={listBattles} finish={finish} />
          </table>
        </div>
      </div>
    </>
  );
}

export default Battles;
