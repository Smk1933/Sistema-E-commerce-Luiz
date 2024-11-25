import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/shared/Home";
import Register from "../pages/shared/register";
import Login from "../pages/shared/login";
import Cart from "../pages/client/Cart";
import RegisterProducts from "../pages/admin/RegisterProducts";
import ListOrders from "../pages/admin/ListOrders";
import NotFound from "../pages/NotFound"; 
import ModAdmin from "../components/ModAdmin";

const routes = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/cadastro",
		element: <Register /> ,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/carrinho",
		element: <PrivateRoute component={<Cart />} />,
	},
	{
		path: "/admin/criarProduto",
		element: <PrivateRoute component={<RegisterProducts />} isAdminRequired={true} />,
	},
	{
		path: "/admin/ListarPedidos",
		element: <PrivateRoute component={<ListOrders />} isAdminRequired={true} />,
	},
	{
		path: "/notfound",
		element: <NotFound />,
	},
]);

function PrivateRoute({ component, isAdminRequired }) {
	const user = JSON.parse(localStorage.getItem("user_logado")); 

	if (!user) {
		return <Navigate to="/login" />;
	}

	if (isAdminRequired && !user.isAdmin) {
		return <Navigate to="/notfound" />;
	}

	return (
		<>
			{user.isAdmin && <ModAdmin />}
			{component}
		</>
	);
}

export default routes;
