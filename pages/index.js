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

  // console.log(data2);
  return (
    <>
      <main className={styles.main}>
        <ConnectButton />

        <p className="font-bold">Input Todo</p>
        <input
          type="text"
          className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-200 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Add Todo"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <div>
          <button disabled={!write1} onClick={handleChange}>
            Add todo
          </button>
          {isLoading && <div>Check Wallet</div>}
          {isSuccess && <div>added todo</div>}
        </div>

        {data2.map((item, index) => (
          <SingleCard key={index} id={index} data={item} />
        ))}
      </main>
    </>
  );
}
