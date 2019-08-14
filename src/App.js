import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import CoinState from "./context/coins/coinsState";
import Dashboard from "./components/pages/Dashboard";
import Navbar from "./components/layout/Navbar";
import Setting from "./components/pages/Setting";

function App() {
  return (
    <CoinState>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Setting} />
          <Route exact path="/setting" component={Setting} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </CoinState>
  );
}

export default App;
