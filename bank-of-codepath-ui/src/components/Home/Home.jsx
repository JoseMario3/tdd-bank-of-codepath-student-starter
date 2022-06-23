import * as React from "react";
import AddTransaction from "../AddTransaction/AddTransaction";
import BankActivity from "../BankActivity/BankActivity";
import "./Home.css";
import { useEffect } from "react";
import axios from "axios";

export default function Home(props) {
  const filteredTransactions =
    props.filterInputValue != ""
      ? (props.transactions || []).filter((transaction) =>
          transaction.description
            .toLowerCase()
            .includes(props.filterInputValue.toLowerCase())
        )
      : props.transactions;

  function handleOnSubmitNewTransaction() {
    handleOnCreateTransaction();
  }

  useEffect(() => {
    props.setIsLoading(true);

    const getTransactions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/bank/transactions"
        );
        props.setTransactions(response.data.transactions);
      } catch (error) {
        props.setError(error);
      }
    };
    getTransactions();

    const getTransfers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/bank/transfers"
        );
        props.setTransfers(response.data.transfers);
      } catch (error) {
        props.setError(error);
      }
    };
    getTransfers();
    props.setIsLoading(false);
  }, []);

  const handleOnCreateTransaction = async () => {
    props.setIsCreating(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/bank/transactions",
        { transaction: props.newTransactionForm }
      );

      props.setTransactions((current) => [
        ...current,
        response.data.transaction,
      ]);
    } catch (error) {
      props.setError(error);
      props.setIsCreating(false);
    }

    props.setNewTransactionForm({
      category: "",
      description: "",
      amount: 0,
    });
    props.setIsCreating(false);
  };

  return (
    <div className="home">
      <AddTransaction
        isCreating={props.isCreating}
        setIsCreating={props.setIsCreating}
        setForm={props.setNewTransactionForm}
        handleOnSubmit={handleOnSubmitNewTransaction}
        form={props.newTransactionForm}
      />
      {!props.error ? "" : <h2 className="error">{props.error}</h2>}
      {props.isLoading ? (
        <h1 className="loading-text">Loading...</h1>
      ) : (
        <BankActivity
          transactions={filteredTransactions}
          transfers={props.transfers}
        />
      )}
    </div>
  );
}
