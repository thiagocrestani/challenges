import React from "react";
import "../../static/css/global.css";
import "./styles.css";
import heroIcon from "../../assets/super-heroi.svg";

function ListHeroes({ list, deleteItem, editItem }) {
  return (
    <tbody>
      {list.map((item) => (
        <tr key={item._id}>
          <td className="button-column">
            <div className="hero-avatar-table">
              <img src={heroIcon} alt="Hero" />
            </div>
          </td>
          <td>{item.name}</td>
          <td>{item.class}</td>
          <td className="button-column">
            <button
              type="button"
              className="send"
              onClick={() => editItem(item._id)}
              data-testid="send-button"
            >
              Editar
            </button>
          </td>
          <td className="button-column">
            <button
              type="button"
              className="send"
              onClick={() => deleteItem(item._id)}
              data-testid="send-button"
            >
              Excluir
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default ListHeroes;
