import React, { useState, useEffect, useRef, DOMElement } from 'react';
import ReactDOM from 'react-dom';

export interface NotificationP {
    type: "primary" | "danger" | "info" | "warning",
    message: string,
    dismissable?: boolean,
    elementType?: "div" | "li",
    key?: string
}

interface Notifications {
    messages: NotificationP[],
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

export const Notifications: React.FC<Notifications> = ({ messages, timeout = 1000 }) => {
    // generate IDs to track the notifications of each caller
    const tag = Math.random() * 10000;
    const msgs = messages.map((msg, idx) => ({ key: `${tag}_${idx}`, ...msg }));

    // set up our DOM node
    const [containerEl, setContainerEl] = useState<HTMLElement | null>(document.getElementById('notifications'));

    useEffect(() => {
        if (!containerEl) {
            const el = document.createElement('ul');
            el.id = 'notifications'

            document.body.appendChild(el)
            setContainerEl(el);
        }

        return function cleanup() {
            // remove DOM node if no notifications are left
            // also, run unnecessary check for .current to satisfy TS
            if (containerEl && !containerEl.childNodes.length) {
                document.body.removeChild(containerEl)
                setContainerEl(null);
            }
        }
    })

    // hide notifications

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