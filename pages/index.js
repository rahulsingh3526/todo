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
  const { isLoading, isSuccess, write } = useContractWrite(config);

  const { data } = useContractRead({
    address: contractData.address,
    abi: contractData.abi,
    functionName: "getAllTodoItems",
    watch: true,
  });

  function handleChange() {
    write?.();
    setTask("");
  }

  console.log(data);
  return (
    <>
      <div className=" flex flex-col items-center justify-around bg-p-light w-full px-40">
        <ConnectButton />

        <p className="font-bold text-p-extra m-5">Input Todo</p>
        <input
          type="text"
          className=" border border-p-extra rounded w-full py-2 px-3 mb-3 text-blue-700 m-5"
          placeholder="Add Todo"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <div className=" m-5">
          <button
            className="font-bold bg-p-medium p-4 rounded-full border-b-4 border-r-4 border-p-dark cursor-pointer"
            disabled={!write}
            onClick={handleChange}
          >
            Add Todo
          </button>
          {isLoading && <div>Check Wallet</div>}
          {isSuccess && <div>Added todo</div>}
        </div>

        {data?.map((item, index) => (
          <SingleCard key={index} id={index} data={item} />
        ))}
      </div>
    </>
  );
}
