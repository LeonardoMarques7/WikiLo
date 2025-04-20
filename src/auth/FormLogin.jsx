import { Link } from "react-router-dom";
import logo__login from "../assets/logo__1024x1024_transparent.png";
import background__login from "../assets/background__primary.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function FormLogin() {
	return (
		<section className="login__container h-screen m-auto text-center flex flex-col justify-center items-center gap-0 relative bg-black/20">
			<div
				className="background-overlay absolute inset-0"
				style={{
					backgroundImage: `url(${background__login})`,
					opacity: 0.6, // ajusta o nível de opacidade
					backgroundSize: "cover",
					backgroundPosition: "center",
					zIndex: -1, // para que fique abaixo do conteúdo
				}}
			></div>
			<img
				src={logo__login}
				alt="Logo da WikiLo"
				className="logo__login h-[200px] brightness-0 invert-100 opacity-60 absolute top-2 left-2"
			/>
			<div className="form__login bg-white flex flex-col gap-5 p-5 pb-10 mb-5 rounded-2xl max-w-sm w-full px-12">
				<h1 className="form__title text-pink-500 text-3xl font-bold">Entrar</h1>
				<p className="form__text font-bold">
					Entre na sua conta para se aventurar
				</p>
				<form action="" className="flex flex-col gap-2">
					<div className="group__input flex flex-col justify-start text-start items-start">
						<label
							htmlFor="login"
							className="input__label font-bold text-pink-500 text-2xl"
						>
							Login
						</label>
						<input
							type="text"
							id="login"
							className="form__input focus:outline-0 h-[30px] text-pink-600 border-1 border-transparent border-b-pink-500 w-full"
						/>
					</div>
					<div className="group__input flex flex-col justify-start text-start items-start">
						<label
							htmlFor="login"
							className="input__label font-bold text-pink-500 text-2xl"
						>
							Senha
						</label>
						<input
							type="password"
							id="password"
							className="form__input focus:outline-0 h-[30px] text-pink-600 border-1 border-transparent border-b-pink-500 w-full"
						/>
					</div>
					<h2 className="form__title--small text-start w-full mb-2 mt-10 text-[20px] font-bold">
						Entrar como:{" "}
					</h2>
					<div className="form__buttons flex justify-between gap-2 mb-5 ">
						<button className="btn btn__facebook cursor-pointer  w-full bg-blue-500 rounded-md text-white flex items-center justify-evenly h-[40px] opacity-85 hover:opacity-100 ease-in-out duration-300 transition-all group">
							<FontAwesomeIcon
								icon={faFacebook}
								className="group-hover:scale-150 group-hover:rotate-[-5deg] transition-all ease-in-out duration-300"
							/>{" "}
							Facebook
						</button>
						<button className="btn btn__google cursor-pointer w-full bg-black rounded-md text-white flex items-center justify-evenly h-[40px] opacity-85 hover:opacity-100 ease-in-out duration-300 transition-all group">
							<FontAwesomeIcon
								icon={faGoogle}
								className="group-hover:scale-150 group-hover:rotate-[-5deg] transition-all ease-in-out duration-300"
							/>{" "}
							Google
						</button>
					</div>
					<button
						type="submit"
						className="btn btn__submit cursor-pointer bg-linear-to-l to-[#E33C68] from-[#FF0043] from rounded-full text-white flex items-center justify-evenly h-[40px] w-[150px] m-auto shadow-2xl shadow-[#FF0043] hover:w-full ease-in-out duration-300 transition-all"
					>
						Entrar
					</button>
				</form>
			</div>
			<strong className="text-[20px]">
				Não tem uma conta?{" "}
				<Link
					to={"/register"}
					className="form__link text-pink-700 ease-in-out transition-all duration-500 hover:text-pink-600 hover:bg-white rounded-md p-2"
				>
					Cadastre-se
				</Link>
			</strong>
		</section>
	);
}
