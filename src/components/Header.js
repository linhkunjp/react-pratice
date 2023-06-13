import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoApp from '../assets/images/logo192.png';
import { NavLink, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'
import { handleLogoutRedux } from '../redux/actions/userAction';
import { useEffect } from 'react';

const Header = (props) =>{

    const navigate = useNavigate()

    const user = useSelector( state => state.user.account )
    const dispatch = useDispatch()

    const handleLogout = () => {
      dispatch( handleLogoutRedux() )  
    }

    useEffect(() => {
      if ( user && user.auth === false ){
        navigate("/")
        toast.success("Logout successful")
      }
    }, [user])

    return (<>
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand href="/">
                <img 
                    src={logoApp}
                    width="30"
                    height="30"
                    className='d-inline-block align-top me-2'
                    alt="React Bootstrap logo"
                />
                <span>React App</span>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                {(user && user.auth || window.location.pathname ==='/') &&
                <>               
                  <Nav className="me-auto">               
                     <NavLink to="/" className="nav-link">Home</NavLink>
                    {user && user.auth ? <NavLink to="/users" className="nav-link">Manage Users</NavLink> : ""}
                  </Nav>
                  <Nav>
                    {user && user.email && <span className="nav-link">Welcome {user.email}</span>}
                     <NavDropdown title="More" id="basic-nav-dropdown">
                      {user && user.auth === true ?
                        <NavDropdown.Item onClick={() => handleLogout()}>Logout</NavDropdown.Item>
                      :  <NavLink to="/login" className="dropdown-item">Login</NavLink>
                        }
                    </NavDropdown>
                  </Nav>
                </>
                }
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <ToastContainer/>
      </>)
}   

export default Header;