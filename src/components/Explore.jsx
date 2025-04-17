import { Link } from "react-router-dom";
import logo__home from "../assets/logo__1024x1024_transparent.png";
import background from "../assets/background__secondary.jpg";
import NavBar from "./NavBar";
import ListWiki from "./ListWiki";

export default function Explore() {
	return (
		<section
			className="overflow-hidden"
			style={{
				backgroundImage: `url(${background})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				zIndex: -1, // para que fique abaixo do conteúdo
			}}
		>
			<NavBar />
			<ListWiki />
		</section>
	);
}
