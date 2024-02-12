/* eslint-disable react/prop-types */
import './styles.css';
// import Image from './../../assets/img/negocios-en-linea.png';
import Visa from './../../assets/img/visa.svg';
import MasterCard from './../../assets/img/masterCard.svg';

export const ResumPayment = ({ resumDataPayment }) => {
    console.log('resumDataPayment', resumDataPayment);
    const cartProducts = JSON.parse(localStorage.getItem("cartProducts"));
    return (
        <div id='contentResumPayment'>
            <h2>Resumen de pago</h2>
            <h5> Productos</h5>
            {cartProducts.map((product, index) => {
                return (
                    <div className="contentProduct" key={index}>
                        <div className="contentImage" style={{
                            backgroundImage: `url(${product.img})`
                        }}>
                        </div>
                        <div className="contentInfo">
                            <p className="title">
                                {product.name}
                            </p>
                            <p>Cantidad: &nbsp;
                                {product.quantity}
                            </p>
                            <span>
                                <p className="price">
                                    ${product.priceUnit * product.quantity}
                                </p>
                            </span>
                        </div>
                    </div>
                )
            })}
            <div className='contentTotal'>
                <strong>Total: ${cartProducts.reduce((total, product) => {
                    return total + product.priceUnit * product.quantity;
                }, 0).toFixed(2)}</strong>
            </div>

            < div className='contentPayment'>
                <h5> Método de pago</h5>
                <div id='contentData'>
                    <span id='contentImg'>
                        {resumDataPayment.typeCard == 'Visa' ? <img src={Visa} alt="imagen visa" /> : resumDataPayment.typeCard == 'Mastercard' ? <img src={MasterCard} alt="imagen mastercard" /> : ''}
                        <p>{resumDataPayment.typeCard ? resumDataPayment.typeCard : 'CARD'}</p>
                    </span>
                    <div id='contentInformation'>
                        <span>
                            <strong>Número: </strong>
                            <strong>Fecha: </strong>
                            <strong>CVC:</strong>
                            <strong>Nombre:</strong>
                            <strong>Cuotas:</strong>
                        </span>
                        <span>
                            <p>  &nbsp; {resumDataPayment.inputNumberCard ? resumDataPayment.inputNumberCard : 'No definido'}</p>
                            <p>  &nbsp; {resumDataPayment.selectMonth ? resumDataPayment.selectMonth : 'No definido'}/{resumDataPayment.selectYear ? resumDataPayment.selectYear : 'No definido'}</p>
                            <p>  &nbsp; {resumDataPayment.inputCvv ? resumDataPayment.inputCvv : 'No definido'}</p>
                            <p>  &nbsp; {resumDataPayment.inputName ? resumDataPayment.inputName : 'No definido'}</p>
                            <p>  &nbsp; {resumDataPayment.inputFees ? resumDataPayment.inputFees : 'No definido'}</p>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )

}