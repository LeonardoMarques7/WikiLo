import React from "react";
import logo_wikilo from "../assets/logo__1024x1024_transparent.png";
import { Link } from "react-router-dom";
import "./FooterStyles.css";

const Footer = () => {
	return (
		<footer className="w-full h-[300px] bg-pink-700 mt-10 flex justify-between items-center lg:justify-evenly">
			<div className="container__links font-bold flex flex-col gap-5 text-[20px] text-pink-400">
				<h3>Links Úteis</h3>
				<ul className="footer__title text-white flex flex-col gap-2">
					<li className="footer__link">
						<Link to={"/sobre"}>Sobre</Link>
					</li>
					<li className="footer__link">
						<Link to={"/Contato"}>Contato</Link>
					</li>
					<li className="footer__link">
						<Link to={"/create-wiki"}>Contribuir</Link>
					</li>
					<li className="footer__link">
						<Link to={"/criador"}>Criador</Link>
					</li>
				</ul>
			</div>
			<img
				src={logo_wikilo}
				alt="Logo da WikiLo"
				className="brightness-0 invert-100 h-[250px]"
			/>
			<div className="container__links font-bold flex flex-col gap-5 text-[20px] text-pink-400">
				<h3>Redes Sociais</h3>
				<ul className="footer__title text-white flex flex-col gap-2">
					<li className="footer__link">
						<Link
							to={"/https://www.linkedin.com/in/leonardo-emanuel-3695451a0/"}
						>
							Linkedin
						</Link>
					</li>
					<li className="footer__link">
						<Link
							to={"https://www.instagram.com/leonardo_marques15/?theme=dark"}
						>
							Instagram
						</Link>
					</li>
					<li className="footer__link">
						<Link to={"https://www.youtube.com/watch?v=RXRaZzDK8F0"}>
							YouTube
						</Link>
					</li>
					<li className="footer__link">
						<Link to={"https://github.com/LeonardoMarques7"}>Github</Link>
					</li>
				</ul>
			</div>
		</footer>
	);
};

export default Footer;
