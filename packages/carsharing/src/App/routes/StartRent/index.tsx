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

export function StartRent(): JSX.Element {
    const { getClient } = useSdk();

    const [rentId, setRentId] = useState("");
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("In progress");

    function updateRentId(event: React.ChangeEvent<HTMLInputElement>) {
        const rentId = event.target.value;
        setRentId(rentId);
      }
    
      function updateDate(event: React.ChangeEvent<HTMLInputElement>) {
        const date = event.target.value;
        setDate(date);
      }

    async function performAction() {
        if (!rentId || !date) return;
    
        try {
          const result = await getClient().execute(contractAddress, { StartRent: { rentId, date } }, "Start rent");
          setStatus("Started succesfully");
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
                <Title>Start the existing rent as a car</Title>
                <div>
                    <span>Enter rent id: </span>
                    <input value={rentId} onChange={updateRentId} />
                </div>
                <div>
                    <span>Enter date: </span>
                    <input value={date} onChange={updateDate} />
                </div>
                <button onClick={performAction} disabled={!rentId || !date}>
                    Start rent
                </button>
                <div>Status: {status}</div>
            </ActionsStack>
          </BackActionsStack>
        </MainStack>
      </PageLayout>
    )
  );
}