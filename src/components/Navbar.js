/** @format */

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/auth";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import { useEffect } from "react";
import { getRootUser, getGuestUser } from "../actions/auth";

export default function NavbarWombat() {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state.auth;
  });
  //se verifica si ya hay datos del usuario en local storage y si los hay recupera la sesión dependiendo si es admin o invitado
  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (state.isGuest === false) {
        dispatch(getRootUser());
      } else if (state.isGuest === true) {
        dispatch(getGuestUser());
      }
    }
  }, [dispatch, state.isGuest]);

  const authLink = (
    <>
      <span>
        <strong className='text-white-50' >
          {state.isAuthenticated && `Welcome ${state.user.username}`}
        </strong>
        <NavDropdown style={{color:'white'}}
          className='justify-content-end'
          title='Options'
          id='navbarScrollingDropdown'
        >
          <NavDropdown.Item><Link to='/user/profile'>My profile</Link></NavDropdown.Item>
          <NavDropdown.Item onClick={() => dispatch(logout())}>
            <p className='text-danger'>Sign out</p>
          </NavDropdown.Item>
        </NavDropdown>
      </span>
    </>
  );
  const publicLink = (
    <NavDropdown drop={"start"} style={{color:'white'}} title='Signin' id='PublicnavbarOptions'>
      <NavDropdown.Item>
        <Link to='/guest/login/'>
          Sign in
        </Link>
      </NavDropdown.Item>
      <NavDropdown.Item>
        <Link to='/guest/register/'>
          Create an account
        </Link>
      </NavDropdown.Item>
    </NavDropdown>
  );

  return (
    <>
      <Navbar bg='dark' collapseOnSelect expand="lg" variant='dark'>
        <Container fluid>
          <Navbar.Brand>
            <Link to='/'>SCHS N NEWS</Link>
          </Navbar.Brand>
          <Nav
            className='my-2 my-lg-0'
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {state.isAuthenticated && state.user.is_admin && (
              <Nav.Link>
                <Link to='/root/dashboard/' className='btn btn-info'>
                  Administer SCH
                </Link>
              </Nav.Link>
            )}
          </Nav>
          {state.isAuthenticated ? authLink : publicLink}
        </Container>
      </Navbar>
    </>
  );
}
