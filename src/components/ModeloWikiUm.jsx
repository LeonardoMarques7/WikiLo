import React from "react";
import { Link } from "react-router-dom";
import layout from "../../Telas/layout_1.jpg";

const ModeloWikiUm = () => {
	return (
		<div className="card__wiki max-w-[500px] flex flex-col gap-5">
			<img src={layout} alt="" className="wiki__image rounded-2xl h-full" />
			<h3 className="wiki__title rounded-2xl">Modelo 1</h3>
			<Link
				to={"/modelo-um-wiki"}
				className="bg-pink-500 rounded-2xl text-white text-2xl text-center p-2 hover:bg-pink-800 duration-300 ease-in-out"
			>
				Selecionar Modelo
			</Link>
		</div>
	);
};

export default ModeloWikiUm;
