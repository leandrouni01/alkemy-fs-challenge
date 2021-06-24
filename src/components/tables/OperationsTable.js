import React from 'react';
import { Link } from 'react-router-dom';
import { cleanDate } from 'helpers/functions';

class OperationsTable extends React.Component {

  render() {

    const { manage, operations, onRemove } = this.props;

    return (
      <div className="table-responsive ">
        <table className="table table-bordered table-sm operation-table">
          <thead>
            <tr>
              <th>Concept</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Category</th>
              <th>Type</th>
              {manage && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {operations.map(op => {
              return (<tr key={op.id}>
                <td>{op.concept}</td>
                <td>{op.amount}</td>
                <td>{cleanDate(op.date)}</td>
                <td>{op.category}</td>
                <td>{op.type}</td>
                {manage &&
                  <td>
                    <button className="btn btn-sm btn-danger" onClick={onRemove(op.id)}>Delete</button>
                    <Link className="btn btn-sm btn-info"to={`/operations/${op.id}/edit`}>Edit</Link>
                  </td>
                }
              </tr>)
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default OperationsTable;
