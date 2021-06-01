import { BackButton, PageLayout, YourAccount } from "@cosmicdapp/design";
import { Coin } from "@cosmjs/launchpad";
import { useSdk } from "@cosmicdapp/logic";
import { logs } from "@cosmjs/cosmwasm";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typography, Button } from "antd";
import { config, contractAddress } from "../../../config";
import { pathActions } from "../../paths";
import { BackActionsStack, MainStack, ActionsStack } from "../../common-style";
import backArrowIcon from "../../CommonAssets/backArrow.svg";

const { Title, Text } = Typography;

export function RentCar(): JSX.Element {
    const { getClient } = useSdk();

    const [carId, setCarId] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [status, setStatus] = useState("In progress");

    function updateCarId(event: React.ChangeEvent<HTMLInputElement>) {
        const carId = event.target.value;
        setCarId(carId);
      }
    
      function updateStartDate(event: React.ChangeEvent<HTMLInputElement>) {
        const startDate = event.target.value;
        setStartDate(startDate);
      }
    
      function updateEndDate(event: React.ChangeEvent<HTMLInputElement>) {
        const endDate = event.target.value;
        setEndDate(endDate);
      }

    async function performAction() {
        if (!carId || !startDate || !endDate) return;
    
        try {
          const result = await getClient().execute(contractAddress, { RegisterClient: { carId, startDate, endDate } }, "Renting car");
          const rent_id = logs.findAttribute(result.logs, "message", "rent_id");
          setStatus("Rent succesfull. Rent id: " + rent_id);
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
                <Title>Rent car</Title>
                <div>
                    <span>Enter car id: </span>
                    <input value={carId} onChange={updateCarId} />
                </div>
                <div>
                    <span>Enter start date: </span>
                    <input value={startDate} onChange={updateStartDate} />
                </div>
                <div>
                    <span>Enter end date: </span>
                    <input value={endDate} onChange={updateEndDate} />
                </div>
                <button onClick={performAction} disabled={!carId || !startDate || !endDate}>
                    Rent
                </button>
                <div>Status: {status}</div>
            </ActionsStack>
          </BackActionsStack>
        </MainStack>
      </PageLayout>
    )
  );
}