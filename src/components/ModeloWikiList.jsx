import { Link } from "react-router-dom";
import logo__home from "../assets/logo__1024x1024_transparent.png";
import background from "../assets/background__secondary.jpg";
import NavBar from "./NavBar";
import ModeloWikiUm from "./ModeloWikiUm";
import ModeloWikiDois from "./ModeloWikiDois";

export default function ModeloWikiList() {
	return (
		<main className="container__wikis @max-xs:grid-cols-1  md:grid-cols-2  lg:grid-cols-3 grid mx-10 gap-10">
			<ModeloWikiUm />
			<ModeloWikiDois />
		</main>
	);
}
