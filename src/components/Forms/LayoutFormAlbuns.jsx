import React, { useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { Link } from "react-router-dom";

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

const LayoutFormArtista = ({ Layout }) => {
	const [anoInicio, setAnoInicio] = useState(null);
	const [generosSelecionados, setGenerosSelecionados] = useState([]);

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

	return (
		<main className="flex">
			<form
				action=""
				className="artist__form w-full max-w-[500px] mx-10 flex flex-col gap-5"
			>
				<div className="group__input flex flex-col text-[18px]">
					<label className="text-[18px]" htmlFor="name">
						Nome do Álbum
					</label>
					<input
						type="text"
						id="name"
						placeholder="Álbum tralala"
						className="border-1 border-pink-500 h-[50px] focus:border-pink-600 px-4 outline-0 rounded-md"
					/>
				</div>

				<div className="group__input flex flex-col text-[18px]">
					<label className="text-[18px]" htmlFor="description">
						Descrição
					</label>
					<textarea
						name="description"
						id="description"
						placeholder="Fale um pouco sobre o álbums do artista..."
						className="h-[100px] max-h-[300px] min-h-[100px] border-1 border-pink-500 focus:border-pink-600 px-4 py-4 outline-0 rounded-md"
					></textarea>
				</div>

				<div className="group__input flex flex-col text-[18px]">
					<label className="text-[18px]" htmlFor="linkAlbum">
						Link do Álbum
					</label>
					<input
						className="border-1 border-pink-500 h-[50px] focus:border-pink-600 px-4 outline-0 rounded-md"
						type="text"
						id="linkAlbum"
						placeholder="https://trallaalatrlaala.com"
					/>
				</div>
				<div className="group__input flex flex-col text-[18px]">
					<label className="text-[18px]" htmlFor="dateRelease">
						Lançamento
					</label>
					<Select
						inputId="dateRelease"
						options={anos}
						styles={customStyles}
						placeholder="Selecione o ano"
						onChange={(option) => setAnoInicio(option.value)}
						value={anos.find((ano) => ano.value === anoInicio) || null}
						isSearchable={false}
					/>
				</div>
				<div className="group__input--album flex justify-between">
					<div className="group__input flex flex-col text-[18px] w-[200px]">
						<label className="text-[18px]" htmlFor="gravadoraAlbum">
							Gravadora
						</label>
						<input
							className="border-1 border-pink-500 h-[50px] focus:border-pink-600 px-4 outline-0 rounded-md"
							type="text"
							id="gravadoraAlbum"
							placeholder="TralalaTelecom"
						/>
					</div>
					<div className="group__input flex flex-col text-[18px]">
						<label className="text-[18px]" htmlFor="producaoAlbum">
							Produção
						</label>
						<input
							className="border-1 border-pink-500 h-[50px] focus:border-pink-600 px-4 outline-0 rounded-md"
							type="text"
							id="producaoAlbum"
							placeholder="TralalaTelecom"
						/>
					</div>
				</div>
				<div className="group__input flex flex-col text-[18px]">
					<label className="text-[18px]" htmlFor="imageAlbum">
						Foto Principal
					</label>
					<input
						type="file"
						id="imageAlbum"
						className="border border-pink-500 h-[50px] focus:border-pink-600  file:h-full rounded-md text-[16px] file:mr-4 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-pink-500 file:text-white hover:file:bg-pink-600 hover:cursor-pointer"
					/>
				</div>
				<Link
					to={"/wiki/albuns"}
					className="bg-pink-500 text-2xl rounded-md py-3 hover:bg-pink-600 duration-300 ease-in-out cursor-pointer font-bold text-center text-white"
				>
					Enivar
				</Link>
			</form>

			<section className="preview mr-10 flex flex-col w-full">
				<h2 className="text-2xl font-bold text-pink-500">Pré-visualização</h2>
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
