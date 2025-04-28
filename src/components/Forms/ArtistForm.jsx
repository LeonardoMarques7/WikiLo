import React, { useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import "./LayoutFormArtistOne.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUser,
	faImage,
	faCompactDisc,
	faTicket,
	faHome,
	faLocation,
	faLocationDot,
	faStar,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerArtist } from "../../api/api";
import image__album__preview from "../../assets/album__preview.png";
import image_foto from "../../assets/album__preview.png";
import image_foto2 from "../../assets/album__preview.png";
import image_foto3 from "../../assets/album__preview.png";
import image_foto4 from "../../assets/album__preview.png";
import image_foto5 from "../../assets/album__preview.png";
import image_foto6 from "../../assets/album__preview.png";
import image_foto7 from "../../assets/album__preview.png";
import image_foto8 from "../../assets/album__preview.png";
import { faCpanel } from "@fortawesome/free-brands-svg-icons";
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
	date_initial: z.string().nonempty("A ano de início é obrigatória"),
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
		watch,
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
				: "#e5e7eb",
			color: state.isSelected ? "#e5e7eb" : "#000",
			padding: "10px 12px",
			cursor: "pointer",
			"&:hover": {
				borderColor: state.isFocused ? "#ec4899" : "#f472b6", // evita mudar no hover
			},
		}),
	};
	const createArtist = async (data) => {
		const formData = new FormData();
		formData.append("name", data.name);
		formData.append("biography", data.biography);
		formData.append("date_initial", data.date_initial);
		formData.append("origin", data.origin);

		// Anexando o banner (lembre-se que data.banner é um FileList)
		if (data.banner && data.banner[0]) {
			formData.append("banner", data.banner[0]);
		}

		// Anexando as fotos (data.pictures também é um FileList se multiple)
		if (data.pictures) {
			for (let i = 0; i < data.pictures.length; i++) {
				formData.append("pictures", data.pictures[i]);
			}
		}

		// Anexando os gêneros como uma string JSON
		formData.append("genres", JSON.stringify(data.genres));

		formData.append("callou_phrase", data.callou_phrase);

		for (const [key, value] of formData.entries()) {
			console.log(`${key}:`, value);
		}

		setIsSubmitting(true);
		try {
			const responseData = await registerArtist(formData); // Use a sua função api
			console.log("Artista cadastrado com sucesso:", responseData);
			setRegistrationSuccess(true);
			setRegistrationError("");
			reset();
		} catch (error) {
			console.error("Erro ao cadastrar:", error);
			setRegistrationError(
				error.response?.data?.message || "Ocorreu um erro ao cadastrar."
			);
			// Se o backend envia uma mensagem de erro específica, use-a
		} finally {
			setIsSubmitting(false);
		}
	};

	const watchedName = watch("name");
	const watchedBiography = watch("biography");
	const watchedOrigin = watch("origin");
	const watchedCallouPhrase = watch("callou_phrase");
	const watchedGenres = watch("genres");
	const watchedDateInitial = watch("date_initial");
	const watchedBanner = watch("banner");
	const watchedPictures = watch("pictures");
	const watchedAlbuns = watch("");

	const placeholderBio =
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio delectus dolore molestias laudantium maxime nemo nobis quaerat fugiat. Praesentium cumque consequatur voluptatem, quia debitis velit ad ut molestiae id nam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio delectus dolore molestias laudantium maxime nemo nobis quaerat fugiat. Praesentium cumque consequatur voluptatem, quia debitis velit ad ut molestiae id nam Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio delectus dolore molestias laudantium maxime nemo nobis quaerat fugiat. Praesentium cumque consequatur voluptatem, quia debitis velit ad ut molestiae id nam";

	const placeholderGenres = ["Pop", "MPB", "Samba"];
	const placeholderCallouPhrase =
		"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet, aspernatur.";

	return (
		<main className="flex max-w-[1400px] m-auto">
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
						} h-[50px] focus:border-pink-600 px-4 outline-0 rounded-md bg-white`}
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
						} focus:border-pink-600 px-4 py-4 outline-0 rounded-md bg-white`}
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
						className={
							errors.date_initial ? "border-red-500 rounded-md bg-white" : ""
						}
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
						} h-[50px] focus:border-pink-600 px-4 outline-0 rounded-md bg-white`}
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
						{...register("banner")}
						className="border border-pink-500 h-[50px] focus:border-pink-600  file:h-full rounded-md bg-white text-[16px] file:mr-4 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-pink-500 file:text-white hover:file:bg-pink-600 hover:cursor-pointer"
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
							multiple
							{...register("pictures")}
							className="border border-pink-500 h-[50px] focus:border-pink-600  file:h-full rounded-md bg-white text-[16px] file:mr-4 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-pink-500 file:text-white hover:file:bg-pink-600 hover:cursor-pointer"
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
								errors.genres ? "border-red-500 rounded-md bg-white" : ""
							} bg-gray-200`}
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
						} h-[50px] focus:border-pink-600 px-4 outline-0 rounded-md bg-white`}
						type="text"
						id="callouPhrase"
						placeholder="Hello World!"
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

			<section className="preview mr-10 flex flex-col w-full max-w-4xl bg-white p-5 rounded-md">
				<h2 className="text-2xl font-bold text-pink-500">Pré-vizualização</h2>
				<section className="container__preview h-full gap-2 rounded-2xl max-w-4xl w-full flex flex-col relative">
					{watchedBanner && watchedBanner[0] ? (
						<img
							src={URL.createObjectURL(watchedBanner[0])}
							alt="Prévia do banner"
							className="max-h-[200px] h-full flex flex-col text-2xl text-center gap-10 bg-center bg-cover relative top-0 left-0 right-0 object-cover w-full bg__image"
						/>
					) : (
						<div className="h-[200px] flex items-center justify-center text-2xl text-gray-400 bg-gray-200 w-full">
							Prévia do banner
						</div>
					)}
					<header className="flex absolute items-center w-full top-0">
						<nav className="flex mx-2 header w-full items-center justify-envely">
							<ul className="container__icon text__home__hidden--moblie">
								<li className="container__item uppercase font-bold">
									{watchedName || "Nome do Artista"} Wiki
								</li>
							</ul>
							<ul className="navagation__container flex w-full absolute text-center justify-center gap-10">
								<li className="container__item">
									<a href="/#albuns" className="item__link">
										Álbuns
									</a>
								</li>
								<li className="container__item">
									<a href="/#fotos" className="item__link">
										Fotos
									</a>
								</li>
								<li className="container__item">
									<a href="/#biography" className="item__link">
										Biografia
									</a>
								</li>
							</ul>
						</nav>
					</header>

					<div
						className="max-w-[1400px] albuns__container-pm flex flex-col gap-2"
						id="Home"
					>
						<h2 className="title__container--album font-extrabold text-2xl ">
							Álbuns{" "}
							<code className="text-[20px]">
								(Você terá mais informações na próxima página)
							</code>
						</h2>
						<span className="blur-md h-full">
							<ul className="albuns__container grid grid-cols-2 lg:grid-cols-4 gap-5 justify-between flex-wrap w-full">
								{Array.from({ length: 4 }).map((_, index) => (
									<li
										key={`placeholder-${index}`}
										className="card__album rounded-2xl bg-gray-300 flex items-center justify-center"
									>
										<span className="texts__card text-center">
											<h3 className="card-album--title font-bold text-gray-500">
												Álbum
											</h3>
											<h3 className="card-album--texts text-gray-400">Ano</h3>
										</span>
									</li>
								))}
							</ul>
						</span>
					</div>
					<section className="fotos__container mt-10">
						<div className="max-w-[1400px] m-auto justify-center flex flex-col gap-5 container--fotos">
							<h2 className="title__container--fotos text-2xl font-extrabold">
								Galeria de Fotos
							</h2>
							<ul className="fotos__list grid grid-cols-4 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
								{watchedPictures && watchedPictures[0] ? (
									Array.from(watchedPictures).map((pic, index) => (
										<img
											key={index}
											src={URL.createObjectURL(pic)}
											alt={`Foto ${index + 1}`}
											className="w-full h-full rounded-2xl object-cover"
										/>
									))
								) : (
									<div className="list__pictures flex gap-5">
										<div className="biography__image min-w-[150px] min-h-[150px] sticky top-0 flex items-center justify-center text-gray-400 bg-gray-200">
											Prévia da Foto
										</div>
										<div className="biography__image min-w-[150px] min-h-[150px] sticky top-0 flex items-center justify-center text-gray-400 bg-gray-200">
											Prévia da Foto
										</div>
									</div>
								)}
							</ul>
						</div>
					</section>
					<section className="biography__container">
						<div className="biography__container--desc max-w-[1400px]">
							<h2 className="biography__title">Biografia</h2>
							<div className="container__description relative">
								{watchedPictures && watchedPictures[0] ? (
									<img
										src={URL.createObjectURL(watchedPictures[0])}
										alt="Prévia do banner"
										className="biography__image sticky top-0"
									/>
								) : (
									<div className="biography__image min-w-[150px] min-h-[150px] sticky top-0 flex items-center justify-center text-gray-400 bg-gray-200">
										Prévia do banner
									</div>
								)}
								<div className="description__texts--container">
									{watchedBiography || placeholderBio}
								</div>
							</div>
							<div className="description__texts--more py-2.5 pb-5 flex items-center gap-5 border-1 border-transparent border-b-gray-400 mt-5">
								<span className="flex gap-2 items-center">
									<FontAwesomeIcon icon={faLocationDot} />
									<h2 className="title__texts--more">Origem:</h2>
									{watchedOrigin || "Sorocaba"}
								</span>
								<span className="flex gap-2 items-center">
									<FontAwesomeIcon icon={faStar} />
									<h2 className="title__texts--more">Ano de Início:</h2>
									{watchedDateInitial || "2025"}
								</span>
								<span className="flex gap-2 items-center">
									<FontAwesomeIcon icon={faCompactDisc} />
									<h2 className="title__texts--more">Gêneros:</h2>
									{(watchedGenres || placeholderGenres).join(", ")}
								</span>
							</div>
						</div>
					</section>
					<footer className="footer__container flex flex-col py-5">
						<div className="footer__section-links flex justify-around">
							<div className="footer__card flex flex-col max-w-[700px]">
								<h2 className="footer__title font-bold uppercase mb-5">
									{watchedName || "Nome do Artista"} Wiki
								</h2>
								<code>{watchedCallouPhrase || placeholderCallouPhrase}</code>
							</div>
							<div className="footer__card mx-10 w-[300px] ">
								<h2 className="footer__title font-bold">Links Úteis</h2>
								<ul className="footer__card--links flex gap-2 my-5">
									<li className="footer__item text-gray-600">
										<a href="#" className="">
											Álbuns
										</a>
									</li>
									<li className="footer__item text-gray-600">
										<a href="#" className="">
											Fotos
										</a>
									</li>
									<li className="footer__item text-gray-600">
										<a href="#" className="">
											Biografia
										</a>
									</li>
								</ul>
							</div>
						</div>
						<div className="footer__bottom-texts border-t-2 border-gray-300 p-10 text-center">
							<p className="bottom-texts">
								© 2025 {watchedName || "De Wikilo para "} WikiLo. Todos os
								direitos reservados.
							</p>
						</div>
					</footer>
				</section>
				<span className="text-end font-bold">* Imagens Ilustrativas</span>
			</section>
		</main>
	);
};

LayoutFormArtista.propTypes = {
	Layout: PropTypes.string.isRequired,
};

export default LayoutFormArtista;
