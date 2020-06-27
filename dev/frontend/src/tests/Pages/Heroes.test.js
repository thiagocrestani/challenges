import React from "react";
import { render, waitForElement } from "@testing-library/react";
import Heroes from "../../pages/Heroes";

describe("Tests for Heroes", () => {
  it("Test components Heroes page", async () => {
    const { getByTestId } = render(<Heroes />);
    await waitForElement(() => getByTestId("send-button"));
    const tableHeroes = await waitForElement(() => getByTestId("table-heroes-head"));
    expect(tableHeroes.innerHTML).toEqual("<tr><th></th><th>Nome</th><th>Classe</th><th></th><th></th></tr>");  
  });
});
