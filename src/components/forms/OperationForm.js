import React, {useState} from 'react';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import Error from 'components/shared/FormError';
import ExchangeableSelect from 'components/shared/ExchangeableSelect';
import { requiredExchangeableSelect } from 'helpers/validators';
import { capitalize } from 'helpers/functions';


const OperationForm = ({onSubmit, create, defaultValues, categories}) => {
  
  const { handleSubmit, register, formState: { errors }, getValues, reset, setValue } = useForm({defaultValues});
  const [swapCategorySelect, setswapCategorySelect] = useState(false);

  const handleCategorySelectChange = (e) => {
    if(e.target.value === "other") {
      setValue("category", "");
      setswapCategorySelect(true);
    }
  }

  const handleCategorySelectReturn = () => {
    setswapCategorySelect(false);
  }

  return (
    <form className="operation-form" onSubmit={handleSubmit(onSubmit(reset))}>
      <div className="form-group" >
        <label htmlFor="concept">Concept</label>
        <input
          type="text"
          className="form-control"
          id="concept"
          {...register("concept",{ required: "Concept is required" })} />
        <ErrorMessage as={<Error />} name="concept" errors={errors}>
          {message => <p> {message} </p>}
        </ErrorMessage>
      </div>
      {
        create &&
        <div className="form-group" >
          <label htmlFor="type">Type</label>
          <select
            className="form-control"
            id="type"
            {...register("type",{ required: "Type is required" })} >
              <option key="in" value="in">In</option>
              <option key="out" value="out">Out</option>
          </select>
          <ErrorMessage as={<Error />} name="type" errors={errors}>
            {message => <p> {message} </p>}
          </ErrorMessage>
        </div>
      }
      <div className="form-group" >
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          className="form-control"
          id="amount"
          step="0.01"
          min={0.01}
          {...register("amount",{
             required: "Amount is required",
             min: 0.01})} />
        <ErrorMessage as={<Error />} name="amount" errors={errors}>
          {message => <p> {message} </p>}
        </ErrorMessage>
      </div>
      <div className="form-group" >
        <label htmlFor="date">Date</label>
        <input
          type="date"
          className="form-control"
          id="date"
          {...register("date",{ required: "Date is required" })} />
        <ErrorMessage as={<Error />} name="date" errors={errors}>
          {message => <p> {message} </p>}
        </ErrorMessage>
      </div>
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <ExchangeableSelect 
        selectOptions={categories.map(c => ({ value:c.category, description: capitalize(c.category)}))}
        name="category"
        id="category"
        type="text"
        onReturn={handleCategorySelectReturn}
        onExchange={handleCategorySelectChange}
        register={register}
        registerOptions={{validate: {
          req: requiredExchangeableSelect("category", getValues, "Category is required")
        }}}
        exchange={swapCategorySelect}/>
        <ErrorMessage as={<Error />} name="category" errors={errors}>
          {message => <p> {message} </p>}
        </ErrorMessage>
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  )
}

export default OperationForm;
