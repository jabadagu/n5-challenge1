import { NavLink } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useTheme } from "../context/ThemeContext";
import "../assets/scss/main.scss";

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className='main-header-container'>
      <header className='main-header'>
        <Navbar expand='lg' bg="isDarkMode ? 'dark-mode' : 'light'">
          <div className='container'>
            <NavLink className='navbar-brand' to='/'>
              <img
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOO1gAVA1ygpidr1UOAabwyntcRzWHHZ14vg&s'
                alt='logo ed'
                className='main-logo c-height-40'
              />
            </NavLink>
            <Navbar.Toggle aria-controls='navbarNav' />
            <Navbar.Collapse id='navbarNav' className='justify-content-between'>
              <Nav className='ml-auto'>
                <NavLink className='nav-link' exact='true' to='/'>
                  Inicio
                </NavLink>
                <NavLink className='nav-link' to='/products'>
                  Productos
                </NavLink>
              </Nav>
              <Button
                variant='outline-secondary'
                onClick={toggleTheme}
                className='ml-lg-2 mt-2 mt-lg-0 button-custom'>
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </Button>
            </Navbar.Collapse>
          </div>
        </Navbar>
      </header>
    </div>
  );
};

export default Header;
