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
	faPaperPlane,
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
import { faCpanel, faSpotify } from "@fortawesome/free-brands-svg-icons";
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
	name: z.string().nonempty("O nome é obrigatório"),
	albumName: z.string().nonempty("O nome do álbum é obrigatório"),
});

const LayoutFormPreview = ({ Layout }) => {
	const [savedArtistName, setSavedArtistName] = useState("");
	const [anoInicio, setAnoInicio] = useState(null);
	const [albumTracks, setAlbumTracks] = useState([]);
	const [step, setStep] = useState("artist");
	const [generosSelecionados, setGenerosSelecionados] = useState([]);
	const [registrationError, setRegistrationError] = useState("");
	const [registrationSuccess, setRegistrationSuccess] = useState(false);
	const [isbuttonting, setIsbuttonting] = useState(false);
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

	const handleNextStep = () => {
		console.log("handleNextStep chamado. Step atual:", step); // Debug 1
		if (step === "artist") {
			setSavedArtistName(watch("name"));
			setStep("album");
			console.log("Nome do artista salvo:", watch("name")); // Debug 2
		}
	};

	const customStyles = {
		control: (base, state) => ({
			...base,
			backgroundColor: "#fff",
			borderColor: state.isFocused ? "#ec4899" : "#f472b6",
			borderRadius: "0.375rem",
			boxShadow: state.isFocused ? "0 0 0 2px #fbcfe8" : "none",
			padding: "2px 4px",
			cursor: "pointer",
			minHeight: "50px",
			"&:hover": {
				borderColor: "#ec4899",
			},
		}),
		option: (base, state) => ({
			...base,
			backgroundColor: state.isSelected
				? "#ec4899"
				: state.isFocused
				? "#fce7f3"
				: "#e5e7eb",
			color: state.isSelected ? "#e5e7eb" : "#000",
			padding: "10px 12px",
			cursor: "pointer",
			"&:hover": {
				borderColor: state.isFocused ? "#ec4899" : "#f472b6",
			},
		}),
	};

	const getSpotifyToken = async () => {
		console.log("getSpotifyToken chamado"); // Debug 4
		const clientId = "6c4335b4b9624700bb7dd149348dc0fc";
		const clientSecret = "61c738d09366427fab762d66c2fc9ac0";

		try {
			const res = await fetch("https://accounts.spotify.com/api/token", {
				method: "POST",
				headers: {
					Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: "grant_type=client_credentials",
			});

			const data = await res.json();
			console.log("Token recebido:", data.access_token); // Debug 5
			return data.access_token;
		} catch (error) {
			console.error("Erro ao obter token do Spotify:", error); // Debug 6
			return null;
		}
	};

	const getArtistAlbums = async (artistId, token, albumName) => {
		const normalizeText = (text) => {
			console.log("Normalizando texto:", text);
			if (typeof text !== "string") {
				return ""; // Se não for uma string, retorna uma string vazia
			}

			return text
				.toLowerCase()
				.normalize("NFD")
				.replace(/[\u0300-\u036f]/g, "");
		};

		const res = await fetch(
			`https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single&limit=20`,
			{
				headers: {
					Authorization: "Bearer " + token,
				},
			}
		);
		const data = await res.json();

		// Normaliza os álbuns e compara os nomes dos álbuns com o nome fornecido (sem se importar com maiúsculas/minúsculas e acentuação)
		const normalizedAlbums = data.items.filter((album) =>
			normalizeText(album.name).includes(normalizeText(albumName))
		);

		console.log("Álbuns encontrados:", normalizedAlbums);
		return normalizedAlbums;
	};

	const getAlbumTracks = async (albumId, token) => {
		const normalizeText = (text) => {
			console.log("Normalizando texto:", text);
			if (typeof text !== "string") {
				return ""; // Se não for uma string, retorna uma string vazia
			}

			return text
				.toLowerCase()
				.normalize("NFD")
				.replace(/[\u0300-\u036f]/g, "");
		};

		console.log(
			"getAlbumTracks chamado com albumId:",
			albumId,
			"e token:",
			token
		);
		try {
			const res = await fetch(
				`https://api.spotify.com/v1/albums/${albumId}/tracks`, // URL Correto
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const data = await res.json();

			// Normaliza os álbuns e compara os nomes dos álbuns com o nome fornecido (sem se importar com maiúsculas/minúsculas e acentuação)
			const normalizedAlbums = data.items.filter((album) =>
				normalizeText(album.name).includes(normalizeText(albumName))
			);
			console.log("Álbuns encontrados:", normalizedAlbums);
			return normalizedAlbums;
		} catch (error) {
			console.error("Erro ao obter tracks do álbum:", error);
			return [];
		}
	};

	const formatDuration = (seconds) => {
		const minutes = Math.floor(seconds / 60000);
		const secs = seconds % 60;
		return `${minutes}:${secs.toString().padStart(2, "0")}`;
	};

	const searchArtist = async (artistName, token) => {
		const res = await fetch(
			`https://api.spotify.com/v1/search?q=${encodeURIComponent(
				artistName
			)}&type=artist&limit=10`,
			{
				headers: {
					Authorization: "Bearer " + token,
				},
			}
		);
		const data = await res.json();
		const exactMatch = data.artists.items.find(
			(artist) => artist.name.toLowerCase() === artistName.toLowerCase()
		);
		return exactMatch?.id || data.artists.items[0]?.id;
	};

	const createArtist = async (data) => {
		console.log("createArtist chamado com data:", data);
		console.log("Nome do artista salvo:", savedArtistName);
		console.log("Nome do álbum:", data.albumName);

		const artistName = savedArtistName;
		const albumName = data.albumName; // Mantém o nome do álbum como foi inserido

		try {
			const token = await getSpotifyToken();
			if (!token) {
				console.warn("Token não obtido, abortando createArtist");
				return;
			}

			const artistId = await searchArtist(artistName, token);
			if (!artistId) {
				alert("Artista não encontrado!");
				return;
			}

			const albums = await getArtistAlbums(artistId, token, albumName);
			if (!albums || albums.length === 0) {
				alert("Álbum não encontrado!");
				return;
			}

			const album = albums.find((a) => {
				const apiAlbumName = a.name.toLowerCase(); // Corrigido para toLowerCase()
				return apiAlbumName === albumName.toLowerCase(); // Comparação estrita
			});

			if (!album) {
				alert("Álbum não encontrado!");
				return;
			}

			const tracks = await getAlbumTracks(album.id, token);

			const formattedTracks = tracks.map((track) => ({
				name: track.name,
				duration_ms: track.duration_ms,
				image: album.images[0]?.url,
				link: track.external_urls.spotify,
			}));

			setAlbumTracks(formattedTracks);
		} catch (error) {
			console.error("Erro ao buscar dados do Spotify:", error);
		}
	};

	const getAllAlbums = async () => {
		const artistName = savedArtistName;

		try {
			const token = await getSpotifyToken();
			if (!token) return;

			const artistId = await searchArtist(artistName, token);
			if (!artistId) {
				alert("Artista não encontrado!");
				return;
			}

			// Busca todos os álbuns (sem filtrar por nome)
			const res = await fetch(
				`https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single&limit=50`,
				{
					headers: {
						Authorization: "Bearer " + token,
					},
				}
			);
			const data = await res.json();

			if (!data.items || data.items.length === 0) {
				alert("Nenhum álbum encontrado.");
				return;
			}

			// Transforma os álbuns em faixas (opcionalmente)
			const albumsWithTracks = await Promise.all(
				data.items.map(async (album) => {
					const tracksRes = await fetch(
						`https://api.spotify.com/v1/albums/${album.id}/tracks`,
						{
							headers: {
								Authorization: "Bearer " + token,
							},
						}
					);
					const tracksData = await tracksRes.json();
					return tracksData.items.map((track) => ({
						name: track.name,
						duration_ms: track.duration_ms,
						image: album.images[0]?.url,
						link: track.external_urls.spotify,
					}));
				})
			);

			// Achata todos os arrays de tracks em um só
			const allTracks = albumsWithTracks.flat();
			setAlbumTracks(allTracks);
		} catch (error) {
			console.error("Erro ao buscar todos os álbuns:", error);
		}
	};

	return (
		<main className="flex max-w-[1400px] m-auto h-screen">
			<form
				onSubmit={handleSubmit(createArtist)}
				className="artist__for max-w-[1400px] w-[500px] mx-10 flex flex-col gap-5"
			>
				{step === "artist" && (
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
							<span className="text-red-500 text-sm">
								{errors.name.message}
							</span>
						)}
					</div>
				)}

				{step === "album" && (
					<div className="flex flex-col gap-5">
						<h2 className="text-gray-500">
							Forneça somente dados sobre os álbuns; se não houver, pode pular.
						</h2>
						<div className="group__input flex flex-col text-[18px]">
							<label className="text-[18px]" htmlFor="albumName">
								Nome do álbum
							</label>
							<div className="input__group flex items-center justify-between gap-5">
								<div className="input__group flex items-center flex-1">
									<input
										type="text"
										id="albumName"
										{...register("albumName")}
										placeholder="Boys and Girls"
										className={`border-1 ${
											errors.albumName ? "border-red-500" : "border-pink-500"
										} h-[50px] focus:border-pink-600 px-4 flex-1 outline-0 rounded-br-none rounded-tr-none rounded-md bg-white`}
									/>
									<button
										type="submit"
										className="bg-pink-500 text-2xl px-4 rounded-bl-none rounded-tl-none rounded-md h-[50px] hover:bg-pink-600 duration-300 ease-in-out cursor-pointer font-bold text-center text-white"
									>
										<FontAwesomeIcon
											icon={faPaperPlane}
											className="rotate-[25deg]"
										/>
									</button>
								</div>
								<button
									type="button"
									onClick={getAllAlbums}
									className="bg-pink-500 rounded-md h-[50px] px-4  duration-300 ease-in-out cursor-pointer font-bold text-center text-white"
								>
									Todos
								</button>
							</div>
							{errors.albumName && (
								<span className="text-red-500 text-sm">
									{errors.albumName.message}
								</span>
							)}
						</div>
						<button
							type="submit"
							className="bg-pink-500 text-2xl w-full rounded-md py-3 hover:bg-pink-600 duration-300 ease-in-out cursor-pointer font-bold text-center text-white"
						>
							Salvar
						</button>
					</div>
				)}
				{step === "artist" && (
					<button
						type="button"
						onClick={handleNextStep}
						className="bg-pink-500 text-2xl rounded-md py-3 hover:bg-pink-600 duration-300 ease-in-out cursor-pointer font-bold text-center text-white"
					>
						Próximo
					</button>
				)}
			</form>
			{step === "album" && albumTracks.length > 0 && (
				<section className="preview mr-10 flex flex-col w-full">
					<h2 className="text-2xl font-bold text-pink-500">Pré-visualização</h2>
					<ul className="flex-col gap-4 flex-wrap grid grid-cols-3 h-full overflow-auto p-5 rounded-md">
						{albumTracks.map((track, index) => (
							<li key={index} className="flex items-center gap-4 text-sm">
								<img
									src={track.image}
									alt={track.name}
									width={40}
									height={40}
									className="rounded-full"
								/>
								<div className="flex flex-1 justify-between gap-2">
									<p className="font-bold flex-1 text-xs">{track.name}</p>
									<p className="text-sm text-gray-600">
										{formatDuration(track.duration_ms)}
									</p>
									<a
										href={track.link}
										target="_blank"
										rel="noopener noreferrer"
										className="text-green-500 text-sm"
									>
										<FontAwesomeIcon icon={faSpotify} /> Ouvir agora
									</a>
								</div>
							</li>
						))}
					</ul>
				</section>
			)}
		</main>
	);
};

LayoutFormPreview.propTypes = {
	Layout: PropTypes.string.isRequerid,
};

export default LayoutFormPreview;
