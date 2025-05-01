import React from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		// Atualiza o estado para que a próxima renderização mostre a UI de fallback.
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		// Você também pode registrar o erro em um serviço de relatório de erros
		console.error("Erro capturado pelo ErrorBoundary", error, errorInfo);
		// logErrorToMyService(error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			// Você pode renderizar qualquer UI de fallback personalizada
			return <h1>Algo deu errado.</h1>;
		}

		return this.props.children;
	}
}

ErrorBoundary.propTypes = {
	children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
