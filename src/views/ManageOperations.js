import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchOperations, deleteOperation } from 'actions';
import OperationsTable from 'components/tables/OperationsTable';
import ConfirmationModal from 'components/shared/ConfirmationModal';
import SearchBar from 'components/shared/ShearchBar';

class ManageOperations extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      deleteId: 0,
      search: ""
    }
    this.showConfirmationModal = this.showConfirmationModal.bind(this);
    this.handleConfirmedDelete = this.handleConfirmedDelete.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
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

  handleSearchChange(e) {
    this.setState({search: e.target.value});
  }

  render() {
    const { operations } = this.props;
    const { showModal, search } = this.state;

    return (
      <>
        <div className="row">
          <h1 className="col-md-8 col-sm-6 content-title">Manage Operations</h1>
          <div className="col-md-4 col-sm-6 my-1 text-center">
            <Link to="/operations/create" className="btn btn-lg btn-create">New Operation</Link>
          </div>
        </div>
        <div className="row">
          <div className="col-9 my-1 mx-auto">
            <SearchBar placeholder="Category" onChange={this.handleSearchChange}/>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {
              operations.opStatus === "ERROR" && operations.errors.map(err => <div className="alert alert-danger" key={err.detail}>{err.detail}</div>)
            }
            {
              operations.opStatus === "FETCHING" ? <h1>Loading...</h1> :
              <OperationsTable operations={operations.operations.filter((op) => search === "" || op.category.match(new RegExp(`^${search}`,"i")))} manage={true} onRemove={this.showConfirmationModal}/>
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