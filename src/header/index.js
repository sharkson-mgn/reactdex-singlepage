import { Container,
  Navbar,
  Nav,
  Form,
  Button } from 'react-bootstrap';

import replaceAll from '../replaceAllHook';
import SearchInput from './searchInput.js';

 /********************************
  *
  *     ~~ Dump Component ~~
  *
  ********************************/

function Header(props) {

  let defaultValue = (props.value !== null) ?
        replaceAll(props.value,'_',' ').split(' ').map((str) => {
          return str.charAt(0).toUpperCase() +
          replaceAll(str.slice(1),'_',' ').toLowerCase();
        }).join(' ') :
          '' ;

  return (
    <Navbar bg="light" expand="md">
      <Container fluid>
        <Navbar.Brand href="#home" onClick={props.navigationHandler}>ReactDex</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Form
            className="d-flex"
            id="searchForm"
            onSubmit={props.searchHandler}>
            <SearchInput
              key={props.value}
              defaultValue={defaultValue}
              onSubmit={props.searchHandler}
              />
            <Button type="submit" variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
