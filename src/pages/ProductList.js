import { useContext, useEffect, useState } from "react";
import ProductCard from "../components/product-components/ProductCard";
import "../assets/scss/Product.scss";
import ModalAddProductModal from "../components/modals/ModalAddNewProduct";
import getProducts from "../hooks/useGetProducts";
import addProducts from "../hooks/usePostProducts";
import { CartContext } from "../context/CartContext";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { BsCart } from "react-icons/bs";

const ProductList = () => {
  const { state, dispatch } = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const endpoint = "products";

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    dispatch({ type: "LOAD_CART", payload: cart });
    updateTotalItems(cart);
  }, [dispatch]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (state.products.length === 0) {
        try {
          const data = await getProducts(endpoint);
          dispatch({ type: "SET_PRODUCTS", payload: data });
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [endpoint, state.products, dispatch]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleAddProduct = async (newProduct) => {
    try {
      const addedProduct = await addProducts(endpoint, newProduct);
      dispatch({ type: "ADD_PRODUCT", payload: addedProduct });
      handleCloseModal();
    } catch (error) {
      setError(error);
    }
  };

  const updateTotalItems = (cart) => {
    const total = cart.reduce((total, item) => total + item.quantity, 0);
    setTotalItems(total);
  };

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateTotalItems(cart);
  };

  const NoProductsMessage = (
    <div className='text-center mt-5'>
      <p>No hay productos para mostrar.</p>
    </div>
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <div className='products-container'>
        <div className='container d-flex justify-content-between align-items-center mb-3'>
          <h4>Lista de productos</h4>
          <div className='d-flex'>
            <button className='btn btn-primary me-3' onClick={handleShowModal}>
              Agregar Producto
            </button>
            <Link to='/products/cart' className='floating-cart-link'>
              <Button variant='primary' className='floating-cart-button'>
                <BsCart size={24} />
                <span className='cart-count'>{totalItems}</span>
              </Button>
            </Link>
          </div>
        </div>
        <hr />
        <div className='container'>
          <div className='row'>
            {state.products.length > 0
              ? state.products.map((item, index) => (
                  <div key={index} className='col mb-3'>
                    <ProductCard
                      product={item}
                      updateCartCount={updateCartCount}
                    />
                  </div>
                ))
              : NoProductsMessage}
          </div>
        </div>
      </div>

      <ModalAddProductModal
        show={showModal}
        handleClose={handleCloseModal}
        onAddProduct={handleAddProduct}
      />
    </>
  );
};

export default ProductList;
