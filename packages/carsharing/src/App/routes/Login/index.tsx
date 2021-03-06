import { Login as LoginDesign } from "@cosmicdapp/design";
import React from "react";
import { config } from "../../../config";
import { pathActions } from "../../paths";
import cosmWasmLogo from "./assets/cosmWasmLogo.svg";

export function Login(): JSX.Element {
  return (
    <LoginDesign pathAfterLogin={pathActions} appName="Carsharing example" appLogo={cosmWasmLogo} config={config} />
  );
}
