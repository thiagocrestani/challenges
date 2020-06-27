import React from "react";
import { render, waitForElement } from "@testing-library/react";
import Battles from "../../pages/Battles";

describe("Tests for Battles", () => {
  it("Test components Battles page", async () => {
    const { getByTestId } = render(<Battles />);
    const tableHeroes = await waitForElement(() => getByTestId("battles-page-head-table"));
    expect(tableHeroes.innerHTML).toEqual("<tr><th></th><th>Herói</th><th>Monstro</th><th>Localização</th><th></th></tr>");  
  });
});
