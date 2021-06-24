import React, { useEffect, useState } from 'react';
import { editOperation, fetchOperationById } from 'actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router';
import { verifyOperationOwner, fetchCategories } from 'actions';
import OperationForm from 'components/forms/OperationForm';


const withUserCheck = Component => props => {
  const [guard, setGuard] = useState({canProceed: false, isChecking: true});
  const { id } = props.match.params;

  useEffect(() => {
    verifyOperationOwner(id)
      .then(_ => setGuard({canProceed: true, isChecking: false}))
      .catch(_ => setGuard({canProceed: false, isChecking: false}))
  }, [id])

  const { canProceed, isChecking } = guard;
  if (!isChecking && canProceed) {
    return <Component {...props}/>
  } else if (!isChecking && !canProceed) {
    return <Redirect to={{pathname: '/'}} />
  } else {
    return <h1>Loading...</h1>
  }
}

class EditOperation extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.refreshCategories = this.refreshCategories.bind(this);
    this.state = {
      message: "",
      categories: []
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.dispatch(fetchOperationById(id));
    this.refreshCategories();
  }

  refreshCategories() {
    fetchCategories()
    .then((res) => {
      this.setState({categories: res});
    })
  }


  handleSubmit() {
    return (operationData) => {
      const { id } = this.props.match.params;
      this.props.dispatch(editOperation({...operationData, id}, this.refreshCategories));
      this.setState({message: "Update Succesfull"});
    }
  }

  render() {

    const {errors, operation, opStatus} = this.props.operation;
    const { categories, message } = this.state;
    return (
      <>
      <div className="row">
        <div className="col-12">
          <h1 className="content-title">Edit operation</h1>
        </div>
      </div>
      {
        errors.length > 0 &&
        errors.map(err => <div className="alert alert-danger" key={err.detail}>{err.detail}</div>)
      }
      <div className="row">
        <div className="col-9 mx-auto px-0">
        {
          opStatus === "FETCHING" ? <h2>Loading...</h2> :
          <>
          {message.length > 0 && errors.length <= 0 && <div className="alert alert-success">{message}</div>}
          <OperationForm onSubmit={this.handleSubmit} 
          create={false}
          defaultValues={operation}
          categories={categories}/>
          </>
        }
        </div>
      </div>
      </>
    )
  }
}

const mapStateToProps = ({operation}) => ({operation});



const EditOperationWithRouterAndUserCheck = withRouter(withUserCheck(EditOperation));

export default connect(mapStateToProps)(EditOperationWithRouterAndUserCheck);