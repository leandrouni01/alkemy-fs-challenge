import React from 'react';

const AccountingBalance = ({operations}) => {
  const balance = computeBalance(operations);
  return (
    <p className="accounting-balance" >Your account balance is : $<span className={balance > 0 ? "text-success" : "text-danger"}>{balance}</span></p>
  )
}

function computeBalance(operations) {
  return operations.reduce((acc,op)=> {
    return op.type === "in" ? acc + op.amount : acc - op.amount;
  }, 0)
}

export default AccountingBalance;