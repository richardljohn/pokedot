import { useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/navigation.css";

function Navigation() {
  const navRef = useRef();
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Navigation Mobile View Automatic Closers
  const toggleNavigation = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNavigation = () => {
    setIsNavOpen(false);
  };

  return (
    <header>
      <h2>
        <Link className="logo" to="/pokedot">
          Pokédot
        </Link>
      </h2>
      <nav ref={navRef} className={isNavOpen ? "responsive_nav" : ""}>
        <Link to="/pokedot/pokemon" onClick={closeNavigation}>
          Pokédex
        </Link>
        <Link to="/pokedot" onClick={closeNavigation}>
          Disclaimer
        </Link>
        <button className="nav-btn nav-close-btn" onClick={toggleNavigation}>
          <FaTimes />
        </button>
      </nav>

      <button className="nav-btn" onClick={toggleNavigation}>
        <FaBars />
      </button>
    </header>
  );
}

export default Navigation;