import React from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { contractData } from "@/contracts/data";

export default function SingleCard(props) {
  const { config } = usePrepareContractWrite({
    address: contractData.address,
    abi: contractData.abi,
    functionName: "deleteTodoItem",
    args: [props.id],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <>
      <div className="flex flex-row justify-between items-center w-full border-2 border-p-dark rounded-full bg-white m-2">
        <div className="ml-5">{props.data}</div>
        <button
          className="bg-p-medium p-4 m-4 rounded-full flex-end font-bold border-b-4 border-r-4 border-red-500 cursor-pointer"
          disabled={!write}
          onClick={() => write?.()}
        >
          Delete
        </button>
      </div>
    </>
  );
}
