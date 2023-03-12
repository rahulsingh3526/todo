export const contractData = {
  address: "0xCE22589e08aC266d34B9d4D6Df7522C8f6FcDB1A",
  abi: [
    {
      inputs: [
        {
          internalType: "string",
          name: "newItem",
          type: "string",
        },
      ],
      name: "addTodoItem",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "indexToDelete",
          type: "uint256",
        },
      ],
      name: "deleteTodoItem",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getAllTodoItems",
      outputs: [
        {
          internalType: "string[]",
          name: "",
          type: "string[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
};
