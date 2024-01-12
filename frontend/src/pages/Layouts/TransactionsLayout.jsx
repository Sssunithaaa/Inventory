import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createPortal } from "react-dom";
import {
  getAllTransactions,
  getTransactionById,
} from "../../services/transactions";
import CreateTransaction from "../components/createTransaction";
import { useMutation } from "@tanstack/react-query";
import { deleteTransaction } from "../../services/transactions";
import ReceiptLayout from "./ReceiptLayout";
const TransactionsLayout = () => {
  const [searchTransactionName, setSearchTransactionName] = useState("");
  const [searchSupplierName, setSearchSupplierName] = useState("");
  const [searchProductName, setSearchProductName] = useState("");
  const [transaction, setTransaction] = useState(false);
  const [addTransaction, setAddTransaction] = useState(false);
  const [addReceipt, setAddReceipt] = useState(false);
  const [transaction_id, setTransaction_Id] = useState(0);
  const submitSearchKeywordHandler = (e) => {
    e.preventDefault();
    console.log(searchTransactionName);
    refetch(); // Pass the searchProductName to the refetch function
  };
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryFn: () =>
      getAllTransactions({ searchSupplierName, searchProductName }),
    queryKey: ["transactions"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
      window.alert(error.message);
    },
  });
  const addTransactionHandler = () => {
    setAddTransaction((curState) => {
      return !curState;
    });
  };

  const { mutate, isSuccess } = useMutation({
    mutationFn: ({ transaction_id }) => {
      return deleteTransaction({ transaction_id });
    },
    onSuccess: (data) => {
      toast.success("Transaction deleted successfully");
      refetch();
    },
    onError: (error) => {
      toast.error("Couldn't delete Transaction");
    },
  });

  const deleteTransactionHandler = (transaction_id) => {
    mutate({ transaction_id });
    refetch();
  };
  if (transaction) {
    refetch();
    setTransaction(false);
  }

  const printReceptHandler = async (transaction_id) => {
    setTransaction_Id(transaction_id);
    setAddReceipt(true);
  };

  return (
    <>
      {addTransaction &&
        createPortal(
          <CreateTransaction
            setAddTransaction={setAddTransaction}
            setTransaction={setTransaction}
          />,
          document.getElementById("product")
        )}
      {addReceipt &&
        createPortal(
          <ReceiptLayout
            transaction_id={transaction_id}
            setAddReceipt={setAddReceipt}
            className="w-full"
          />,
          document.getElementById("success")
        )}
      <div className="w-full h-screen">
        <div class="container px-4 mx-auto sm:px-8">
          <div class="py-8">
            <h2 class="text-2xl leading-tight font-bold text-center">
              TRANSACTIONS
            </h2>
            <div class="flex flex-row justify-between w-full mb-1 sm:mb-0">
              <button
                class="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                type="submit"
                onClick={addTransactionHandler}
              >
                Start transaction
              </button>

              <div class="text-end">
                <form
                  class="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0"
                  onSubmit={submitSearchKeywordHandler}
                >
                  <div class=" relative ">
                    <input
                      type="text"
                      id='"form-subscribe-Filter'
                      class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Supplier Name"
                      value={searchSupplierName}
                      onChange={(e) => setSearchSupplierName(e.target.value)}
                    />
                  </div>
                  <button
                    class="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                    type="submit"
                  >
                    Filter
                  </button>
                  <div class=" relative ">
                    <input
                      type="text"
                      id='"form-subscribe-Filter'
                      class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Product name"
                      value={searchProductName}
                      onChange={(e) => setSearchProductName(e.target.value)}
                    />
                  </div>
                  <button
                    class="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                    type="submit"
                  >
                    Filter
                  </button>
                </form>
              </div>
            </div>
            <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
              <div class="inline-block min-w-full overflow-hidden rounded-lg shadow">
                <table class="min-w-full leading-normal font-semibold">
                  <thead className="font-semibold">
                    <tr className="font-semibold">
                      <th
                        scope="col"
                        class="px-5 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Transaction ID
                      </th>
                      <th
                        scope="col"
                        class="px-5 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Product ID
                      </th>
                      <th
                        scope="col"
                        class="px-5 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Product Name
                      </th>
                      <th
                        scope="col"
                        class="px-5 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Supplier ID
                      </th>
                      <th
                        scope="col"
                        class="px-5 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Supplier Name
                      </th>
                      <th
                        scope="col"
                        class="px-5 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Client ID
                      </th>
                      <th
                        scope="col"
                        class="px-5 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Client Name
                      </th>
                      <th
                        scope="col"
                        class="px-5 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Quantity Change
                      </th>
                      <th
                        scope="col"
                        class="px-5 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Transaction Type
                      </th>
                      <th
                        scope="col"
                        class="px-5 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Transaction Date
                      </th>
                      <th
                        scope="col"
                        class="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading || isFetching ? (
                      <tr>
                        <td
                          colSpan={10}
                          className="text-center text-black py-10 w-full"
                        >
                          Loading...
                        </td>
                      </tr>
                    ) : (
                      data?.map((item) => (
                        <tr className="text-center">
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {item.transaction_id}
                            </p>
                          </td>
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {item.product_id}
                            </p>
                          </td>
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {item.product_name}
                            </p>
                          </td>
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {item.supplier_id ? item.supplier_id : "-"}
                            </p>
                          </td>
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {item.supplier_name ? item.supplier_name : "-"}
                            </p>
                          </td>
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {item.client_id ? item.client_id : "-"}
                            </p>
                          </td>
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {item.client_name ? item.client_name : "-"}
                            </p>
                          </td>
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {item.quantity_change}
                            </p>
                          </td>
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {item.transaction_type}
                            </p>
                          </td>
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {new Date(
                                item.transaction_date
                              ).toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                              })}
                            </p>
                          </td>
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <button
                              class="text-indigo-600 hover:text-indigo-900"
                              onClick={() =>
                                printReceptHandler(item.transaction_id)
                              }
                            >
                              Print receipt
                            </button>
                          </td>
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <button
                              class="text-indigo-600 hover:text-indigo-900"
                              onClick={() => {
                                deleteTransactionHandler(item.transaction_id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                <div class="flex flex-col items-center px-5 py-5 bg-white xs:flex-row xs:justify-between">
                  <div class="flex items-center">
                    <button
                      type="button"
                      class="w-full p-4 text-base text-gray-600 bg-white border rounded-l-xl hover:bg-gray-100"
                    >
                      <svg
                        width="9"
                        fill="currentColor"
                        height="8"
                        class=""
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
                      </svg>
                    </button>
                    <button
                      type="button"
                      class="w-full px-4 py-2 text-base text-indigo-500 bg-white border-t border-b hover:bg-gray-100 "
                    >
                      1
                    </button>
                    <button
                      type="button"
                      class="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100"
                    >
                      2
                    </button>
                    <button
                      type="button"
                      class="w-full px-4 py-2 text-base text-gray-600 bg-white border-t border-b hover:bg-gray-100"
                    >
                      3
                    </button>
                    <button
                      type="button"
                      class="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100"
                    >
                      4
                    </button>
                    <button
                      type="button"
                      class="w-full p-4 text-base text-gray-600 bg-white border-t border-b border-r rounded-r-xl hover:bg-gray-100"
                    >
                      <svg
                        width="9"
                        fill="currentColor"
                        height="8"
                        class=""
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionsLayout;
