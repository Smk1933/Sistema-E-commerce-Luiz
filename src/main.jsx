import "bootstrap/dist/css/bootstrap.min.css";
import './styles/globalStyles.css'

import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import routes from "./routes";

createRoot(document.getElementById("root")).render(
	<StrictMode>

		<RouterProvider router={routes} />
		
		
	</StrictMode>,
);
