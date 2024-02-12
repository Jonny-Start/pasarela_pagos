/* eslint-disable react/prop-types */
import { removeProduct, moreUnit, lessUnit } from "./../../redux/cartSlice.js"
import { useSelector, useDispatch } from "react-redux"
import { addMessage } from "./../../redux/appSlice.js"
import "./styles.css";


export function Cart({ totalPrices, onUpdateLocalStorageCart }) {
    const products = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();

    const onRemoveProduct = (id) => {
        dispatch(removeProduct(id));
        dispatch(addMessage({ type: 'success', title: 'Removido', time: 'Justo ahora', body: 'Producto eliminado del carrito' }));
        onUpdateLocalStorageCart();
        return
    }
    const onMoreUnit = (id) => {
        dispatch(moreUnit(id));
        onUpdateLocalStorageCart();
        return;
    }
    const onLessUnit = (id, quantity) => {
        if (quantity === 1) {
            onRemoveProduct(id);
            return
        }
        dispatch(lessUnit(id));
        onUpdateLocalStorageCart();
        return
    }

    return (
        <>
            {(products.length != 0) ? (
                <>
                    {products.map((product, index) => (
                        <div key={index} className="contentCard">
                            <div className="contentImage" style={{ backgroundImage: `url(${product.img})` }}>
                            </div>
                            <div className="contentInfo">
                                <span className="contentP">
                                    <p className="title">
                                        {product.name}
                                    </p>
                                </span>
                                <div className="contentAmount">
                                    <span>
                                        <p> Amount &nbsp;
                                            <i className="fa-solid fa-minus" onClick={() => onLessUnit(product.id, product.quantity)}></i>
                                            {product.quantity}
                                            <i className="fa-solid fa-plus" onClick={() => onMoreUnit(product.id)}></i>
                                        </p>

                                    </span>
                                    <p id="delete" onClick={() => onRemoveProduct(product.id)}>
                                        Eliminar
                                        <i className="fa-solid fa-trash"></i>
                                    </p>
                                </div>

                                <p className="price">
                                    ${product.priceUnit}
                                </p>
                            </div>
                        </div>
                    ))}
                    < div id="contentTotal">
                        <span>
                            Total: $<span> {totalPrices}</span>
                        </span>
                    </div>
                </>
            ) : (
                <h2 className="titlteNotProducts">No tienes productos agregados</h2>
            )}
        </>
    )
}