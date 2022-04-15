import React from 'react'
import {Navbar, Container, Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'          //selector to read from redux
import { logout } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)     //get userlogin and read userinfo 
  const { userInfo } = userLogin

  const logoutHandler = () => {           /* dispatches logout action */
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>MyShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
              </LinkContainer>
               
              {userInfo ? (                                                       /* bind user Info, if it is defined then show a different display. meaning if user info is present. then display a different header */
                <NavDropdown title={userInfo.name} id='username'>             {/* show a username dropdown with your users name  */}
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>                {/* show a dropdown logout option */}
                    Logout  
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (<LinkContainer to="/login">                              {/* if a user info isnt present then show an option to login */}
              <Nav.Link ><i className='fas fa-user'></i> Sign In</Nav.Link>
            </LinkContainer>)}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </header>
)
}                                          
              
              
export default Header