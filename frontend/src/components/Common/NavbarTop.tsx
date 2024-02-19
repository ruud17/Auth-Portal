import { FC } from 'react';
import { Container, Nav, NavDropdown, Navbar, Image } from 'react-bootstrap';

interface NavbarTopProps {
  userFullName: string | undefined;
  avatar: string | undefined;
  signOut: () => void;
}

const NavbarTop: FC<NavbarTopProps> = ({ userFullName, avatar, signOut }) => {
  return (
    <Navbar expand='lg' className='navbar-custom'>
      <Container fluid className='justify-content-right'>
        <Navbar.Brand href='/'></Navbar.Brand>
        <Nav className='user-info'>
          <NavDropdown title={userFullName} id='basic-nav-dropdown'>
            <NavDropdown.Item onClick={signOut}>Sign out</NavDropdown.Item>
          </NavDropdown>{' '}
          {avatar && <Image src={avatar} roundedCircle className='user-avatar' />}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarTop;
