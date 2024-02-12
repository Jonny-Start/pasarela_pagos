/* eslint-disable react/prop-types */

import { useState, useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useSelector, useDispatch } from "react-redux"
import { removeAllMessages } from "./../redux/appSlice.js";




function NotificationsToasts() {

    const NotificationError = ({ open, title, time, body, toggleShow }) => {
        return (
            <Toast show={open} onClose={() => toggleShow()} autohide delay={2000} bg='danger'>
                <Toast.Header>
                    <strong className="me-auto">{title}</strong>
                    <small className="text-muted">{time ? time : 'Justo ahora'}</small>
                </Toast.Header>
                <Toast.Body className={'text-white'}>{body}</Toast.Body>
            </Toast>
        );
    }

    const NotificationSuccess = ({ open, title, time, body, toggleShow }) => {
        return (
            <Toast show={open} onClose={() => toggleShow()} autohide delay={2000} bg='success'>
                <Toast.Header>
                    <strong className="me-auto">{title}</strong>
                    <small className="text-muted">{time ? time : 'Justo ahora'}</small>
                </Toast.Header>
                <Toast.Body className={'text-white'}>{body}</Toast.Body>
            </Toast>
        );
    }

    let notifications = useSelector((state) => state.app.message);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(removeAllMessages());
    }, [dispatch]);


    const [show, setShow] = useState(Array(notifications.length).fill(true));

    const toggleShow = (key) => {
        setShow((prevShow) => {
            const newShow = [...prevShow];
            newShow[key] = !newShow[key];
            return newShow;
        });
    };

    if (notifications === undefined || notifications.length === 0) {
        return null;
    }

    return (
        <section id='notifications' style={{ position: 'fixed', top: '1em', left: '1em', zIndex: 100 }}>
            <ToastContainer className="position-static">
                {notifications.map((notification, key) => {
                    if (notification.type === 'error') {
                        return (
                            <NotificationError
                                key={key}
                                open={show[key]}
                                title={notification.title}
                                time={notification.time}
                                body={notification.body}
                                toggleShow={() => toggleShow(key)}
                            />
                        );
                    } else if (notification.type === 'success') {
                        return (
                            <NotificationSuccess
                                key={key}
                                open={show[key]}
                                title={notification.title}
                                time={notification.time}
                                body={notification.body}
                                toggleShow={() => toggleShow(key)}
                            />
                        );
                    }
                })}
            </ToastContainer>
        </section>
    );
}

export default NotificationsToasts;

// 'Primary',
// 'Secondary',
// 'Success',
// 'Danger',
// 'Warning',
// 'Info',
// 'Light',
// 'Dark',