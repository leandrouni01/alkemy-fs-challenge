import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchOperations, deleteOperation } from 'actions';
import OperationsTable from 'components/tables/OperationsTable';
import ConfirmationModal from 'components/shared/ConfirmationModal';

class ManageOperations extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      deleteId: 0
    }
    this.showConfirmationModal = this.showConfirmationModal.bind(this);
    this.handleConfirmedDelete = this.handleConfirmedDelete.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchOperations());
  }

  showConfirmationModal(id) {
    return () => {
      this.setState({showModal: true, deleteId: id});
    }
  }

  handleConfirmedDelete() {
    this.props.dispatch(deleteOperation(this.state.deleteId))
    this.setState({showModal: false, deleteId: 0});
  }

  handleCancel() {
    this.setState({showModal: false, deleteId: 0});
  }

  render() {
    const { operations } = this.props;
    const { showModal } = this.state;

    return (
      <>
        <div className="row">
          <h1 className="col-md-8 col-sm-6 content-title">Manage Operations</h1>
          <div className="col-md-4 col-sm-6 my-1 text-center">
            <Link to="/operations/create" className="btn btn-lg btn-create">New Operation</Link>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {
              operations.opStatus === "ERROR" && operations.errors.map(err => <div className="alert alert-danger" key={err.detail}>{err.detail}</div>)
            }
            {
              operations.opStatus === "FETCHING" ? <h1>Loading...</h1> :
              <OperationsTable operations={operations.operations} manage={true} onRemove={this.showConfirmationModal}/>
            }
          </div>
        </div>
        <ConfirmationModal 
        open={showModal} 
        message="Are you sure you want to delete this operation" 
        onConfirmation={this.handleConfirmedDelete}
        onClose={this.handleCancel}/>
      </>
    )
  }
}

const mapStateToProps = ({ operations}) => {
  return {
    operations
  }
}

export default connect(mapStateToProps)(ManageOperations);