import React from "react";
import PropTypes from "prop-types";
import logo_wikilo from "../assets/logo__1024x1024_transparent.png";

const Header = ({ title, description, tela }) => {
	return (
		<nav
			className={`flex items-center justify-between px-10 h-[150px] bg-white ${
				tela && "max-w-[1400px] m-auto"
			}`}
		>
			<div className="header__texts font-bold">
				<h1 className="header__title text-5xl">{title}</h1>
				<p className="header__description text-gray-600">{description}</p>
			</div>
			<img className="header__image h-[100px]" src={logo_wikilo} />
		</nav>
	);
};

Header.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	tela: PropTypes.string.isRequired,
};

export default Header;
