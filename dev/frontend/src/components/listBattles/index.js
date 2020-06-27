import React from "react";
import "../../static/css/global.css";
import "./styles.css";
import fire from "../../assets/fire.svg";
import trophy from "../../assets/trophy.svg";

function ListBattles({ list, finish }) {
  return (
    <tbody>
      {list.map((item) => (
        <tr key={item._id}>
          <td>
            <div className="status-battle">
              {item.active ? (
                <>
                  <div className="avatar-status">
                    <img src={fire} alt="Lutando" />
                  </div>
                  Lutando
                </>
              ) : (
                <>
                  <div className="avatar-status">
                    <img src={trophy} alt="Lutando" />
                  </div>
                  Vitória
                </>
              )}
            </div>
          </td>
          <td>
            <div className="name-battle">
              {item.heroName}{" "}
              <div className="class-battle class-hero">{item.heroClass}</div>{" "}
            </div>
          </td>
          <td>
            <div className="name-battle">
              {item.monsterName}{" "}
              <div className="class-battle class-monster">
                {item.dangerLevel}
              </div>
            </div>
          </td>
          <td className="location">
            <div className="location-item">lat: {item.location.lat}</div>{" "}
            <div className="location-item">lng: {item.location.lng}</div>
          </td>

          <td className="button-column-large">
            {item.active ? (
              <button
                type="button"
                className="finish-button"
                onClick={() => finish(item._id)}
                data-testid="finish-button"
              >
                Encerrar
              </button>
            ) : (
              <></>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default ListBattles;
