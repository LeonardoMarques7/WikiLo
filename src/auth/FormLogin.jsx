import { Link, useNavigate, useLocation } from "react-router-dom";
import logo__login from "../assets/logo__1024x1024_transparent.png";
import background__login from "../assets/background__primary.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "../api/api"; // Importe a função de login

const loginUserFormSchema = z.object({
	email: z
		.string()
		.nonempty("O email é obrigatório")
		.email("Formato de email inválido")
		.toLowerCase(),
	password: z.string().nonempty("A senha é obrigatória"),
});

export default function FormLogin() {
	const [loginError, setLoginError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const navigate = useNavigate();
	const location = useLocation(); // Importe e use useLocation

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(loginUserFormSchema),
	});

	async function handleLogin(data) {
		setIsSubmitting(true);
		setLoginError("");

		try {
			const responseData = await loginUser(data);
			localStorage.setItem("authToken", responseData.token);
			console.log("Login realizado com sucesso!", responseData);

			// Redireciona para a página que o usuário tentou acessar ou para a home
			const redirectTo = location.state?.from?.pathname || "/";
			navigate(redirectTo);
		} catch (error) {
			console.error(
				"Erro ao fazer login:",
				error.response?.data?.message || error.message || "Erro ao fazer login."
			);
			setLoginError(
				error.response?.data?.message || error.message || "Erro ao fazer login."
			);
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<section className="login__container h-screen m-auto text-center flex flex-col justify-center items-center gap-0 relative bg-black/20">
			<div
				className="background-overlay absolute inset-0"
				style={{
					backgroundImage: `url(${background__login})`,
					opacity: 0.6,
					backgroundSize: "cover",
					backgroundPosition: "center",
					zIndex: -1,
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
				<form
					onSubmit={handleSubmit(handleLogin)}
					className="flex flex-col gap-2"
				>
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
							placeholder="Email"
							className="form__input focus:outline-0 h-[30px] text-pink-600 border-1 border-transparent border-b-pink-500 w-full"
							{...register("email")}
						/>
						{errors.email && (
							<span className="font-bold text-sm text-black">
								{errors.email.message}
							</span>
						)}
					</div>
					<div className="group__input flex flex-col justify-start text-start items-start">
						<label
							htmlFor="password"
							className="input__label font-bold text-pink-500 text-2xl"
						>
							Senha
						</label>
						<input
							type="password"
							id="password"
							placeholder="Senha"
							className="form__input focus:outline-0 h-[30px] text-pink-600 border-1 border-transparent border-b-pink-500 w-full"
							{...register("password")}
						/>
						{errors.password && (
							<span className="font-bold text-sm text-black">
								{errors.password.message}
							</span>
						)}
					</div>
					{loginError && (
						<p className="text-red-500 text-sm mt-2">{loginError}</p>
					)}
					<h2 className="form__title--small text-start w-full mb-2 mt-5 text-[20px] font-bold">
						Entrar como:{" "}
					</h2>
					<div className="form__buttons flex justify-between gap-2 mb-5 ">
						<button
							type="button"
							className="btn btn__facebook cursor-pointer   w-full bg-blue-500 rounded-md text-white flex items-center justify-evenly h-[40px] opacity-85 hover:opacity-100 ease-in-out duration-300 transition-all group"
						>
							<FontAwesomeIcon
								icon={faFacebook}
								className="group-hover:scale-150 group-hover:rotate-[-5deg] transition-all ease-in-out duration-300"
							/>{" "}
							Facebook
						</button>
						<button
							type="button"
							className="btn btn__google cursor-pointer w-full bg-black rounded-md text-white flex items-center justify-evenly h-[40px] opacity-85 hover:opacity-100 ease-in-out duration-300 transition-all group"
						>
							<FontAwesomeIcon
								icon={faGoogle}
								className="group-hover:scale-150 group-hover:rotate-[-5deg] transition-all ease-in-out duration-300"
							/>{" "}
							Google
						</button>
					</div>
					<button
						type="submit"
						className={`btn btn__submit cursor-pointer bg-linear-to-l to-[#E33C68] from-[#FF0043] from rounded-full text-white flex items-center justify-evenly h-[40px] w-[150px] m-auto shadow-2xl shadow-[#FF0043] hover:w-full ease-in-out duration-300 transition-all ${
							isSubmitting ? "opacity-50 cursor-wait" : ""
						}`}
						disabled={isSubmitting}
					>
						{isSubmitting ? "Entrando..." : "Entrar"}
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
