export const extractApiErrors = (err) => {
  if (err && err.response && err.response.data && err.response.data.errors) {
    return err.response.data.errors
  }

  if (err && err.response && err.response.data) {
    return err.response.data
  }

  return err;
}

export * from './auth';
export * from './operations';