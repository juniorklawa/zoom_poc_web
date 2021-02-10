import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Zoom from "../pages/Zoom";

const Routes = () => {
  return (
    <>
      <Switch>
        <Route path="/zoom/:meetingNumber/:password">
          <Zoom />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </>
  );
};

export default Routes;
