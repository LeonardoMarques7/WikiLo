import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./components/Home";
import Explore from "./components/Explore";
import Footer from "./components/Footer";
import ModeloWiki from "./components/ModeloWiki";
import LayoutFormPreview from "./components/Forms/LayoutFormPreview";
import LayoutFormAlbuns from "./components/Forms/LayoutFormAlbuns";
import Header from "./components/Header";
import FormLogin from "./auth/FormLogin";
import FormRegister from "./auth/FormRegister";
import PrivateRoute from "./auth/PrivateRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import image__background from "./assets/background__primary.png";
import PropTypes from "prop-types";

const Layout = () => {
	return (
		<div className="background__form">
			<Outlet />
			<Footer />
		</div>
	);
};

const LayoutWiki = () => {
	return (
		<>
			{/* Conteúdo */}
			<Header title="Agora vamos criar?" description="" tela="on" />
			<Outlet />
		</>
	);
};

const LayoutWikiAlbum = () => {
	return (
		<>
			<Header
				title="Oii, falaremos agora do álbum :)"
				description="Forneça somente dados sobre os álbun se não houver, pode pular."
				tela="on"
			/>
			<Outlet />
		</>
	);
};

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/auth/login" element={<FormLogin />} />
				<Route path="/auth/register" element={<FormRegister />} />

				{/* Rotas protegidas */}
				<Route element={<PrivateRoute />}>
					<Route
						path="/modelo-wiki"
						element={
							<>
								<Header
									title="Crie sua Wiki"
									description="Selecione o Modelo de Wiki:"
									tela="on"
								/>
								<ModeloWiki />
							</>
						}
					/>
					<Route element={<Layout />}>
						<Route path="/explorar" element={<Explore />} />
						<Route element={<LayoutWiki />}>
							<Route
								path="/modelo-um-wiki"
								element={
									<ErrorBoundary>
										<LayoutFormPreview Layout="1" />
									</ErrorBoundary>
								}
							/>
							<Route
								path="/modelo-dois-wiki"
								element={
									<ErrorBoundary>
										<LayoutFormPreview Layout="2" />
									</ErrorBoundary>
								}
							/>
						</Route>
						<Route element={<LayoutWikiAlbum />}>
							<Route
								path="/wiki/albuns"
								element={<LayoutFormAlbuns Layout="1" />}
							/>
						</Route>
					</Route>
				</Route>
			</Routes>
		</>
	);
}

ErrorBoundary.propTypes = {
	ErrorBoundary: PropTypes.string.isRequerid,
};

export default App;
