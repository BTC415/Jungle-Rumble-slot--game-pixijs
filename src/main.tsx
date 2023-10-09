import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GamePIXI from "./components/game_pixi";
import BetHistory from "./components/bet_history";
import Detail from "./components/detail";

const rootElement = document.getElementById("root") || new HTMLDivElement()
ReactDOM.createRoot(rootElement).render(
  <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<GamePIXI />} />
        <Route path="show-history" element={<BetHistory />} />
        <Route path="detail/:id" element={<Detail />} />
        {/* <Route path="*" element={<NoPage />} /> */}
      </Route>
    </Routes>
  </BrowserRouter>
);
