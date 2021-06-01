import { GlobalStyle } from "@cosmicdapp/design";
import { AccountProvider, ErrorProvider, ProtectedSwitch, SdkProvider } from "@cosmicdapp/logic";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { config } from "../config";
import { pathLogin, pathOperationResult, pathActions, pathRegisterClient, pathAddCar, pathRentCar, pathStartRent, pathFinishRent, pathVerifyClient, pathViewRent } from "./paths";
import { Login } from "./routes/Login";
import { Actions } from "./routes/Actions";
import { RegisterClient } from "./routes/RegisterClient";
import { OperationResult } from "./routes/OperationResult";
import { AddCar } from "./routes/AddCar";
import { RentCar } from "./routes/RentCar";
import { StartRent } from "./routes/StartRent";
import { FinishRent } from "./routes/FinishRent";
import { VerifyClient } from "./routes/VerifyClient";
import { ViewRent } from "./routes/ViewRent";

export function App(): JSX.Element {
  return (
    <ErrorProvider>
      <SdkProvider config={config}>
        <AccountProvider>
          <GlobalStyle />
          <Router basename={process.env.PUBLIC_URL}>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path={pathLogin} component={Login} />
              <ProtectedSwitch authPath={pathLogin}>
                <Route exact path={pathActions} component={Actions} />
                <Route exact path={pathRegisterClient} component={RegisterClient} />
                <Route exact path={pathAddCar} component={AddCar} />
                <Route exact path={pathRentCar} component={RentCar} />
                <Route exact path={pathStartRent} component={StartRent} />
                <Route exact path={pathFinishRent} component={FinishRent} />
                <Route exact path={pathVerifyClient} component={VerifyClient} />
                <Route exact path={pathViewRent} component={ViewRent} />
                <Route exact path={pathOperationResult} component={OperationResult} />
              </ProtectedSwitch>
            </Switch>
          </Router>
        </AccountProvider>
      </SdkProvider>
    </ErrorProvider>
  );
}