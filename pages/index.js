import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "../styles/Home.module.css";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { contractData } from "@/contracts/data";
import { useState } from "react";
import SingleCard from "@/components/SingleCard";

export default function Home() {
  const [task, setTask] = useState("");

  const { config } = usePrepareContractWrite({
    address: contractData.address,
    abi: contractData.abi,
    functionName: "addTodoItem",
    args: [task],
  });
  const {
    data,
    isLoading,
    isSuccess,
    write: write1,
  } = useContractWrite(config);

  const { data: data2, isSuccess2 } = useContractRead({
    address: contractData.address,
    abi: contractData.abi,
    functionName: "getAllTodoItems",
    watch: true,
  });

  function handleChange() {
    write1?.();
    setTask("");
  }

  console.log(data2);
  return (
    <>
      <div className=" flex flex-col items-center justify-around bg-p-light w-full h-screen px-40">
        <ConnectButton />

        <p className="font-bold text-p-extra">Input Todo</p>
        <input
          type="text"
          className=" border border-p-extra rounded w-full py-2 px-3 mb-3 text-blue-700"
          placeholder="Add Todo"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <div className="">
          <button
            className="font-bold bg-p-medium p-4 rounded-full border-b-4 border-r-4 border-p-dark cursor-pointer"
            disabled={!write1}
            onClick={handleChange}
          >
            Add Todo
          </button>
          {isLoading && <div>Check Wallet</div>}
          {isSuccess && <div>added todo</div>}
        </div>

        {data2?.map((item, index) => (
          <SingleCard key={index} id={index} data={item} />
        ))}
      </div>
    </>
  );
}
