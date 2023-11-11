import React from "react";
import { ImCross } from "react-icons/im";

const NotificationModal = ({ notifications }) => {
    return (
        <div className="notification-model">
            {notifications.length ? (
                notifications.map((notification) => {
                    return (
                        <div>
                            <h2 className="sender-name">
                                {notification.sender}
                            </h2>
                            <p className="message">
                                {notification.messageContent}
                                <span className="timestamp">
                                    {notification.timeStamp}
                                </span>
                            </p>
                            <ImCross />
                        </div>
                    );
                })
            ) : (
                <p>did't have any notificatio</p>
            )}
        </div>
    );
};

export default NotificationModal;
