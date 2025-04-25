import React, { useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerArtist } from "../../api/api";
// import { artistCreate } from "../api/api"; // Importe a função de registro

const generosMusicais = [
	{ value: "rock", label: "Rock" },
	{ value: "pop", label: "Pop" },
	{ value: "hiphop", label: "Hip Hop" },
	{ value: "mpb", label: "MPB" },
	{ value: "samba", label: "Samba" },
	{ value: "funk", label: "Funk" },
	{ value: "gospel", label: "Gospel" },
	{ value: "eletronica", label: "Eletrônica" },
	{ value: "forro", label: "Forró" },
	{ value: "sertanejo", label: "Sertanejo" },
	{ value: "indie", label: "Indie" },
	{ value: "trap", label: "Trap" },
	{ value: "outro", label: "Outro" },
];

const createArtistFormSchema = z.object({
	name: z
		.string()
		.nonempty("O nome é obrigatório")
		.transform((name) => {
			return name
				.trim()
				.split(" ")
				.map((word) => {
					return word[0].toLocaleUpperCase().concat(word.substring(1));
				})
				.join(" ");
		}),
	biography: z.string().nonempty("A biografia é obrigatória"),
	date_initial: z.string().nonempty("A data de início é obrigatória"),
	origin: z.string().nonempty("A origem é obrigatória"),
	banner: z.any().optional(), // Permitir qualquer tipo (File) e validar na onSubmit
	pictures: z.any().optional(), // Permitir qualquer tipo (File ou array) e validar na onSubmit
	genres: z.array(z.string()).nonempty("O gênero é obrigatório"),
	callou_phrase: z.string().optional(), // callou_phrase não é obrigatória
});

