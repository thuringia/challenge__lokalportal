import React from 'react';

interface Notification {
    type: "primary" | "danger" | "info" | "warning",
    message: string,
    dismissable?: boolean
}

const Notification: React.FC<Notification> = ({ type, message, dismissable }) => {
    return (
        <div className={`alert alert-${type}`} role="alert">
            {message}
            {!dismissable ? "" : (
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            )}
        </div>
    );
}

export default Notification;