import React from "react";
import Login from "./feature/Login/Login";
import List from "./feature/List/List";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path="/login" exact component={Login} />
      <Route exact path="/" component={List} />
    </Router>
  );
};

export default App;
