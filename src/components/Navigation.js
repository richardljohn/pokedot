import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
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
			<h2><a className="logo" href="pokedot/">Pokédot</a></h2>
			<nav ref={navRef}>
				{/* <a className="nav-link" href="/search">Search</a>
        		<a className="nav-link" href="/profile">Profile</a>  */}
				<a className="nav-link" href="pokedot/pokemon">Pokédex</a> 
				<a className="nav-link" href="pokedot/">Disclaimer</a> 
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