import * as React from "react";
import "./AddTransaction.css";

export default function AddTransaction(props) {
  //console.log("form", props.form);
  const handleOnFormFieldChange = (event) => {
    // console.log(event);
    props.setForm({
      category: event.target.name,
      description: event.target.value,
      amount: 0,
    });
  };

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>

      <AddTransactionForm
        handleOnFormFieldChange={handleOnFormFieldChange}
        handleOnSubmit={props.handleOnSubmit}
        form={props.form}
        isCreating={props.isCreating}
      />
    </div>
  );
}

export function AddTransactionForm(props) {
  console.log("addform", props.form);
  return (
    <div className="form">
      <div className="fields">
        <div className="field">
          <label>Description</label>
          <input
            type="text"
            value={props.form.description}
            onChange={props.handleOnFormFieldChange}
          />
        </div>
        <div className="field">
          <label>Category</label>
          <input
            type="text"
            value={props.form.category}
            onChange={props.handleOnFormFieldChange}
          />
        </div>
        <div className="field half-flex">
          <label>Amount (cents)</label>
          <input
            type="number"
            value={props.form.amount}
            onChange={props.handleOnFormFieldChange}
          />
        </div>

        <button className="btn add-transaction" type="submit">
          Add
        </button>
      </div>
    </div>
  );
}
