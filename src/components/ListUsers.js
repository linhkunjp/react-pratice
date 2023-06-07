import { useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import ModalAddUsers from './ModalAddUsers';
import TableUsers from './TableUsers';

const ListUsers = () => {
    const myRef = useRef()

    const [showModalAddUsers, setShowModalAddUsers] = useState(false)

    const handleClose = () => {
        setShowModalAddUsers(false)
    }


    const handleUpdateTable =(user) =>{
        myRef.current.handleUpdateTable(user)
    }

    return (
        <>
            <Container>
                <div className='my-3 list-users'>
                    <span>
                        <h4>List user: </h4>  
                    </span>
                    <button 
                        className='btn btn-success'
                        onClick={() => setShowModalAddUsers(true)}>
                            Add new user
                    </button>
                </div>
            </Container>
            <ModalAddUsers
                
                show={showModalAddUsers}
                handleClose={handleClose}
                handleUpdateTable={handleUpdateTable}
                props

            />
            <TableUsers  ref={myRef} />
        </>
    )
}

export default ListUsers