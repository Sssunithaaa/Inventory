import React, { useRef } from "react";
import { getTransactionById } from "../../services/transactions";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import html2pdf from "html2pdf.js";

const ReceiptLayout = ({ transaction_id, setAddReceipt }) => {
  const contentRef = useRef(null);
  const {
    data: transaction,
    isLoading: tLoading,
    isFetching: tFetching,
    refetch: tfetch,
  } = useQuery({
    queryFn: () => getTransactionById({ transaction_id }),
    queryKey: ["transactionsid"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
      window.alert(error.message);
    },
  });

  // Check if transaction is undefined before destructure
  if (!transaction) {
    return <div>Loading...</div>; // You can customize the loading state
  }

  const receiptText = generateTransactionReceipt(transaction);

  function generateTransactionReceipt(transaction) {
    const {
      transaction_id,
      transaction_date,
      product_name,
      quantity_change,
      price,
      total_price,
      client_name,
      client_email,
    } = transaction;

    const dateOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };

    const formattedDate = new Date(transaction_date).toLocaleDateString(
      undefined,
      dateOptions
    );

    const receipt = `
----------------------------------------
          Transaction Receipt
----------------------------------------

Transaction ID: ${transaction_id}
Date and Time:   ${formattedDate}

Product:          ${product_name}
Quantity:         ${quantity_change}
Price per Unit:   $${price}

Total:            $${total_price}

Amount Paid:      $${total_price}
Change:           $${total_price - total_price}

Customer:         ${client_name}
Contact:          ${client_email}

    Thank you for shopping with us!
----------------------------------------
`;

    return receipt;
  }

  const handleDownload = () => {
    const content = contentRef.current;

    if (content) {
      html2pdf(content, {
        margin: [10, 50],
        filename: "transaction_receipt.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 4 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex justify-center w-full overflow-auto bg-black/50">
      <div className="mx-auto w-full flex flex-col max-w-[390px] px-3 py-2 text-center font-sans rounded-md font-bold text-black bg-white my-auto">
        <pre ref={contentRef} className="text-left">
          {receiptText}
        </pre>

        <button
          onClick={handleDownload}
          className="mt-4 w-full bg-blue-500 text-white mx-auto py-1 rounded"
        >
          Download Receipt as PDF
        </button>
        <button
          onClick={() => setAddReceipt(false)}
          className="mt-4 w-full h-auto bg-blue-500 text-white mx-auto py-1 rounded"
        >
          CLOSE
        </button>
      </div>
    </div>
  );
};

export default ReceiptLayout;
