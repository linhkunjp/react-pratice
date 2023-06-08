import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import ReactPaginate from 'react-paginate';
import _, { debounce } from 'lodash';

import { fetchAllUser } from '../services/userService';
import ModalEditUsers from './ModalEditUsers';
import ModalDelete from './ModalDelete';

import { useEffect, useImperativeHandle, useState } from 'react';
import { forwardRef } from 'react';

const TableUsers = (props, ref) =>{

    const [listUsers, setListUsers] = useState([])
    // const [totalUsers, setTotalUsers] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const [showModalEditUsers, setShowModalEditUsers] = useState(false)
    const [showModalDelete, setShowModalDelete] = useState(false)

    //Lưu thông tin user
    const [dataUserEdit, setDataUserEdit] = useState({})
    const [dataUserDelete, setDataUserDelete] = useState({})

    const [sortBy, setSortBy] = useState("asc")
    const [sortField, setSortField] = useState("desc")

    useEffect(()=>{
        //call apis
        getUsers(1)
    }, [])
    
    const getUsers = async (page) =>{
        let res = await fetchAllUser(page)
        
        if (res && res.data){
            setListUsers(res.data)
            setTotalPages(res.total_pages)
        }
    }
    
    const handleClose = () => {
        setShowModalEditUsers(false)
        setShowModalDelete(false)
    }
    
    const handleUpdateTable = (user) => {
        setListUsers([user ,...listUsers])      
    }

    useImperativeHandle(ref, () =>{
        return {
            handleUpdateTable: handleUpdateTable
        }
    })

    const handleEditUser = (user) =>{
        setShowModalEditUsers(true)
        setDataUserEdit(user)
        console.log(user)
    }

    const handleEditTable = (user) =>{
        let index = listUsers.findIndex(item => item.id === user.id)
        listUsers[index].first_name = user.first_name
        setListUsers(listUsers)     
    }
    
    const handleDelete = (user) =>{
        setShowModalDelete(true)
        setDataUserDelete(user)
        console.log(user)
    }

    const handleDeleteTable = (user) =>{
        const newListUsers = listUsers.filter(item => item.id !== user.id)
        setListUsers(newListUsers)
    }

    const handleSort = (sortBy, sortField) =>{
        setSortBy(sortBy)
        setSortField(sortField)

        console.log(sortBy, sortField)

        let cloneListUsers = _.cloneDeep(listUsers)
        cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy])
        setListUsers(cloneListUsers)
        console.log(cloneListUsers)
    }

    const handleSearch = debounce((event) =>{
        console.log(event.target.value)
        let input = event.target.value
        if(input){
            let cloneListUsers = _.cloneDeep(listUsers)
            cloneListUsers = cloneListUsers.filter(item => item.email.includes(input))
            setListUsers(cloneListUsers)
        }else{
            getUsers(1)
        }
    }, 500)

    const handlePageClick = (ev) =>{
        getUsers(+ev.selected + 1)
    }

    return (<>
        <Container>
            <div className='col-12 col-sm-4 my-3'>
                <input 
                    className='form-control'
                    placeholder='Search user by email...'
                    onChange={(event) => handleSearch(event)}
                />
            </div>
            <div className='customize-table'>
                <Table striped bordered hover>
                <thead>
                    <tr >
                    <th className='sort-header'>
                        <span>ID</span>
                        <span>
                            <i 
                                className='fa-solid fa-arrow-down-long'
                                onClick={() => handleSort("desc", "id")}                    
                            ></i>
                            <i 
                                className='fa-solid fa-arrow-up-long'   
                                onClick={() => handleSort("asc", "id")}                                        
                            ></i>
                        </span>
                    </th>
                    <th >Email</th>
                    <th className='sort-header'>
                        <span>First Name</span>
                        <span>
                            <i 
                                className='fa-solid fa-arrow-down-long'
                                onClick={() => handleSort("desc", "first_name")}                    
                            ></i>
                            <i 
                                className='fa-solid fa-arrow-up-long'   
                                onClick={() => handleSort("asc", "first_name")}                                        
                            ></i>
                        </span>
                    </th>
                    <th >Last Name</th>
                    <th >Actions</th>
                    </tr>
                </thead>
                <tbody className='align-middle'>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index)=>{
                            return (
                                <tr key={`users-${index}`}>
                                <td>{item.id}</td>
                                <td>{item.email}</td>
                                <td>{item.first_name}</td>
                                <td>{item.last_name}</td>
                                <td className='customize-btn'>
                                    <button 
                                        className='btn btn-warning mx-2 my-1'
                                        onClick={() => handleEditUser(item)}
                                    >Edit</button>
                                    <button 
                                        className='btn btn-danger mx-2 my-1'
                                        onClick={() => handleDelete(item)}
                                    >Delete</button>
                                </td>
                                </tr>
                            )
                        })
                    }          
                </tbody>
                </Table>
            </div>
            <ModalEditUsers
                show={showModalEditUsers}
                handleClose={handleClose}
                handleEditUser={handleEditUser}
                handleEditTable={handleEditTable}
                dataUserEdit={dataUserEdit}
            />
            <ModalDelete
                show={showModalDelete}
                handleClose={handleClose}
                dataUserDelete={dataUserDelete}
                handleDeleteTable={handleDeleteTable}
            />
            <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPages}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
            />
        </Container>
    </>)
}   

export default forwardRef(TableUsers);