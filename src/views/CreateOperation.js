import React from 'react';
import OperationForm from 'components/forms/OperationForm';
import { createOperation } from 'actions';

class CreateOperation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      message: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(reset) {
    return (operationData) => {
      createOperation(operationData)
      .then(_=>{
        reset();
        this.setState({errors: [], message: "Operation created!"})
      })
      .catch((err) => {
        this.setState({errors: err, message: ""});
      })
      
    }
  }

  render() {

    const {errors, message} = this.state;

    return (
      <>
      <div className="row">
        <div className="col-12">
          <h1 className="text-align-center">Create new operation</h1>
        </div>
      </div>
      {
        errors.length > 0 &&
        errors.map(err => <div className="alert alert-danger" key={err.detail}>{err.detail}</div>)
      }
      {
        message !== "" &&
        <div className="alert alert-success">
          {message}
        </div> 
      }
      <div className="row">
        <div className="col-9 mx-auto">
          <OperationForm onSubmit={this.handleSubmit} 
          create={true}/>
        </div>
      </div>
      </>
    )
  }
}

export default CreateOperation;