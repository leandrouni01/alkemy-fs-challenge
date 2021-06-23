import React from 'react';
import { Link } from 'react-router-dom';

class OperationsTable extends React.Component {

  render() {

    const { manage, operations, onRemove } = this.props;

    return (
      <div className="table-responsive table-sm">
        <table className="table table-bordered">
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
                <td>{op.date}</td>
                <td>{op.category}</td>
                <td>{op.type}</td>
                {manage &&
                  <td>
                    <button onClick={onRemove(op.id)}>Delete</button>
                    <Link to={`/operations/${op.id}/edit`}>Edit</Link>
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
