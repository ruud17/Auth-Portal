import { FC } from 'react';
import { Container, Navbar } from 'react-bootstrap';

interface NavbarTopProps {
  loggedUserFullName: string | undefined;
  avatar: string | undefined;
}

const NavbarTop: FC<NavbarTopProps> = ({ loggedUserFullName, avatar }) => {
  return (
    <Navbar className='bg-body-tertiary' fixed='top' bg='dark' data-bs-theme='dark'>
      <Container>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          <Navbar.Text>
            Signed in as:
            <img src={avatar} alt='Bootstrap' width='30' height='24' />
            {loggedUserFullName}
          </Navbar.Text>
          <Navbar.Text className='text-align-right'>Logout</Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarTop;
