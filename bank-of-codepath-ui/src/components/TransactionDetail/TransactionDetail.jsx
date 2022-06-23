import * as React from "react";
import { formatAmount, formatDate } from "../../utils/format";
import "./TransactionDetail.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function TransactionDetail() {
  const [hasFetched, setHasFetched] = useState(false);
  const [transaction, setTransaction] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const transactionId = useParams()?.transactionId;

  useEffect(() => {
    const fetchTransactionById = async () => {
      setIsLoading(true);
      setHasFetched(false);

      try {
        const response = await axios.get(
          "http://localhost:3001/bank/transactions/" + transactionId
        );
        setTransaction(response.data.transaction);
      } catch (error) {
        setError(error);
      }

      setIsLoading(false);
      setHasFetched(true);
    };
    fetchTransactionById();
  }, [transactionId]);

  return (
    <div className="transaction-detail">
      <TransactionCard
        transaction={transaction}
        transactionId={transactionId}
        isLoading={isLoading}
        hasFetched={hasFetched}
      />
    </div>
  );
}

export function TransactionCard({
  transaction = {},
  transactionId = null,
  isLoading = false,
  hasFetched = false,
}) {
  if (transaction.id == undefined && !isLoading && hasFetched) {
    return (
      <div className="transaction-card card">
        <div className="card-header">
          <h3>{transactionId}</h3>
          <h1>Not Found</h1>
        </div>
      </div>
    );
  } else {
    return (
      <div className="transaction-card card">
        <div className="card-header">
          <h3>Transaction #{transactionId}</h3>
          <p className="category">{transaction.category}</p>
        </div>

        <div className="card-content">
          <p className="description">{transaction.description}</p>
        </div>

        <div className="card-footer">
          <p className={`amount ${transaction.amount < 0 ? "minus" : ""}`}>
            {formatAmount(transaction.amount)}
          </p>
          <p className="date">{formatDate(transaction.postedAt)}</p>
        </div>
      </div>
    );
  }
}
