import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { putUpdateUser } from '../services/userService';
import { ToastContainer, toast } from 'react-toastify';

const ModalEditUsers = (props) => {

    const { show, handleClose, dataUserEdit, handleEditTable } = props;
    const [ name, setName] = useState("")
    const [ job, setJob] = useState("")

    const handleEditUser = async () =>{
        let res = await putUpdateUser(name, job)
        if (res && res.updatedAt){
            const editTable = {first_name: name, id: dataUserEdit.id}
            //success
            handleEditTable(editTable)
            handleClose();
            toast.success("Successfully updated")
        }else{
            //error
            toast.error("An error...")
        }

    }

    useEffect(() =>{
        if (show){
            setName(dataUserEdit.first_name)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataUserEdit])

    // console.log('check data:', dataUserEdit)

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit a user</Modal.Title>
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
                    <Button variant="primary" onClick={() => handleEditUser()}>
                        Confirm
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

export default ModalEditUsers