/* eslint-disable react/prop-types */
import { useState } from 'react';
import MasterCard from './../../assets/img/masterCard.svg';
import Visa from './../../assets/img/visa.svg';
import './styles.css';
import { useDispatch, useSelector } from "react-redux"
import { setStepData } from "./../../redux/stepPaySlice.js"

const getCardType = (number) => {
    // visa
    var re = new RegExp("^4");
    if (number.match(re) != null)
        return "Visa";

    // American express
    re = new RegExp("^3[47]");
    if (number.match(re) != null)
        return "American express";

    // Discover
    re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
    if (number.match(re) != null)
        return "Discover";

    // Diners
    re = new RegExp("^36");
    if (number.match(re) != null)
        return "Diners";

    // Diners
    re = new RegExp("^3(?:0[0-59]{1}|[689])[0-9]{0,}");
    if (number.match(re) != null)
        return "Diners";

    // Diners - Carte Blanche
    re = new RegExp("^30[0-5]");
    if (number.match(re) != null)
        return "Diners - Carte Blanche";

    // JCB
    re = new RegExp("^35(2[89]|[3-8][0-9])");
    if (number.match(re) != null)
        return "JCB";

    // JCB
    re = new RegExp("^(?:2131|1800|35)[0-9]{0,}$");
    if (number.match(re) != null)
        return "JCB";

    // JCB
    re = new RegExp("^30");
    if (number.match(re) != null)
        return "JCB";

    // Visa Electron
    re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
    if (number.match(re) != null)
        return "Visa Electron";

    // Maestro
    re = new RegExp("^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)");
    if (number.match(re) != null)
        return "Maestro";

    // Maestro
    re = new RegExp("^(5[06789]|6)[0-9]{0,}");
    if (number.match(re) != null)
        return "Maestro";

    // Dankort
    re = new RegExp("^(5019)");
    if (number.match(re) != null)
        return "Dankort";

    // Interpayment
    re = new RegExp("^(636)");
    if (number.match(re) != null)
        return "Interpayment";

    // Unionpay
    re = new RegExp("^(62|88)");
    if (number.match(re) != null)
        return "Unionpay";

    // Mastercard
    if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number) || number.startsWith('5'))
        return "Mastercard";

    return "";

}

