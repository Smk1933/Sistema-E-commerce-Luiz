import React from "react";
import { Link } from "react-router-dom";
import facebookIcon from "../../assets/facebook.svg";
import twitterIcon from "../../assets/twitter.svg";
import instagramIcon from "../../assets/instagram.svg";

export default function Footer() {
	return (
		<footer className="bg-dark text-white py-4 pt-5">
			<div className="container">
				<div className="row">
					<div className="col-md-3">
						<h5 className="text-warning">Links Rápidos</h5>
						<ul className="list-unstyled">
							<li>
								<Link to="/sobre" className="text-white text-decoration-none">
									Sobre nós
								</Link>
							</li>
							<li>
								<Link to="/contato" className="text-white text-decoration-none">
									Contato
								</Link>
							</li>
							<li>
								<Link
									to="/politica-de-privacidade"
									className="text-white text-decoration-none"
								>
									Política de Privacidade
								</Link>
							</li>
						</ul>
					</div>

					{/* Seção de Contato */}
					<div className="col-md-3">
						<h5 className="text-warning">Contato</h5>
						<ul className="list-unstyled">
							<li>
								<a
									href="mailto:suporte@techhub.com"
									className="text-white text-decoration-none"
								>
									suporte@techhub.com
								</a>
							</li>
							<li>
								<a
									href="tel:+5511999999999"
									className="text-white text-decoration-none"
								>
									(11) 99999-9999
								</a>
							</li>
						</ul>
					</div>

					{/* Seção de Redes Sociais */}
					<div className="col-md-3">
						<h5 className="text-warning">Redes Sociais</h5>
						<div className="d-flex">
							<a
								href="https://www.facebook.com"
								target="_blank"
								rel="noopener noreferrer"
							>
								<img
									src={facebookIcon}
									alt="Facebook"
									className="me-3"
									style={{ width: "24px", height: "24px" }}
								/>
							</a>
							<a
								href="https://www.twitter.com"
								target="_blank"
								rel="noopener noreferrer"
							>
								<img
									src={twitterIcon}
									alt="Twitter"
									className="me-3"
									style={{ width: "24px", height: "24px" }}
								/>
							</a>
							<a
								href="https://www.instagram.com"
								target="_blank"
								rel="noopener noreferrer"
							>
								<img
									src={instagramIcon}
									alt="Instagram"
									className="me-3"
									style={{ width: "24px", height: "24px" }}
								/>
							</a>
						</div>
					</div>

					{/* Seção de Copyright */}
					<div className="col-md-3">
						<h5 className="text-warning">TechHub</h5>
						<p>
							&copy; {new Date().getFullYear()} TechHub. Todos os direitos
							reservados.
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
