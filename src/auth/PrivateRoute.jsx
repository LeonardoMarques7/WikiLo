import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom"; // Certifique-se de que useLocation está aqui

const PrivateRoute = () => {
	const authToken = localStorage.getItem("authToken");
	const location = useLocation();

	if (!authToken) {
		// Redireciona para a página de login, mantendo a localização original para redirecionar de volta depois
		return <Navigate to="/auth/login" state={{ from: location }} replace />;
	}

	// Se o token existir, permite o acesso à rota protegida
	return <Outlet />;
};

export default PrivateRoute;
