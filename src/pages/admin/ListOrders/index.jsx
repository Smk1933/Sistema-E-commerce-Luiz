import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

export default function ListOrders() {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [selectedOrder, setSelectedOrder] = useState(null); 

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3000/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
      alert("Erro ao buscar pedidos.");
    }
  };

  useEffect(() => {
    fetchOrders(); 
  }, []);

  const handleShow = (order) => {
    setSelectedOrder(order); 
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false); 
    setSelectedOrder(null);
  };

  return (
    <>
      <Header />
      <div className="bg-black text-white min-vh-100 d-flex flex-column align-items-center py-5 pt-5">
        <h1 className="text-warning mb-5">Lista de Pedidos</h1>
        <div className="container">
          {orders.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-dark table-striped">
                <thead>
                  <tr>
                    <th scope="col">ID do Pedido</th>
                    <th scope="col">Usuário</th>
                    <th scope="col">Forma de Pagamento</th>
                    <th scope="col">Ações</th>
                    <th scope="col">Preço Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.userName}</td>
                      <td>{order.paymentMethod}</td>
                      <td>
                        <button type="button"
                          className="btn btn-info"
                          onClick={() => handleShow(order)}
                        >
                          Ver Produtos
                        </button>
                      </td>
                      <td>R$ {order.totalPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-white">Nenhum pedido encontrado.</div>
          )}
        </div>
      </div>

      {selectedOrder && (
        <div
          className={`modal fade ${showModal ? "show" : ""}`}
          id="orderModal"
          tabIndex="-1"
          aria-labelledby="orderModalLabel"
          aria-hidden="true"
          style={{ display: showModal ? "block" : "none" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="orderModalLabel">
                  Produtos do Pedido {selectedOrder.id}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleClose}
                />
              </div>
              <div className="modal-body">
                <h5>Produtos:</h5>
                <ul>
                  {selectedOrder.products.map((product, index) => (
                    <li key={product.id} className="mb-3">
                      <div>
                        <strong>{product.description}</strong>
                        <p>Preço: R$ {product.price}</p>
                        <p>Quantidade: {product.quantity}</p>
                        <p>
                          Subtotal: R$ {(product.price * product.quantity).toFixed(2)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
