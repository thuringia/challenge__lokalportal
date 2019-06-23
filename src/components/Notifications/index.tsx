import React, { useState, useEffect, useRef, DOMElement } from 'react';
import ReactDOM from 'react-dom';

import './styles.css';

export interface NotificationP {
    type: "primary" | "danger" | "info" | "warning",
    message: string,
    dismissable?: boolean,
    elementType?: "div" | "li",
    key?: string
}

interface Notifications {
    messages: NotificationP[],
    position: 'tl' | 'tr' | 'bl' | 'br',
    timeout?: number | 1000
}

export const Notification: React.FC<NotificationP> = ({ type, message, dismissable, elementType = "div", ...rest }) => {
    return (
        React.createElement(elementType, {
            className: `alert alert-${type}`,
            role: "alert",
            ...rest
        },
            <div >
                {message}
                {!dismissable ? "" : (
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                )}
            </div>
        ));
}

export const Notifications: React.FC<Notifications> = ({ messages, position = 'tr', timeout = 3000 }) => {
    const genIDs = arr => arr.map((msg, idx) => ({ key: `${tag}_${idx}`, ...msg }));

    // generate IDs to track the notifications of each caller
    const tag = Math.random() * 10000;
    const [msgs, setMsgs] = useState(genIDs(messages))

    // set up our DOM node
    const [containerEl, setContainerEl] = useState<HTMLElement | null>();
    const containerElRef = useRef<HTMLElement | null>(document.getElementById('notifications'));

    useEffect(() => {
        if (!containerElRef.current && msgs.length) {
            const cEl = document.createElement('div');
            cEl.id = 'notifications-container';
            cEl.className = "container";

            const el = document.createElement('ul');
            el.id = 'notifications';
            el.className = `list-unstyled position-absolute ${position}`;
            el.setAttribute('aria-live', 'polite');
            el.setAttribute('aria-atomic', 'true');

            cEl.appendChild(el);
            document.body.appendChild(cEl);
            containerElRef.current = el;
            setContainerEl(el);
        }

        return function cleanup() {
            // remove DOM node if no notifications are left
            // also, run unnecessary check for .current to satisfy TS
            if (containerElRef.current && containerElRef.current.parentElement && !containerElRef.current.childNodes.length) {
                document.body.removeChild(containerElRef.current.parentElement)
                containerElRef.current = null;
                setContainerEl(null);
            }
        }
    }, [msgs])

    // update notifications
    useEffect(() => { setMsgs(genIDs(messages)) }, [messages])

    // hide notifications
    const intervalRef = useRef<number | Timeout>();
    useEffect(() => {
        const id = setTimeout(() => {
            setMsgs([])
        }, timeout);
        intervalRef.current = id;
        return () => {
            clearInterval(intervalRef.current);
        };
    }, [msgs]);


    // show Notifications
    // 
    return (
        containerEl ?
            ReactDOM.createPortal(
                <>{msgs.map(msg => { console.log(msg); return (<Notification elementType="li" {...msg} />) })}</>
                , containerEl) :
            <></>
    );
}

export default Notifications;