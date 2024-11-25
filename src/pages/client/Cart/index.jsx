import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import axios from 'axios';

export default function Cart() {
	const [cartItems, setCartItems] = useState([]); 
	const [totalPrice, setTotalPrice] = useState(0); 
	const [paymentMethod, setPaymentMethod] = useState(""); 
	const navigate = useNavigate(); 

	useEffect(() => {
		const productsList = JSON.parse(localStorage.getItem("products_list")) || [];
		setCartItems(productsList);
		updateTotalPrice(productsList);
	}, []);

	const updateTotalPrice = (products) => {
		const total = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
		setTotalPrice(total);
	};

	const increaseQuantity = (productId) => {
		const updatedItems = cartItems.map((item) =>
			item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
		);
		setCartItems(updatedItems);
		localStorage.setItem("products_list", JSON.stringify(updatedItems));
		updateTotalPrice(updatedItems);
	};

    const decreaseQuantity = (productId) => {
        const updatedItems = cartItems.map((item) => {
            if (item.id === productId && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }if (item.id === productId && item.quantity === 1) {
                return null;
            }
            return item;
        }).filter(item => item !== null); 
    
        setCartItems(updatedItems);
        localStorage.setItem("products_list", JSON.stringify(updatedItems));
    
        updateTotalPrice(updatedItems);
    };

	const handlePayment = async () => {
		const loggedUser = localStorage.getItem("user_logado");
		if (!loggedUser) {
			navigate("/login");
			return;
		}

		const user = JSON.parse(loggedUser); 
		const userId = user.id; 
		const userName = user.name; 
		const userZipCode = user.zipCode; 

		const order = {
			userId,
			userName,
			zipCode: userZipCode,
			products: cartItems,
			paymentMethod,
			totalPrice: totalPrice.toFixed(2),
		};

		try {
			const response = await axios.post("http://localhost:3000/orders", order);

			if (response.status === 201) {
				alert("Pagamento confirmado! Pedido realizado com sucesso.");
				
				localStorage.removeItem("products_list");
				setCartItems([]);
				updateTotalPrice([]);
				
				navigate("/"); 
			} else {
				alert('Houve um erro ao processar o pedido.');
			}
		} catch (error) {
			
			console.error(error);
			alert('Erro ao enviar o pedido. Tente novamente.');
		}
	};

	return (
		<>
			<Header />
			<div className="bg-black text-white min-vh-100 d-flex flex-column align-items-center py-5 pt-5">
				<h1 className="text-warning mb-5">Carrinho de Compras</h1>
				<div className="container">
					<div className="row g-4">
						{cartItems.length > 0 ? (
							cartItems.map((product) => (
								<div className="col-md-12" key={product.id}>
									<div className="card bg-dark text-white shadow-lg rounded-4">
										<div className="row g-0">
											<div className="col-md-2">
												<img
													src={product.imgUrl}
													alt={product.description}
													className="img-fluid rounded-start h-100 w-100"
												/>
											</div>

											<div className="col-md-10">
												<div className="card-body d-flex flex-column justify-content-between">
													<h5 className="card-title text-warning">
														{product.description}
													</h5>
													<p className="card-text text-white-50">
														R$ {product.price} x {product.quantity} = <b className="text-warning">R$ {(product.price * product.quantity).toFixed(2)}</b>
													</p>

													<div className="d-flex justify-content-start align-items-center">
														<button
															type="button"
															className="btn btn-transpararent btn-sm fs-2 text-warning"
															onClick={() => decreaseQuantity(product.id)}
														>
															-
														</button>
														<span className="text-white ms-3 me-3">{product.quantity}</span>
														<button
															type="button"
															className="btn btn-transpararent btn-sm fs-2 text-warning"
															onClick={() => increaseQuantity(product.id)}
														>
															+
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							))
						) : (
							<div className="text-white">Carrinho vazio</div>
						)}
					</div>

					<div className="mt-4 text-white">
						<h4 className="text-warning">Total: R$ {totalPrice.toFixed(2)}</h4>
					</div>

					<div className="mt-4 text-white">
						<h5>Escolha a forma de pagamento:</h5>
						<select
							className="form-select"
							value={paymentMethod}
							onChange={(e) => setPaymentMethod(e.target.value)}
						>
							<option value="">Selecione...</option>
							<option value="credit_card">Cartão de Crédito</option>
							<option value="debit_card">Cartão de Debito</option>
							<option value="pix">Pix</option>
							<option value="bank_transfer">Boleto</option>
						</select>
					</div>

					<div className="mt-4">
						<button
							type="button"
							className="btn btn-warning w-100"
							onClick={handlePayment}
							disabled={!paymentMethod}
						>
							Confirmar Pagamento
						</button>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}
