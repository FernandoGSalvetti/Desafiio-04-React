import { BrowserRouter as Router } from "react-router-dom";
import { FoodProvider } from "./hooks/useFood";
import { ToastContainer } from "react-toastify";

import Routes from "./routes";

import GlobalStyle from "./styles/global";

export const App = () => (
  <Router>
    <FoodProvider>
      <GlobalStyle />
      <Routes />
      <ToastContainer autoClose={3000} />
    </FoodProvider>
  </Router>
);
