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

export function AddCar(): JSX.Element {
    const { getClient } = useSdk();

    const [name, setName] = useState("");
    const [carAddress, setCarAddress] = useState("");
    const [rent, setRent] = useState("");
    const [deposit, setDeposit] = useState("");
    const [status, setStatus] = useState("In progress");

    function updateName(event: React.ChangeEvent<HTMLInputElement>) {
        const name = event.target.value;
        setName(name);
      }
      function updateCarAddress(event: React.ChangeEvent<HTMLInputElement>) {
        const carAddress = event.target.value;
        setCarAddress(carAddress);
      }
      function updateRent(event: React.ChangeEvent<HTMLInputElement>) {
        const rent = event.target.value;
        setRent(rent);
      }
      function updateDeposit(event: React.ChangeEvent<HTMLInputElement>) {
        const deposit = event.target.value;
        setDeposit(deposit);
      }

    async function performAction() {
        if (!name || !carAddress || !rent || !deposit) return;
    
        try {
          const result = await getClient().execute(contractAddress, { RegisterCar: { carAddress, name, rent, deposit } }, "Registering car");
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
                <Title>Register car</Title>
                <div>
                    <span>Enter car name: </span>
                    <input value={name} onChange={updateName} />
                </div>
                <div>
                    <span>Enter car address: </span>
                    <input value={carAddress} onChange={updateCarAddress} />
                </div>
                <div>
                    <span>Enter rent price: </span>
                    <input value={rent} onChange={updateRent} />
                </div>
                <div>
                    <span>Enter deposit price: </span>
                    <input value={deposit} onChange={updateDeposit} />
                </div>
                <button onClick={performAction} disabled={!name || !carAddress || !rent || !deposit}>
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