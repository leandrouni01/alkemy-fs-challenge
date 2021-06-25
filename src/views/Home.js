import React from 'react';
import { connect } from 'react-redux';
import { fetchOperations } from 'actions';
import AccountingBalance from 'components/home/AccountingBalance';
import OperationsTable from 'components/tables/OperationsTable';

class Home extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchOperations());
  } 
  
  render() {
    const {isAuth, operations} = this.props;

    if(!isAuth) {
      return (
      <div className="row">
        <div className="col-12">
          <h1>Welcome to the Personal Budget App please login to start using the app</h1>
        </div>
      </div>
      )
    }

    if (operations.opStatus === "FETCHING") {
      return (
        <div className="row">
          <div className="col-12">
            <h1>Loading...</h1>
          </div>
        </div>
      )
    }

    if (operations.opStatus === "ERROR") {
      return (
        <div className="row">
          <div className="col-12">
            {
              operations.errors.map ? 
              operations.errors.map(err => <div className="alert alert-danger" key={err.detail}>{err.detail}</div>) :
              <div className="alert alert-danger">{operations.errors}</div>
            }
          </div>
        </div>
      )
    }

    return (
      <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-md-8 col-sm-10  mx-auto h2">
                <AccountingBalance className="mx-auto" operations={operations.operations}/>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <OperationsTable operations={operations.operations.slice(-10)} manage={false} />
              </div>
            </div>
          </div>
        </div>
    )
  }
}

const mapStateToProps = ({ auth: { isAuth }, operations }) => {
  return {
    isAuth,
    operations
  }
}

export default connect(mapStateToProps)(Home);