import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import image__error from "../assets/image__error.png";

const PoupDialog = ({ isOpen, onClose }) => {
	useEffect(() => {
		document.body.style.overflow = isOpen ? "hidden" : "";
		document.body.style.paddingRight = isOpen
			? `${window.innerWidth - document.body.offsetWidth}px`
			: "";

		return () => {
			document.body.style.overflow = "";
			document.body.style.paddingRight = "";
		};
	}, [isOpen]);

	if (!isOpen) {
		return null;
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
			<div className="relative bg-white rounded-xl shadow-lg max-w-md w-full p-6 max-h-[300px] flex flex-col justify-end items-center">
				<button
					onClick={onClose}
					className="absolute top-2 right-5 text-2xl text-white bg-pink-500 rounded-lg w-[20px] flex items-center justify-center p-4 h-[20px] hover:text-pink-300 cursor-pointer focus:outline-none"
				>
					<FontAwesomeIcon icon={faXmark} className=""></FontAwesomeIcon>
				</button>

				<div className="text-center">
					<img
						src={image__error}
						className="h-[200px] w-[200px] m-auto object-cover drop-shadow-lg drop-shadow-gray-400"
					/>
					<h2 className="text-xl font-semibold text-pink-700 mb-2">
						Álbum Não Encontrado
					</h2>
					<p className="text-gray-600 text-sm mb-4">
						Que pena! Não encontramos o álbum que você estava procurando. 😔
					</p>
				</div>
			</div>
		</div>
	);
};

export default PoupDialog;
