import React, { useEffect, useState } from 'react';
import { editOperation, fetchOperationById } from 'actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router';
import { verifyOperationOwner } from 'actions';
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
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.dispatch(fetchOperationById(id));
  }

  handleSubmit() {
    return (operationData) => {
      const { id } = this.props.match.params;
      this.props.dispatch(editOperation({...operationData, id}));
    }
  }

  render() {

    const {errors, operation, opStatus} = this.props.operation;
    return (
      <>
      <div className="row">
        <div className="col-12">
          <h1 className="text-align-center">Edit operation</h1>
        </div>
      </div>
      {
        errors.length > 0 &&
        errors.map(err => <div className="alert alert-danger" key={err.detail}>{err.detail}</div>)
      }
      <div className="row">
        <div className="col-9 mx-auto">
        {
          opStatus === "FETCHING" ? <h2>Loading...</h2> :
          <OperationForm onSubmit={this.handleSubmit} 
          create={false}
          defaultValues={operation}/>
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