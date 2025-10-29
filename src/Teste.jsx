import React from "react";
import { useEffect, useState } from "react";
import {
	ArrowRight,
	Drama,
	Guitar,
	Music,
	Palette,
	Search,
} from "lucide-react";

const Teste = () => {
	const [position, setPosition] = useState({ x: 100, y: 100 });
	const [velocity, setVelocity] = useState({ x: 2, y: 3 }); // velocidade em px por frame

	useEffect(() => {
		const update = () => {
			setPosition((prev) => {
				let newX = prev.x + velocity.x;
				let newY = prev.y + velocity.y;
				let newVx = velocity.x;
				let newVy = velocity.y;

				// Verifica colisão horizontal
				if (newX <= 0 || newX >= window.innerWidth - 150) {
					newVx = -newVx;
				}

				// Verifica colisão vertical
				if (newY <= 0 || newY >= window.innerHeight - 150) {
					newVy = -newVy;
				}

				setVelocity({ x: newVx, y: newVy });
				return { x: newX, y: newY };
			});
		};

		const interval = setInterval(update, 16); // ~60fps
		return () => clearInterval(interval);
	}, [velocity]);

	return (
		<>
			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				<div className="absolute h-100 w-100 border-8 border-[#ff7ea034] blur-2xl bg-[#ff7ea034] -top-50 -left-30 rounded-full"></div>
				<div className="absolute h-100 w-100 border-8 border-[#ff7ea034] blur-2xl bg-[#ff7ea034] -bottom-50 -right-25 rounded-full"></div>
			</div>

			<div className="h-svh mx-8">
				<div className="flex w-fit h-full mx-auto  items-center justify-center gap-6 max-w-7xl text-center flex-col">
					<h2 className="text-9xl font-extrabold text-[#E33C68]">Wikilo</h2>
					<h5 className="text-3xl max-w-xl leading-12">
						Onde <strong>artistas independentes</strong> brasileiros ganham voz,
						história e reconhecimento
					</h5>
					<div className="rounded-2xl bg-white w-full shadow-2xl shadow-[#E33C68]/25 max-w-lg border border-[#E33C68]/50 p-2 text-gray-600 flex items-center gap-2.5 focus-within:border-[#E33C68] focus-within:shadow-[#E33C68]/50 focus-within:shadow-lg transition-all duration-300">
						<Search className="text-[#E33C68] w-6 h-6 ml-2.5" />
						<input
							type="text"
							className="flex items-center flex-1 outline-none px-2.5 gap-5"
							placeholder="Procure por um artista..."
						/>
						<button className="bg-[#E33C68] w-fit bg-gradient-to-l to-pink-500 from-[#E33C68] hover:from-[#ff0f4f] ease-in-out duration-500 transition cursor-pointer text-white rounded-[11px] p-2.5 px-5 !font-bold ml-auto">
							Buscar
						</button>
					</div>

					<div className="flex items-center gap-5">
						<button className=" flex cursor-pointer underline underline-offset-4 hover:decoration-transparent hover:bg-[#E33C68] hover:text-white  hover:border-[#E33C68] group hover:px-10  transition-all items-center gap-5 pr-6 text-[#E33C68] font-bold rounded-md p-2.5 px-5">
							Começar Gratuitamente{" "}
						</button>
						<button className="flex items-center underline  underline-offset-4 hover:decoration-transparent group hover:px-10 hover:bg-[#E33C68] hover:text-white gap-5 transition-all cursor-pointer text-[#E33C68]  font-bold rounded-md p-2.5 px-5">
							Ver comunidade
						</button>
					</div>
				</div>
			</div>
			<div className="relative">
				<div className="absolute inset-0 pointer-events-none overflow-hidden">
					<div className="absolute h-100 w-100 border-8 border-[#ff7ea034] blur-2xl bg-[#ff7ea034] -top-50 -right-25 rounded-full"></div>
				</div>
				<div className="h-svh">
					<div className="flex w-fit h-full mx-auto  items-center justify-center gap-6 max-w-7xl text-center flex-col">
						<h2 className="text-9xl font-extrabold text-[#E33C68]">Wikilo</h2>
						<h5 className="text-3xl max-w-xl leading-12">
							Onde <strong>artistas independentes</strong> brasileiros ganham
							voz, história e reconhecimento
						</h5>
						<div className="rounded-2xl bg-white w-full shadow-2xl shadow-[#E33C68]/25 max-w-lg border border-[#E33C68]/50 p-2 text-gray-600 flex items-center gap-2.5 focus-within:border-[#E33C68] focus-within:shadow-[#E33C68]/50 focus-within:shadow-lg transition-all duration-300">
							<Search className="text-[#E33C68] w-6 h-6 ml-2.5" />
							<input
								type="text"
								className="flex items-center flex-1 outline-none px-2.5 gap-5"
								placeholder="Procure por um artista..."
							/>
							<button className="bg-[#E33C68] w-fit bg-gradient-to-l to-pink-500 from-[#E33C68] hover:from-[#ff0f4f] ease-in-out duration-500 transition cursor-pointer text-white rounded-[11px] p-2.5 px-5 !font-bold ml-auto">
								Buscar
							</button>
						</div>

						<div className="flex items-center gap-5">
							<button className=" flex cursor-pointer underline underline-offset-4 hover:decoration-transparent hover:bg-[#E33C68] hover:text-white  hover:border-[#E33C68] group hover:px-10  transition-all items-center gap-5 pr-6 text-[#E33C68] font-bold rounded-md p-2.5 px-5">
								Começar Gratuitamente{" "}
							</button>
							<button className="flex items-center underline  underline-offset-4 hover:decoration-transparent group hover:px-10 hover:bg-[#E33C68] hover:text-white gap-5 transition-all cursor-pointer text-[#E33C68]  font-bold rounded-md p-2.5 px-5">
								Ver comunidade
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default Teste;
