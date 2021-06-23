import { Modal } from 'react-responsive-modal';

const ConfirmationModal = ({open, message, onConfirmation, onClose}) => {
  return (
    <Modal open={open} onClose={onClose} center>
      <div className='modal-body'>
        {message}
      </div>
      <div className='modal-footer'>
        <button 
          onClick={onConfirmation}
          type='button' 
          className='btn'>Confirm</button>
        <button 
          onClick={onClose}
          type='button' 
          className='btn btn-alert'>Cancel</button>
      </div>
    </Modal>
  )
}

export default ConfirmationModal;