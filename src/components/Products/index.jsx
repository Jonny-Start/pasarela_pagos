/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux"
import { addProduct, moreUnit } from "./../../redux/cartSlice.js"
import { addMessage } from "./../../redux/appSlice.js"
import "./styles.css"

/**
 * Generates a star rating component based on the given rate.
 *
 * @param {Object} props - The component props.
 * @param {number} props.rate - The rating value.
 * @returns {JSX.Element} The star rating component.
 */

const GenerateStars = ({ rate }) => {
    let stars = '';

    /**
     * Variable que almacena la puntuación redondeada.
     * @type {number}
     */
    const puntuacionRedondeada = Math.min(Math.max(Math.round(rate), 0), 5);
    for (let i = 1; i <= 5; i++) {
        if (i <= puntuacionRedondeada) {
            stars += '⭐';
        } else {
            stars += '☆';
        }
    }

    return (
        <div id="stars">{stars}</div>
    );
}

/**
 * Componente que muestra una lista de productos en estado de carga.
 * @returns {JSX.Element} Elemento JSX que representa la sección de productos en estado de carga.
 */
export const ProductsLoading = () => {

    const allTargets = () => {
        let targets = [];
        for (let i = 0; i <= 8; i++) {
            targets.push(
                <li key={i} className="targetProduct targetLoading"></li>
            );
        }
        return targets;
    }

    return (
        <section id="contentProducts">
            <ul>
                {allTargets()}
            </ul>
        </section>
    )
}

export const Products = ({ onUpdateLocalStorageCart }) => {

    const products = useSelector((state) => state.products);
    const cart = useSelector((state) => state.cart.cart);

    const dispatch = useDispatch();

    const onAddCart = (id, name, img, priceUnit) => {

        let product = cart.find((product) => product.id === id);
        product = product ? product.id : product;
        if (product != undefined) {
            onMoreUnit(id)
            dispatch(addMessage({ type: 'success', title: 'Correcto', time: 'Justo ahora', body: 'Producto sumado al carrito' }));
        } else {
            dispatch(addProduct({ id, name, img, priceUnit, quantity: 1 }));
            dispatch(addMessage({ type: 'success', title: 'Correcto', time: 'Justo ahora', body: 'Producto añadido al carrito' }));
        }

        onUpdateLocalStorageCart();
        return;
    }

    const onMoreUnit = (id) => {
        dispatch(moreUnit(id));
        onUpdateLocalStorageCart();
        return;
    }

    return (
        <section id="contentProducts">
            <ul>
                {products.map((product, index) => (
                    <li key={index} className="targetProduct" style={{ backgroundImage: `url(${product.image})` }}>
                        <span id="contentTitle">
                            <h4>{product.title}</h4>
                        </span>
                        {/* <span id="spanDiscount">10% </span> */}

                        <span id="contentPrice">
                            <p id="spanPrice">
                                ${product.price}
                            </p>
                            <span id="contentStar">
                                <GenerateStars rate={product.rating.rate} />
                            </span>
                        </span>
                        <div className="descriptionProduct">
                            <span>
                                <h5>{product.title}</h5>
                            </span>
                            <span>
                                <p>{product.description}</p>
                            </span>
                            <button onClick={() => onAddCart(product.id, product.title, product.image, product.price)}>
                                Add to car
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </section >
    )
}