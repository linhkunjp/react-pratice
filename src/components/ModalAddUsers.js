import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateUser } from '../services/userService';
import { ToastContainer, toast } from 'react-toastify';

const ModalAddUsers = (props) => {

    const {show, handleClose, handleUpdateTable } = props;
    const [name, setName] = useState("")
    const [job, setJob] = useState("")

    const handleSaveUser = async () =>{
        let res = await postCreateUser(name, job)

        if(res && res.id){
            const updateTable = {first_name: name, id: res.id}
            //success
            // handleClose()
            setName('')
            setJob('')
            handleUpdateTable(updateTable)
            toast.success("Successfully created")
        }else{
            //error
            toast.error("An error...")
        }
    }


    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="job" className="form-label">Job</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="job"
                                value={job}
                                onChange={e => setJob(e.target.value)}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSaveUser()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
        </>
    )
}

export default ModalAddUsers