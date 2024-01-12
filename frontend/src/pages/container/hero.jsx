import React from "react";
import { getNumbers } from "../../services/numbers";
import { useQuery } from "@tanstack/react-query";
const tablename = [
  "transactions",
  "client",
  "products",
  "categories",
  "suppliers",
];
const DataFetcher = ({ id }) => {
  // Using useQuery inside the component
  const { data, isLoading, error } = useQuery({
    queryFn: () => getNumbers({ id }), // Ensure 'id' is passed correctly here
    queryKey: ["data", id], // Match the key with the function parameter
  });

  // Rest of the component...

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  console.log(data);
  return <p>{data[0].total_count}</p>;
};
const Hero = () => {
  return (
    <div className="w-full h-[80vh] mx-auto my-auto">
      <div className="grid grid-cols-2 h-full gap-x-14 gap-y-14 mx-5 my-5 items-center text-center border-2 rounded-lg p-5">
        {tablename.map((id) => (
          <div
            key={id}
            className="flex flex-col mx-5 lg:mx-20 shadow-lg shadow-black"
          >
            <div className=" pb-2 bg-[#454A52] shadow-lg shadow-black">
              <p className="py-3 mx-1 text-lg font-bold uppercase">
                TOTAL {id}:
              </p>
            </div>
            <div className="text-lg bg-[#C2BCBD] shadow-lg shadow-black ">
              <p className="py-3 text-xl font-bold ">
                <DataFetcher id={id} />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
