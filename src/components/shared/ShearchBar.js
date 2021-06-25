import React from 'react';

const SearchBar = ({placeholder, onChange}) => {

  return (
    <div className="input-group">
      <input type="text" className="form-control" placeholder={placeholder} onChange={onChange} aria-label={placeholder}/>
      <div className="input-group-append">
      <span className="input-group-text">
        <i className="bi bi-search"></i>
      </span>
      </div>
    </div>
  )
}

export default SearchBar;