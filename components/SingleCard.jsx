import React from "react";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { contractData } from "@/contracts/data";
import { useState } from "react";

export default function SingleCard(props) {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);

  const { config } = usePrepareContractWrite({
    address: contractData.address,
    abi: contractData.abi,
    functionName: "deleteTodoItem",
    args: [index],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  function handleChange() {
    setIndex(props.id);
    write?.();
    setIndex(0);
  }
  return (
    <>
      <div>
        <div>{props.data}</div>
        <button disabled={!write} onClick={handleChange}>
          delete
        </button>
      </div>
    </>
  );
}
