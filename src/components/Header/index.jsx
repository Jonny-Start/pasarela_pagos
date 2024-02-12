/* eslint-disable react/prop-types */
import { useState } from "react";
import { useSelector } from "react-redux"
import "./styles.css";

export const Header = ({ togglePopup }) => {
    const cart = useSelector((state) => state.cart.cart);
    const [activeNavMobile, setActiveNavMobile] = useState('');

    return (
        <header>
            <div className="brand">
                <span className="fa-solid fa-shop"></span>
                <h3>Shopping cart</h3>
            </div>
            <span className="fas fa-bars" id="menuIcon" onClick={() => { setActiveNavMobile(!activeNavMobile ? 'navactive' : '') }}></span>
            <div className={`navbar ${activeNavMobile}`} id="nav" >
                <div className="searchBox">
                    <input type="text" placeholder="Search here..." />
                    <span className="fas fa-search" id="searchIcon"></span>
                </div>
                <ul>
                    <li>
                        <span className="fas fa-home" id="headIcon"></span>
                        <a href="#"> Home </a>
                    </li>
                    <li>
                        <span className="fas fa-question-circle" id="headIcon"></span>
                        <a href="#"> Help </a>
                    </li>
                    <li>
                        <span className="fa fa-user-circle" id="headIcon"></span>
                        <a href="#"> Profile </a>
                    </li>
                    <li onClick={togglePopup}>
                        <span className="fa-solid fa-cart-shopping" id="headIcon">
                            {cart.length > 0 && (
                                <span>
                                    {cart.length}
                                </span>
                            )}
                        </span>
                        <a href="#"> Shopping </a>
                    </li>

                </ul>
            </div>
        </header>
    )
}