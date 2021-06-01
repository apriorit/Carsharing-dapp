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

export function RegisterClient(): JSX.Element {
    const { getClient } = useSdk();

    const [name, setName] = useState("");
    const [payment, setPayment] = useState("");
    const [status, setStatus] = useState("In progress");

    function updateName(event: React.ChangeEvent<HTMLInputElement>) {
        const name = event.target.value;
        setName(name);
      }
    
      function updatePayment(event: React.ChangeEvent<HTMLInputElement>) {
        const payment = event.target.value;
        setPayment(payment);
      }

    async function performAction() {
        if (!name || !payment) return;
    
        try {
          const nativeAmountCoin: Coin = { amount: payment, denom: config.stakingToken };
          const result = await getClient().execute(contractAddress, { RegisterClient: { name } }, "Registering user", [nativeAmountCoin]);
          setStatus("Registration succesfull");
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
                <Title>Client registration</Title>
                <div>
                    <span>Enter client name: </span>
                    <input value={name} onChange={updateName} />
                </div>
                <div>
                    <span>Enter deposit coins: </span>
                    <input value={payment} onChange={updatePayment} />
                </div>
                <button onClick={performAction} disabled={!name || !payment}>
                    Register
                </button>
                <div>Status: {status}</div>
            </ActionsStack>
          </BackActionsStack>
        </MainStack>
      </PageLayout>
    )
  );
}