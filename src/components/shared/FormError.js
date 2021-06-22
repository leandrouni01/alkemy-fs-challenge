import React from 'react';

const FormError = ({children}) => 
<div className="alert alert-danger">
  {children}
</div>

export default FormError;