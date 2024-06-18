import ProductList from "./pages/ProductList";
import "./assets/scss/main.scss";
import Header from "./sections/header";
import Home from "./pages/home";
import Cart from "./pages/cart";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useTheme } from "./context/ThemeContext";

const App = () => {
  const { isDarkMode } = useTheme();
  return (
    <div className={isDarkMode ? "dark-mode" : ""}>
      <Router>
        <Header/>
        <Routes basename="/#">
          <Route path='products/cart' element={<Cart />} />
          <Route path='products' element={<ProductList />} />
          <Route path='/' element={<Home />} />
        </Routes>
        
      </Router>
    </div>
  );
};

export default App;
