import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";


export default function RegisterProducts() {
  const [imgUrl, setImgUrl] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1); 
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imgUrl || !description || !price) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const newProduct = {
      imgUrl,
      description,
      price: Number.parseFloat(price),
      quantity,
    };

    try {
      const response = await axios.post("http://localhost:3000/products", newProduct);
      if (response.status === 201) {
        alert("Produto cadastrado com sucesso!");
        navigate("/admin"); 
      }
    } catch (error) {
      alert("Erro ao cadastrar o produto. Tente novamente.");
      console.error("Erro ao cadastrar produto:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-black text-white min-vh-100 d-flex flex-column align-items-center py-5 pt-5">
        <h1 className="text-warning mb-5">Cadastrar Novo Produto</h1>
        <div className="container d-flex flex-column align-items-center ">
          <form onSubmit={handleSubmit} className="col-md-5" >
            <div className="mb-3">
              <label htmlFor="imgUrl" className="form-label text-warning">
                URL da Imagem
              </label>
              <input
                type="text"
                className="form-control"
                id="imgUrl"
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label text-warning">
                Descrição
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="price" className="form-label text-warning">
                Preço (R$)
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <button type="submit" className="btn btn-warning w-100">
                Cadastrar Produto
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
