import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../services/userService';
import { toast } from 'react-toastify';


const ModalDelete = (props) => {

    const {show, handleClose, dataUserDelete, handleDeleteTable } = props;
    
    const handleDelete = async () =>{
        let res = await deleteUser(dataUserDelete.id)
        if(res && +res.statusCode === 204){
            handleDeleteTable(dataUserDelete)
            handleClose()
            toast.success("Delete user succed")
        }else{
            toast.error("An esrror...")
        }
        console.log(res)
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        This action can't be undone! Do you want to delete this user?
                        <br />
                        <strong> email = {dataUserDelete.email} </strong>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleDelete()}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDelete