import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/navigation.css";

function Navigation() {
	const navRef = useRef();

	const showNavigation = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	return (
		<header>
			<h2><Link className="logo" to="/pokedot">Pokédot</Link></h2>
			<nav ref={navRef}>
				{/* <a className="nav-link" href="/search">Search</a>
        		<a className="nav-link" href="/profile">Profile</a>  */}


				{/* Might need to add a new html or index file */}
				<Link className="nav-link" to="/pokedot/pokemon">Pokédex</Link> 
				<Link className="nav-link" to="/pokedot">Disclaimer</Link> 
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavigation}>
					<FaTimes />
				</button>
			</nav>

			{/* Redo when Profile, Accounts, Favorites, Teams, etc. are done with. */}

			<button
				className="nav-btn"
				onClick={showNavigation}>
				<FaBars />
			</button>
		</header>
	);
}

export default Navigation;