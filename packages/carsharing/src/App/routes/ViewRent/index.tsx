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

interface RentResponse {
    readonly client: string;
    readonly car: string;
    readonly balance: string;
    readonly usage_start: string;
    readonly usage_end: string;
    readonly actual_start: string;
}

export function ViewRent(): JSX.Element {
    const { getClient } = useSdk();

    const [rentId, setRentId] = useState("");
    const [rentInfo, setRentInfo] = useState("");
    const [status, setStatus] = useState("In progress");

    function updateRentId(event: React.ChangeEvent<HTMLInputElement>) {
        const rentId = event.target.value;
        setRentId(rentId);
      }

    async function performAction() {
        if (!rentId) return;
    
        try {
          const result : RentResponse = await getClient().queryContractSmart(contractAddress, { Rent: { rentId } });
          setStatus("Success");
          setRentInfo("Client: " + result.client + 
                      "\nCar: " + result.car +
                      "\nBalance: " + result.balance +
                      "\nStart: " + result.usage_start + 
                      "\nEnd: " + result.usage_end + 
                      "\nActual start: " + result.actual_start);
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
                <Title>View rent</Title>
                <div>
                    <span>Enter rent id: </span>
                    <input value={rentId} onChange={updateRentId} />
                </div>
                <button onClick={performAction} disabled={!rentId}>
                    Request
                </button>
                <div>Status: {status}</div>
                <div>{rentInfo}</div>
            </ActionsStack>
          </BackActionsStack>
        </MainStack>
      </PageLayout>
    )
  );
}