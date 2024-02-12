/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux"
import { Cart } from "./../Cart/index.jsx"
import { setStepMethod, removeStepMethod, removeStepData, changeStepPayState } from "./../../redux/stepPaySlice.js"
import { Method } from "./../Method/index.jsx"
import { FormCard } from "./../FormCard/index.jsx"
import { ResumPayment } from "./../ResumPayment/index.jsx"
import { addMessage } from "./../../redux/appSlice.js"
import { removeAllProductsCart } from "./../../redux/cartSlice.js"

import "./styles.css";
import { useEffect, useState } from "react"

export const Popup = ({ togglePopup, onUpdateLocalStorageCart, setUpdateLocalStep }) => {
    const products = useSelector((state) => state.cart.cart);
    const stepPay = useSelector((state) => state.stepPay);
    const [stepInfo, setStepInfo] = useState(false);
    const [disabledButtonPay, setDisabledButtonPay] = useState(false);
    const [resumDataPayment, setResumDataPayment] = useState({});
    const step = stepPay.stepData ? 3 : stepPay.stepMethod ? 2 : 1;
    const dispatch = useDispatch();

    const totalPrices = products.reduce((total, product) => {
        return total + product.priceUnit * product.quantity;
    }, 0).toFixed(2);

    const onUpdateLocalStep = async () => {
        const step = stepPay.stepData ? 3 : stepPay.stepMethod ? 2 : 1;
        if (step == 1) {
            dispatch(setStepMethod(2));
            setUpdateLocalStep();
            return
        } else if (step == 2) {
            dispatch(removeStepData(3));
            setUpdateLocalStep();
            return
        } else if (step == 3) {
            if (stepInfo === true) {
                dispatch(changeStepPayState()); // Elimina todos los pasos de pago
                dispatch(removeAllProductsCart()); // Elimina todos los productos en el carrito
                localStorage.removeItem('cartProducts');
                localStorage.removeItem('step');
                setStepInfo(false); // Oculta el resumen de pago
                dispatch(addMessage({ type: 'success', title: 'COMPRA REALIZADA', time: 'Justo ahora', body: 'Todos los productos en tu carrito fueron pagados' }));
                togglePopup(); // Cierra el popup
                setUpdateLocalStep(); //Da el permiso para actualiza el localStorage
                return
            } else {
                setStepInfo(true);
            }

            return
        }

        // dispatch(setStepMethod(step));
        setUpdateLocalStep();
        return
    }

    const onTogglePopup = () => {
        if (step == 1) {
            togglePopup(); // Cierra el popup
            return
        } else if (step == 2) {
            onUpdateLocalStep(1); // Vuelve al paso 1
            setDisabledButtonPay(false); // Habilita el botón de pagar
            dispatch(removeStepMethod()); // Elimina el paso 2
            setUpdateLocalStep(); // Actualiza el localStorage
            return
        } else if (step == 3) {
            if (stepInfo) {
                setStepInfo(false); // Oculta el resumen de pago
                return;
            }
            setResumDataPayment(''); // Limpia los datos del resumen de pago
            onUpdateLocalStep(2); // Vuelve al paso 2
            dispatch(removeStepData()); // Elimina el paso 3
            setUpdateLocalStep(); // Actualiza el localStorage
            return
        }
    }

    useEffect(() => {
        if (step === 3) {
            setDisabledButtonPay(true);
        }
    }, [step]);

    return (
        <section id="contentPopup">

            <div id="contentCards">

                {step == 1 ?
                    <Cart totalPrices={totalPrices} onUpdateLocalStorageCart={() => onUpdateLocalStorageCart()} />
                    :
                    (step == 2 ?
                        <Method setUpdateLocalStep={() => setUpdateLocalStep()} setDisabledButtonPay={(state) => setDisabledButtonPay(state)} setStepInfo={() => setStepInfo(false)} />
                        :
                        (step == 3 ?
                            stepInfo === true ?
                                <ResumPayment resumDataPayment={resumDataPayment} />
                                :
                                <FormCard setUpdateLocalStep={() => setUpdateLocalStep()} setDisabledButtonPay={() => setDisabledButtonPay()} setResumDataPayment={(data) => setResumDataPayment(data)} />
                            : ''))
                }


                <div id="contentButtons">
                    <button id="cancel" onClick={() => onTogglePopup()} >
                        {step == 1 ? "Cancelar" : "Atrás"}
                    </button>
                    {products.length !== 0 && step != 2 &&
                        <button id="buy" onClick={() => onUpdateLocalStep()} disabled={disabledButtonPay}>
                            Pagar {step == 3 ? `(${totalPrices})` : ''}
                        </button>
                    }

                </div>
            </div>

        </section >
    )
}