export const FormCard = ({ setUpdateLocalStep, setDisabledButtonPay }) => {
    const dispatch = useDispatch();
    const { stepData = {} } = useSelector((state) => state.stepPay);
    const {
        inputNumberCard = "",
        selectMonth = "",
        selectYear = "",
        inputCvv = "",
        inputName = "",
        selectTypeDocument = "",
        inputNumberDocument = "",
        inputFees = "",
        inputCheck = false
    } = stepData;

    const [typeCard, setTypeCard] = useState(inputNumberCard ? getCardType(inputNumberCard) : '');
    const [inputError, setInputError] = useState({
        inputNumberCard: false,
        selectMonth: false,
        selectYear: false,
        inputCvv: false,
        inputName: false,
        selectTypeDocument: false,
        inputNumberDocument: false,
        inputFees: false
    });

    const [formData, setFormData] = useState({
        inputNumberCard,
        selectMonth,
        selectYear,
        inputCvv,
        inputName,
        selectTypeDocument,
        inputNumberDocument,
        inputFees,
        inputCheck
    });

    const handleDataForm = async (nameObject, e) => {
        // console.time('time');
        let newValue = e.target.value;
        if (nameObject === 'inputNumberCard') {
            validateTypeCard(newValue);
            newValue = addSpaces(newValue);
        }
        setFormData(prevFormData => ({ ...prevFormData, [nameObject]: newValue }));
        dispatch(setStepData({ ...formData, [nameObject]: newValue }));
        setUpdateLocalStep();
        setInputError(prevInputError => ({ ...prevInputError, [nameObject]: false }));
        // console.timeEnd('time');
    };

    const handleInputCheckChange = (e) => {
        // const validateInput = (value, minLength) => value && value.length === minLength ? value : true;

        // const inputNumberCard = validateInput(formData.inputNumberCard, 19);
        // const selectMonth = formData.selectMonth;
        // const selectYear = formData.selectYear;
        // const inputCvv = validateInput(formData.inputCvv, 3);
        // const inputName = formData.inputName;
        // const selectTypeDocument = validateInput(formData.selectTypeDocument, 10);
        // const inputNumberDocument = formData.inputNumberDocument;
        // const inputFees = formData.inputFees;

        // const emptyInput = {
        //     inputNumberCard,
        //     selectMonth,
        //     selectYear,
        //     inputCvv,
        //     inputName,
        //     selectTypeDocument,
        //     inputNumberDocument,
        //     inputFees
        // };

        // if (Object.values(emptyInput).some(val => val === true)) {
        //     setInputError(emptyInput);
        //     e.preventDefault();
        //     e.stopPropagation();
        //     return false;
        // }

        setFormData(prevFormData => ({ ...prevFormData, inputCheck: !prevFormData.inputCheck }));
        setDisabledButtonPay(e.target.checked);

    }

    const validateTypeCard = (value) => {
        const typeCard = getCardType(value);
        setTypeCard(typeCard);
    }

    function addSpaces(cadena) {
        return cadena.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
    }

    function filterData(value, longMax, typeData) {
        let modifiedValue = '';

        if (typeData === 'texto') {
            modifiedValue = value.replace(/[^a-zA-Z]/g, '').substring(0, longMax);
        } else if (typeData === 'numero') {
            modifiedValue = value.replace(/[^0-9]/g, '').substring(0, longMax);
        }

        return modifiedValue;
    }

    return (
        <div>
            <h2>Metodos de pago</h2>
            <div className="contentImg">
                <img src={MasterCard} alt="imagen visa" />
                <img src={Visa} alt="imagen mastercard" />
            </div>

            <label htmlFor="number">Número de la tarjeta
                <input type="text" id='number' name='numberCard' className={`${inputError.inputNumberCard == true && 'errorInput'}`} required pattern="[0-9]*" maxLength="19" autoComplete="cc-number" value={formData.inputNumberCard} onChange={(e) => (e.target.value = filterData(e.target.value, 19, 'numero'), handleDataForm('inputNumberCard', e))} />
                {typeCard == 'Visa' ? <img src={Visa} alt="Visa" /> : typeCard == 'Mastercard' ? <img src={MasterCard} alt="Mastercard" /> : ''}
            </label>

            <div id='contentDataCard'>
                <label htmlFor="month">Vencimiento
                    <select name="month" id="month" required value={formData.selectMonth} onChange={(e) => handleDataForm('selectMonth', e)}>
                        <option value="" disabled>Mes</option>
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                    </select>
                    <select name="year" id="year" required value={formData.selectYear} onChange={(e) => handleDataForm('selectYear', e)}>
                        <option value="" disabled>Año</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                        <option value="31">31</option>
                        <option value="32">32</option>
                        <option value="33">33</option>
                        <option value="34">34</option>
                        <option value="35">35</option>
                    </select>
                </label>

                <label htmlFor="cvc">CVC (Código de seguridad)
                    <input type="text" name="cvc" id="cvc" required pattern="[0-9]*" maxLength="4" autoComplete="cc-csc" value={formData.inputCvv} onChange={(e) => (e.target.value = filterData(e.target.value, 3, 'numero'), handleDataForm('inputCvv', e))} />
                </label>
            </div>

            <label htmlFor="name">Nombre en la tarjeta
                <input type="text" name='name' id='name' required autoComplete="cc-name" value={formData.inputName} onChange={(e) => handleDataForm('inputName', e)} />
            </label>

            <label htmlFor="typeDocument">Identificación de la tarjeta
                <select name="typeDocument" id="typeDocument" required value={formData.selectTypeDocument} onChange={(e) => handleDataForm('selectTypeDocument', e)}>
                    <option value="" disabled>Tipo</option>
                    <option value="CC">CC - Cédula de Ciudadanía</option>
                    <option value="CE">CE - Cédula de Extranjería</option>
                    <option value="NIT">NIT - Número de Identificación Tributaria</option>
                    <option value="PP">PP - Pasaporte</option>
                    <option value="TI">TI - Tarjeta de Identidad</option>
                    <option value="DNI">DNI - Documento Nacional de Identidad</option>
                    <option value="RG">RG - Carteira de Identidade / Registro Geral</option>
                    <option value="OTHER">Otro</option>
                </select>
                <input type="text" required name="numberDocument" id="numberDocument" pattern="[0-9]*" maxLength="10" placeholder='Número de documento' value={formData.inputNumberDocument} onChange={(e) => (e.target.value = filterData(e.target.value, 10, 'numero'), handleDataForm('inputNumberDocument', e))} />
            </label>

            <label htmlFor="fees">Número de cuotas
                <select name="fees" id="fees" required value={formData.inputFees} onChange={(e) => handleDataForm('inputFees', e)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                    <option value="32">32</option>
                    <option value="33">33</option>
                    <option value="34">34</option>
                    <option value="35">35</option>
                    <option value="36">36</option>
                </select>
            </label>

            <label htmlFor='terms'>Confirmo que he leído y comprendido los términos y condiciones, así como la política de privacidad, para proceder con este pago.
                <input type="checkbox" required name='terms' id='terms' value={formData.inputCheck} onChange={handleInputCheckChange} />
            </label>
        </div>
    );
};
