import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [error, setError] = useState("");

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(""); 

		try {
			const api = await axios.get(
				`http://localhost:3000/users?email=${formData.email}`,
			);

			if (api.data.length === 0) {
				throw new Error();
			}

			const user = api.data[0];
			if (user.password !== formData.password) {
				throw new Error();
			}

			localStorage.setItem("user_logado", JSON.stringify(user));

			navigate("/");
		} catch (error) {
			setError("Email ou Senha incorretos");
		}
	};

	return (
		<div
			className="bg-black d-flex justify-content-center align-items-center"
			style={{ height: "100vh" }}
		>
			<div className="col-md-4">
				<div className="card shadow-lg p-4 bg-dark text-white rounded-4">
					<h3 className="text-center mb-4 text-warning">Login</h3>
					{error && <div className="alert alert-danger">{error}</div>}
					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<input
								type="email"
								name="email"
								className="form-control bg-secondary text-dark border-0 shadow-sm rounded-3 py-2 px-3 mb-3"
								placeholder="Email"
								value={formData.email}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="mb-3">
							<input
								type="password"
								name="password"
								className="form-control bg-secondary text-dark border-0 shadow-sm rounded-3 py-2 px-3 mb-3"
								placeholder="Senha"
								value={formData.password}
								onChange={handleChange}
								required
							/>
						</div>

						<button
							type="submit"
							className="btn w-100 btn-warning text-dark font-weight-bold py-2 rounded-3"
						>
							Entrar
						</button>
						<p className="mt-3">
							Ainda não possui conta? 
							<Link to="/cadastro" className="text-primary ms-1 text-warning fw-bold">
								Clique aqui
							</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
