/* eslint-disable react/prop-types */
import './styles.css'
import imgPSE from './../../assets/img/pse.png';
import MasterCard from './../../assets/img/masterCard.svg';
import Visa from './../../assets/img/visa.svg';
import { useDispatch } from "react-redux"
import { addMessage } from "./../../redux/appSlice.js"
import { setStepData } from "./../../redux/stepPaySlice.js"

export const Method = ({ setUpdateLocalStep, setDisabledButtonPay, setStepInfo }) => {
    const dispatch = useDispatch();

    const onMessage = () => {
        dispatch(addMessage({ type: 'error', title: 'No disponible', time: 'Justo ahora', body: 'El método de pago PSE no está disponible en este momento' }));
    }

    const onChangeStep = () => {
        dispatch(setStepData(3));
        setDisabledButtonPay(true);
        setStepInfo();
        setUpdateLocalStep();
    }

    return (
        <>
            <div id='targetPayMethod'>
                <section className='targetMethod' onClick={() => onChangeStep()}>
                    <div className='contentImg'>
                        <img src={Visa} alt="Imagen de Visa" />
                        <img src={MasterCard} alt="Imagen de MasterCard" />
                    </div>
                    <div className='contentTitle'>
                        <h2>Paga con Visa o Mastercard</h2>
                    </div>
                </section>

                <section className='targetMethod notAvailable' onClick={() => onMessage()}>
                    <div className='contentImg'>
                        <img src={imgPSE} alt="Imgen de PSE" style={{ marginRight: '2em' }} />
                    </div>
                    <div className='contentTitle'>
                        <h2>Paga con PSE</h2>
                    </div>
                </section>
            </div>
        </>
    )
}
