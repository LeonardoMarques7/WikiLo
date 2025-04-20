import { Link } from "react-router-dom";
import logo__register from "../assets/logo__1024x1024_transparent.png";
import background__register from "../assets/background__three.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";

export default function FormRegister() {
	const { register, handleSubmit } = useForm();

	function crateUser(data) {
		console.log(data);
	}

	return (
		<section className="register__container h-auto pb-10 m-auto text-center flex flex-col justify-center items-center gap-0 relative bg-black/20">
			<div
				className="background-overlay absolute inset-0"
				style={{
					backgroundImage: `url(${background__register})`,
					opacity: 0.6, // ajusta o nível de opacidade
					backgroundSize: "contain",
					backgroundPosition: "center",
					zIndex: -1, // para que fique abaixo do conteúdo
				}}
			></div>
			<img
				src={logo__register}
				alt="Logo da WikiLo"
				className="logo__register h-[200px] brightness-0 invert-100 opacity-60 absolute top-2 left-2"
			/>
			<div className="form__register bg-white flex flex-col p-5 m-5 pb-5 rounded-2xl max-w-md w-full px-12">
				<h1 className="form__title text-blue-500 text-3xl font-bold">
					Cadastrar
				</h1>
				<p className="form__text font-bold">Vamos criar uma conta?</p>
				<form action="" className="flex flex-col gap-3 mt-4">
					<div className="group__input flex flex-col justify-start text-start items-start">
						<label
							htmlFor="register"
							className="input__label font-bold text-blue-500 text-[20px]"
						>
							Nome de Usuário
						</label>
						<input
							type="text"
							id="register"
							className="form__input focus:outline-0 h-[30px] text-blue-600 border-1 border-transparent border-b-blue-500 w-full"
						/>
					</div>
					<div className="group__input flex flex-col justify-start text-start items-start">
						<label
							htmlFor="register"
							className="input__label font-bold text-blue-500 text-[20px]"
						>
							Email
						</label>
						<input
							type="text"
							id="register"
							className="form__input focus:outline-0 h-[30px] text-blue-600 border-1 border-transparent border-b-blue-500 w-full"
						/>
					</div>
					<div className="group__input flex flex-col justify-start text-start items-start">
						<label
							htmlFor="register"
							className="input__label font-bold text-blue-500 text-[20px]"
						>
							Senha
						</label>
						<input
							type="password"
							id="password"
							className="form__input focus:outline-0 h-[30px] text-blue-600 border-1 border-transparent border-b-blue-500 w-full"
						/>
					</div>
					<div className="group__input flex flex-col justify-start text-start items-start">
						<label
							htmlFor="register"
							className="input__label font-bold text-blue-500 text-[20px]"
						>
							Confirmar Senha
						</label>
						<input
							type="password"
							id="password"
							className="form__input focus:outline-0 h-[30px] text-blue-600 border-1 border-transparent border-b-blue-500 w-full"
						/>
					</div>
					<span className="input__checkTermsAndPolicy text-xs w-full flex items-center justify-start font-bold">
						<label
							htmlFor="terms"
							className="flex items-center cursor-pointer space-x-2 pt-5"
						>
							<input
								type="checkbox"
								name="terms"
								id="terms"
								className="peer hidden"
							/>
							<div className="w-4 h-4 rounded-full p-2 border-2 border-gray-500 peer-checked:bg-blue-500 peer-checked:border-blue-800 peer-checked:shadow-md peer-checked:shadow-blue-500 flex items-center justify-center transition-all">
								<FontAwesomeIcon
									icon={faCheck}
									className="text-white text-[8px] peer-checked:opacity-100 transition-opacity"
								/>
							</div>
							<span className="text-xs font-bold">
								Concordo com os{" "}
								<Link to="/terms" className="text-blue-500">
									Termos
								</Link>{" "}
								e{" "}
								<Link to="/policy" className="text-blue-500">
									Política de Privacidade
								</Link>
							</span>
						</label>
					</span>
					<h2 className="form__title--small text-start w-full mt-5 text-[20px] font-bold">
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
						className="btn btn__submit cursor-pointer bg-linear-to-l to-blue-500 from-blue-700 from rounded-full text-white flex items-center justify-evenly h-[40px] w-[150px] m-auto shadow-2xl shadow-blue-500 hover:w-full ease-in-out duration-500 transition-all"
					>
						Criar conta
					</button>
				</form>
			</div>
			<strong className="text-[20px]">
				Não tem uma conta?{" "}
				<Link
					to={"/register"}
					className="form__link text-blue-700 ease-in-out transition-all duration-500 hover:text-blue-600 hover:bg-white rounded-md p-2"
				>
					Entrar
				</Link>
			</strong>
		</section>
	);
}
