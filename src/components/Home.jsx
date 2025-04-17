import { Link } from "react-router-dom";
import logo__home from "../assets/logo__1024x1024_transparent.png";
import background__home from "../assets/background__primary.png";

export default function Home() {
	return (
		<section className="home__container h-screen m-auto text-center flex flex-col justify-center items-center gap-0 relative bg-black/20">
			<div
				className="background-overlay absolute inset-0"
				style={{
					backgroundImage: `url(${background__home})`,
					opacity: 0.6, // ajusta o nível de opacidade
					backgroundSize: "cover",
					backgroundPosition: "center",
					zIndex: -1, // para que fique abaixo do conteúdo
				}}
			></div>
			<img
				src={logo__home}
				alt="Logo da WikiLo"
				className="logo__home h-[200px]"
			/>
			<span className="home__texts">
				<h1 className="home__title text-5xl font-extrabold text-white">
					Crie wikis incríveis para seus
				</h1>
				<span className="home__title--pink text-5xl font-extrabold text-pink-500">
					artistas favoritos
				</span>
				<p className="home__description text-[20px] text-white font-bold max-w-[600px] mx-auto">
					Compartilhe seu conhecimento e paixão por música criando wikis
					detalhadas sobre seus artistas preferidos. Construa a maior biblioteca
					colaborativa de fãs.
				</p>
				<div className="home__actions flex justify-center gap-10 mt-5">
					<Link
						to={"/explorar"}
						className="btn__explore bg-black text-white w-[150px] h-[40px] flex justify-center items-center rounded-xl font-bold drop-shadow-2xl"
					>
						Explorar
					</Link>
					<Link
						to={"/create-wiki"}
						className="btn__createWiki bg-[#FF0043] text-white w-[150px] h-[40px] flex justify-center items-center rounded-xl drop-shadow-sm font-bold drop-shadow-[#FF0043]"
					>
						Criar Wiki
					</Link>
				</div>
			</span>
		</section>
	);
}
