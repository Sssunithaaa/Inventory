import React from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getAllSuppliers } from "../../services/suppliers";
import CreateSupplier from "../components/createSupplier";
import { createPortal } from "react-dom";
const SuppliersLayout = () => {
  const [searchSupplierName, setSearchSupplierName] = useState("");
  const [supplier, setSupplier] = useState(false);
  const [addSuplier, setAddSupplier] = useState(false);
  const submitSearchKeywordHandler = (e) => {
    e.preventDefault();
    console.log(searchSupplierName);
    refetch(); // Pass the searchProductName to the refetch function
  };
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryFn: () => getAllSuppliers({ searchSupplierName }),
    queryKey: ["suppliers"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  const addSupplierHandler = () => {
    setAddSupplier((curState) => {
      return !curState;
    });
  };
  if (supplier) {
    refetch();
    setSupplier(false);
  }
  return (
    <>
      {addSuplier &&
        createPortal(
          <CreateSupplier
            setAddSupplier={setAddSupplier}
            setSupplier={setSupplier}
          />,
          document.getElementById("product")
        )}
      <div className="w-full h-screen">
        <div class="container px-4 mx-auto sm:px-8">
          <div class="py-8">
            <h2 class="text-2xl leading-tight font-bold text-center">
              SUPPLIERS
            </h2>
            <div class="flex flex-row justify-between w-full mb-1">
              <button
                class="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                type="button"
                onClick={addSupplierHandler}
              >
                Add supplier
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
                      value={searchSupplierName}
                      class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="name"
                      onChange={(e) => setSearchSupplierName(e.target.value)}
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
                        Name
                      </th>
                      <th
                        scope="col"
                        class="px-5 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Contact Person
                      </th>
                      <th
                        scope="col"
                        class="px-5 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Phone number
                      </th>
                      <th
                        scope="col"
                        class="px-5 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        class="px-5 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Products supplied
                      </th>
                      <th
                        scope="col"
                        class="px-5 py-3 text-sm text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Total price
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
                          colSpan={5}
                          className="text-center text-white py-10 w-full"
                        >
                          Loading...
                        </td>
                      </tr>
                    ) : (
                      data.map((item) => (
                        <tr className="text-center">
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {item.supplier_name}
                            </p>
                          </td>
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {item.contact_person}
                            </p>
                          </td>
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {item.phone}
                            </p>
                          </td>
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {item.email}
                            </p>
                          </td>
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {item.product_count}
                            </p>
                          </td>
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {item.total_price}
                            </p>
                          </td>

                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <a
                              href="#"
                              class="text-indigo-600 hover:text-indigo-900"
                            >
                              Delete
                            </a>
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

export default SuppliersLayout;
