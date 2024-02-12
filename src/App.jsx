import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addAllProducts } from "./redux/productsSlice.js"
import { changeLoading } from "./redux/appSlice.js"
import NotificationsToasts from './components/NotificationsToasts.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Header } from "./components/Header/index.jsx";
import { Popup } from "./components/Popup/index.jsx";
import { Products, ProductsLoading } from "./components/Products/index.jsx"
import { addAllProductsCart } from "./redux/cartSlice.js"
import { changeStepPayState } from "./redux/stepPaySlice.js"



function App() {
  const appLoading = useSelector((state) => state.app.loading);
  const dispatch = useDispatch();
  const [updateLocalProducts, setUpdateLocalProducts] = useState(false); //Si esta en true, actualiza el localStorage
  const [updateLocalStep, setUpdateLocalStep] = useState(false); //Si esta en true, actualiza el localStorage
  const cart = useSelector((state) => state.cart.cart);
  const stepPay = useSelector((state) => state.stepPay);

  useEffect(() => {

    dispatch(changeLoading(true));

    const cartProducts = JSON.parse(localStorage.getItem("cartProducts"));
    dispatch(addAllProductsCart(cartProducts ? cartProducts : []));

    const stepPay = JSON.parse(localStorage.getItem("step"));
    dispatch(changeStepPayState(stepPay ? stepPay : []));

    const step = stepPay && stepPay.stepData ? 3 : (stepPay && stepPay.stepMethod ? 2 : 1);
    if (step > 1) {
      togglePopup();
    }


    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => dispatch(addAllProducts(data)))
      .catch(err => console.error(err))
      .finally(() => dispatch(changeLoading(false)))
  }, []);

  // Activar popup
  const [displayPopUp, setDisplayPopUp] = useState(false);
  const togglePopup = () => {
    setDisplayPopUp(!displayPopUp);
  };

  // Actualizar el carrito en el localStorage
  useEffect(() => {
    if (updateLocalProducts) {
      localStorage.setItem("cartProducts", JSON.stringify(cart));
      setUpdateLocalProducts(false);
    }
  }, [updateLocalProducts]);

  // Actualizar el step en el localStorage
  useEffect(() => {
    if (updateLocalStep) {
      localStorage.setItem("step", JSON.stringify(stepPay));
      setUpdateLocalStep(false);
    }
  }, [updateLocalStep]);

  return (
    <>
      <div>
        <NotificationsToasts />
        <Header togglePopup={togglePopup} />
        {!appLoading ? <Products onUpdateLocalStorageCart={() => setUpdateLocalProducts(true)} /> : <ProductsLoading />}
        {displayPopUp &&
          <Popup togglePopup={togglePopup}
            onUpdateLocalStorageCart={() => setUpdateLocalProducts(true)}
            setUpdateLocalStep={() => setUpdateLocalStep(true)}
          />
        }
      </div>
    </>
  )
}

export default App
// https://jsonplaceholder.typicode.com/users/1