import { capitalize } from 'helpers/functions';
import React from 'react';

const ExchangeableSelect = ({selectOptions, id, type, exchange, onExchange, onReturn, name, register, registerOptions}) => {

  if(exchange) {
    return (
      <>
      <div className="input-group">
        <input className="form-control" type={type} id={id} {...register(name, registerOptions)} />
        <div className="input-group-append">
          <button type="button" className="btn btn-primary" onClick={onReturn}>
            <i className="bi bi-box-arrow-left"></i>
          </button>
        </div>
      </div>
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
      <option key="other" value="other">New {capitalize(name)}</option>
    </select>
  )
}

export default ExchangeableSelect;