import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import { CartProvider } from "./context/CartContext.jsx"
import CartDrawer from "./components/CartDrawer.jsx"
import Toast from "./components/Toast.jsx"


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <App />
      <CartDrawer />
      <Toast />
    </CartProvider>
  </StrictMode>,
)