const LayoutFormArtista = ({ Layout }) => {
	const [anoInicio, setAnoInicio] = useState(null);
	const [generosSelecionados, setGenerosSelecionados] = useState([]);
	const [registrationError, setRegistrationError] = useState("");
	const [registrationSuccess, setRegistrationSuccess] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(createArtistFormSchema),
	});

	const anoAtual = new Date().getFullYear();
	const anos = Array.from({ length: 100 }, (_, i) => {
		const year = anoAtual - i;
		return { value: year, label: year.toString() };
	});

	const customStyles = {
		control: (base, state) => ({
			...base,
			backgroundColor: "#fff",
			borderColor: state.isFocused ? "#ec4899" : "#f472b6", // rosa-500/600
			borderRadius: "0.375rem",
			boxShadow: state.isFocused ? "0 0 0 2px #fbcfe8" : "none", // rosa-200
			padding: "2px 4px",
			cursor: "pointer",
			minHeight: "50px",
			"&:hover": {
				borderColor: "#ec4899", // rosa no hover
			},
		}),
		option: (base, state) => ({
			...base,
			backgroundColor: state.isSelected
				? "#ec4899" // rosa-500
				: state.isFocused
				? "#fce7f3" // rosa-100
				: "#fff",
			color: state.isSelected ? "#fff" : "#000",
			padding: "10px 12px",
			cursor: "pointer",
			"&:hover": {
				borderColor: state.isFocused ? "#ec4899" : "#f472b6", // evita mudar no hover
			},
		}),
	};

	// async function createArtist(data) {
	// 	const responseData = await registerArtist(data);
	// 	reset();
	// 	try {
	// 		const response = await fetch("http://localhost:3000/api/create-artist", {
	// 			method: "POST",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 			body: JSON.stringify(data),
	// 		});

	// 		if (response.ok) {
	// 			const responseData = await response.json();
	// 			reset();
	// 		} else {
	// 			const errorText = await response.text(); // Leia o corpo como texto
	// 			console.log("Corpo da resposta de erro:", errorText); // Exiba o corpo no console
	// 			try {
	// 				const errorData = JSON.parse(errorText); // Tente analisar como JSON
	// 				console.error(
	// 					"Erro ao cadastrar:",
	// 					errorData.message || "Erro desconhecido"
	// 				);
	// 				setRegistrationError(
	// 					errorData.message || "Ocorreu um erro ao cadastrar."
	// 				);
	// 			} catch (e) {
	// 				console.error("Erro ao analisar resposta JSON:", e);
	// 				console.error("Conteúdo da resposta de erro:", errorText);
	// 			}
	// 		}
	// 	} catch (error) {
	// 		console.error("Ocorreu um erro na requisição:", error);
	// 	}
	// }

	async function createArtist(data) {
		setRegistrationError("");
		setRegistrationSuccess(false);

		const formData = new FormData();
		formData.append("name", data.name);
		formData.append("biography", data.biography);
		formData.append("date_initial", data.date_initial);
		formData.append("origin", data.origin);
		formData.append("banner", data.banner); // Envie o objeto File do banner
		if (data.pictures) {
			if (Array.isArray(data.pictures)) {
				data.pictures.forEach((picture) =>
					formData.append("pictures", picture)
				); // Envie múltiplos arquivos de fotos
			} else {
				formData.append("pictures", data.pictures); // Envie um único arquivo de foto
			}
		}
		formData.append("genres", JSON.stringify(data.genres)); // Pode enviar como JSON string, o backend precisará parsear
		formData.append("callou_phrase", data.callou_phrase);

		try {
			const response = await fetch("http://localhost:3000/api/create-artist", {
				method: "POST",
				// Remova o header "Content-Type: application/json" para que o navegador defina o correto para FormData
				body: formData,
			});

			if (response.ok) {
				const responseData = await response.json();
				console.log("Artista cadastrado com sucesso:", responseData);
				setRegistrationSuccess(true);
				setRegistrationError("");
				reset(); // Limpar o formulário
			} else {
				const errorText = await response.text();
				console.error("Erro ao cadastrar:", errorText);
				try {
					const errorData = JSON.parse(errorText);
					setRegistrationError(
						errorData.message || "Ocorreu um erro ao cadastrar."
					);
				} catch (e) {
					setRegistrationError("Erro desconhecido ao cadastrar.");
				}
			}
		} catch (error) {
			console.error("Erro ao enviar dados:", error);
			setRegistrationError("Ocorreu um erro de rede.");
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<main className="flex">
			<form
				onSubmit={handleSubmit(createArtist)}
				className="artist__form w-full max-w-[500px] mx-10 flex flex-col gap-5"
			>
				<div className="group__input flex flex-col text-[18px]">
					<label className="text-[18px]" htmlFor="name">
						Nome do Artista
					</label>
					<input
						type="text"
						id="name"
						{...register("name")}
						placeholder="Daniel Marques"
						className={`border-1 ${
							errors.name ? "border-red-500" : "border-pink-500"
						} h-[50px] focus:border-pink-600 px-4 outline-0 rounded-md`}
					/>
					{errors.name && (
						<span className="text-red-500 text-sm">{errors.name.message}</span>
					)}
				</div>

				<div className="group__input flex flex-col text-[18px]">
					<label className="text-[18px]" htmlFor="biography">
						Biografia
					</label>
					<textarea
						id="biography"
						{...register("biography")}
						placeholder="Fale um pouco sobre a história e carreira do artista..."
						className={`h-[100px] max-h-[300px] min-h-[100px] border-1 ${
							errors.biography ? "border-red-500" : "border-pink-500"
						} focus:border-pink-600 px-4 py-4 outline-0 rounded-md`}
					></textarea>
					{errors.biography && (
						<span className="text-red-500 text-sm">
							{errors.biography.message}
						</span>
					)}
				</div>

				<div className="group__input flex flex-col text-[18px]">
					<label className="text-[18px]" htmlFor="dateRelease">
						Ano de Início
					</label>
					<Select
						inputId="dateRelease"
						options={anos}
						styles={customStyles}
						placeholder="Selecione o ano"
						onChange={(option) => {
							setAnoInicio(option ? option.value : null);
							setValue("date_initial", option ? option.value.toString() : "");
						}}
						value={anos.find((ano) => ano.value === anoInicio) || null}
						isSearchable={false}
						className={errors.date_initial ? "border-red-500 rounded-md" : ""}
					/>
					{errors.date_initial && (
						<span className="text-red-500 text-sm">
							A data de início é obrigatória
						</span>
					)}
				</div>

				<div className="group__input flex flex-col text-[18px]">
					<label className="text-[18px]" htmlFor="origin">
						Origem
					</label>
					<input
						className={`border-1 ${
							errors.origin ? "border-red-500" : "border-pink-500"
						} h-[50px] focus:border-pink-600 px-4 outline-0 rounded-md`}
						type="text"
						id="origin"
						placeholder="São Paulo, SP"
						{...register("origin")}
					/>
					{errors.origin && (
						<span className="text-red-500 text-sm">
							{errors.origin.message}
						</span>
					)}
				</div>
				<div className="group__input flex flex-col text-[18px]">
					<label className="text-[18px]" htmlFor="imageBanner">
						Banner Principal
					</label>
					<input
						type="file"
						id="imageBanner"
						className="border border-pink-500 h-[50px] focus:border-pink-600  file:h-full rounded-md text-[16px] file:mr-4 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-pink-500 file:text-white hover:file:bg-pink-600 hover:cursor-pointer"
					/>
					{errors.banner && (
						<span className="text-red-500 text-sm">
							{errors.banner.message}
						</span>
					)}
				</div>

				<div className="group__input flex flex-col gap-5 group__input_2">
					<div className="group__input flex flex-col text-[18px]">
						<label className="text-[18px]" htmlFor="imageBanner">
							Fotos
						</label>
						<input
							type="file"
							id="imageBanner"
							className="border border-pink-500 h-[50px] focus:border-pink-600  file:h-full rounded-md text-[16px] file:mr-4 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-pink-500 file:text-white hover:file:bg-pink-600 hover:cursor-pointer"
						/>
						{errors.pictures && (
							<span className="text-red-500 text-sm">
								{errors.pictures.message}
							</span>
						)}
					</div>
					<div className="group__input flex flex-col text-[18px]">
						<label className="text-[18px]" htmlFor="genres">
							Gêneros do Artista
						</label>
						<Select
							inputId="genres"
							options={generosMusicais}
							isMulti
							placeholder="Selecione um ou mais gêneros"
							onChange={(options) => {
								setGenerosSelecionados(options);
								const selectedValues = options
									? options.map((option) => option.value)
									: [];
								setValue("genres", selectedValues);
							}}
							styles={customStyles}
							className={`basic-multi-select ${
								errors.genres ? "border-red-500 rounded-md" : ""
							}`}
							classNamePrefix="select"
							value={generosSelecionados} // Adicione o value para controlar o componente
						/>
						{errors.genres && (
							<span className="text-red-500 text-sm">
								{errors.genres.message}
							</span>
						)}
					</div>
				</div>

				<div className="group__input flex flex-col text-[18px]">
					<label className="text-[18px]" htmlFor="callouPhrase">
						Frase de Destaque
					</label>
					<input
						className={`border-1 ${
							errors.callouPhrase ? "border-red-500" : "border-pink-500"
						} h-[50px] focus:border-pink-600 px-4 outline-0 rounded-md`}
						type="text"
						id="callouPhrase"
						{...register("callou_phrase")}
					/>
					{errors.callou_phrase && (
						<span className="text-red-500 text-sm">
							{errors.callou_phrase.message}
						</span>
					)}
				</div>
				<button
					type="submit"
					className="bg-pink-500 text-2xl rounded-md py-3 hover:bg-pink-600 duration-300 ease-in-out cursor-pointer font-bold text-center text-white"
				>
					Enivar
				</button>
			</form>

			<section className="preview mr-10 flex flex-col w-full">
				<h2 className="text-2xl font-bold text-pink-500">Pré-vizualização</h2>
				<section className="container__preview bg-gray-300 w-full h-full rounded-2xl flex-1"></section>
				<span className="text-end font-bold">* Imagens Ilustrativas</span>
			</section>
		</main>
	);
};

LayoutFormArtista.propTypes = {
	Layout: PropTypes.string.isRequired,
};

export default LayoutFormArtista;
