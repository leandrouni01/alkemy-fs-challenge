import React from 'react';
import { Link } from 'react-router-dom';

const FormNav = () => {
  return (
    <div className="row">
      <div className="col-9 mx-auto form-nav">
        <Link to="/operations" className="btn btn-secondary">
        <i className="bi bi-arrow-left"></i> Back
        </Link>
      </div>
    </div>
  )
}

export default FormNav;