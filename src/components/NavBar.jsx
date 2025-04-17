import React from "react";
import { Link } from "react-router-dom";
import logo__transparent from "../assets/logo__1024x1024_transparent.png";

const NavBar = () => {
	return (
		<nav className="container__navbar flex justify-between my-2 mx-10 items-center">
			<span className="navbar__texts flex items-center gap-5 text-5xl font-bold">
				<img
					src={logo__transparent}
					alt="Logo do WikiLo"
					className="navbar__logo w-[150px]"
				/>
				<h1 className="navbar__title text-[#000] ">Wikis em Destaque</h1>
			</span>
			<span className="navbar__actions flex gap-5">
				<Link
					to={"/"}
					className="actions__btn--singIn bg-black rounded-md text-white flex justify-center items-center px-5 py-1.5"
				>
					Entrar
				</Link>
				<Link
					to={"/"}
					className="actions__btn--singUp bg-pink-500  rounded-md text-white flex justify-center items-center px-5 py-1.5"
				>
					Cadastrar
				</Link>
			</span>
		</nav>
	);
};

export default NavBar;
