import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Explore from "./components/Explore";
function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/explorar" element={<Explore />} />
			</Routes>
		</>
	);
}

export default App;
