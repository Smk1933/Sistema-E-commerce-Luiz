import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useNavigate } from "react-router-dom";

export default function Home() {
	const [products, setProducts] = useState([]); 
	const [loading, setLoading] = useState(true); 
	const [error, setError] = useState(""); 
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get("http://localhost:3000/products")
			.then((response) => {
				setProducts(response.data); 
				setLoading(false); 
			})
			.catch((err) => {
				setError("Erro ao carregar produtos");
				setLoading(false); 
			});
	}, []);

	const handleBuy = (product) => {
		const loggedUser = localStorage.getItem("user_logado");
		if (!loggedUser) {
			navigate("/login");
			return;
		}

		const productList = JSON.parse(localStorage.getItem("products_list")) || [];

		const existingProductIndex = productList.findIndex(
			(item) => item.id === product.id,
		);

		if (existingProductIndex >= 0) {
			productList[existingProductIndex].quantity += 1;
		} else {
			productList.push({ ...product, quantity: 1 });
		}

		localStorage.setItem("products_list", JSON.stringify(productList));
	};
	return (
		<>
			<Header />
			<div className="bg-black text-white min-vh-100 d-flex flex-column align-items-center py-5 pt-5">
				<h1 className="text-warning mb-5">Produtos em Destaque</h1>
				<div className="container">
					<div className="row g-4">
						{products.map((product) => (
							<div className="col-md-3" key={product.id}>
								<div className="card bg-dark text-white shadow-lg rounded-4">
									<img
										src={product.imgUrl} 
										alt="produto"
										className="card-img-top rounded-top-4"
									/>
									<div className="card-body">
										<h5 className="card-title text-warning text-truncate">
											{product.description}
										</h5>
										<p className="card-text text-white-50">
											R$ {product.price}
										</p>
										<button
											type="button"
											className="btn btn-warning text-dark w-100 rounded-3"
											onClick={() => handleBuy(product)} 
										>
											Comprar
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}
