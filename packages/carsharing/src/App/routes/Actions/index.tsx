import { BackButton, PageLayout, YourAccount } from "@cosmicdapp/design";
import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button } from "antd";
import { config } from "../../../config";
import { BackActionsStack, MainStack, ActionsStack } from "../../common-style";
import backArrowIcon from "../../CommonAssets/backArrow.svg";
import { pathLogin, pathHome, pathRegisterClient, pathAddCar, pathRentCar, pathStartRent, pathFinishRent, pathVerifyClient, pathViewRent } from "../../paths";

const { Title, Text } = Typography;

export function Actions(): JSX.Element {

  return (
    (
      <PageLayout>
        <MainStack>
          <BackActionsStack>
            <BackButton icon={backArrowIcon} path={pathLogin} />
            <ActionsStack>
              <Title>Actions</Title>
              <Link to={pathRegisterClient}>
                <Button type="primary">Register as client</Button>
              </Link>
              <Link to={pathRentCar}>
                <Button type="primary">Rent car [<Text type="warning">Verified client</Text>]</Button>
              </Link>
              <Link to={pathAddCar}>
                <Button type="primary">Add car [<Text type="warning">Manager</Text>]</Button>
              </Link>
              <Link to={pathVerifyClient}>
                <Button type="primary">Verify client [<Text type="warning">KYC</Text>]</Button>
              </Link>
              <Link to={pathStartRent}>
                <Button type="primary">Start rent [<Text type="warning">Car</Text>]</Button>
              </Link>
              <Link to={pathFinishRent}>
                <Button type="primary">Finish rent [<Text type="warning">Car</Text>]</Button>
              </Link>
              <Link to={pathViewRent}>
                <Button type="primary">View rent</Button>
              </Link>
            </ActionsStack>
          </BackActionsStack>
          <YourAccount tag="footer" />
        </MainStack>
      </PageLayout>
    )
  );
}