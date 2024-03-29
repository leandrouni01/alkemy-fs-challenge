import React from 'react';
import OperationForm from 'components/forms/OperationForm';
import { createOperation, fetchCategories } from 'actions';
import FormNav from 'components/shared/FormNav';


class CreateOperation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      message: "",
      categories: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.refreshCategories();
  }

  refreshCategories() {
    fetchCategories()
    .then((res) => {
      this.setState({categories: res});
    })
  }

  handleSubmit(reset) {
    return (operationData) => {
      createOperation(operationData)
      .then(_=>{
        reset();
        this.refreshCategories();
        this.setState({errors: [], message: "Operation created!"});
      })
      .catch((err) => {
        this.setState({errors: err, message: ""});
      })
      
    }
  }

  render() {

    const {errors, message, categories} = this.state;

    return (
      <>
      <FormNav />
      <div className="row">
        <div className="col-12">
          <h1 className="content-title">Create new operation</h1>
        </div>
      </div>
      {
        errors.length > 0 &&
        errors.map(err => <div className="alert alert-danger col-9 px-0 mx-auto" key={err.detail}>{err.detail}</div>)
      }
      {
        message !== "" &&
        <div className="alert alert-success col-9 px-0 mx-auto">
          {message}
        </div> 
      }
      <div className="row">
        <div className="col-9 mx-auto  px-0">
          <OperationForm onSubmit={this.handleSubmit} 
          create={true}
          categories={categories}/>
        </div>
      </div>
      </>
    )
  }
}

export default CreateOperation;