import { BackButton, PageLayout, YourAccount } from "@cosmicdapp/design";
import { Coin } from "@cosmjs/launchpad";
import { useSdk } from "@cosmicdapp/logic";
import { Contract } from "@cosmjs/cosmwasm";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typography, Button } from "antd";
import { config, contractAddress } from "../../../config";
import { pathActions } from "../../paths";
import { BackActionsStack, MainStack, ActionsStack } from "../../common-style";
import backArrowIcon from "../../CommonAssets/backArrow.svg";

const { Title, Text } = Typography;

export function VerifyClient(): JSX.Element {
    const { getClient } = useSdk();

    const [clientAddress, setClientAddress] = useState("");
    const [status, setStatus] = useState("In progress");

    function updateClientAddress(event: React.ChangeEvent<HTMLInputElement>) {
        const clientAddress = event.target.value;
        setClientAddress(clientAddress);
      }

    async function performAction() {
        if (!clientAddress) return;
    
        try {
          const result = await getClient().execute(contractAddress, { VerifyClient: { clientAddress } }, "Verifying user");
          setStatus("Client verified");
        } catch (error) {
          setStatus(Error(error).message);
        }
      }


  return (
    (
      <PageLayout>
        <MainStack>
          <BackActionsStack>
            <BackButton icon={backArrowIcon} path={pathActions} />
            <ActionsStack>
                <Title>Client verification</Title>
                <div>
                    <span>Enter client address: </span>
                    <input value={clientAddress} onChange={updateClientAddress} />
                </div>
                <button onClick={performAction} disabled={!clientAddress}>
                    Verify
                </button>
                <div>Status: {status}</div>
            </ActionsStack>
          </BackActionsStack>
        </MainStack>
      </PageLayout>
    )
  );
}