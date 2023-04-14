import {Container, Nav, Navbar} from 'react-bootstrap';
import {Link, NavLink} from "react-router-dom";
const Header = () => {
  return (
    <>
    <Navbar bg="dark" variant="dark" className='fixed-top'>
        <Container>
          <Link className="px-3 py-1 text-white text-decoration-none" to="/"><h4 className='mb-0'>My Task</h4></Link>
          <Nav className="me-auto">
            <NavLink className="px-3 py-1 text-white text-decoration-none" to="/">Task</NavLink>
            <NavLink className="px-3 py-1 text-white text-decoration-none"  to="/create">Create Task</NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
