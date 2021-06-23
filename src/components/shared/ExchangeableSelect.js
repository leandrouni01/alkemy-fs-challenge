import React from 'react';

const ExchangeableSelect = ({selectOptions, id, type, exchange, onExchange, onReturn, name, register, registerOptions}) => {

  if(exchange) {
    return (
      <>
      <input className="form-control" type={type} id={id} {...register(name, registerOptions)} /> 
      <button type="button" onClick={onReturn}>Return</button>
      </>
    )
  }

  return (
    <select
    id={id}
    {...register(name, registerOptions)}
    onChange={onExchange}
    className="form-control"
    defaultValue="">
      <option  value="" disabled>Select a {name}</option>
      {
        selectOptions.map( opt => <option key={opt.value} value={opt.value}>{opt.description}</option> )
      }
      <option key="other" value="other">Other</option>
    </select>
  )
}

export default ExchangeableSelect;