import React, { useEffect } from "react";
import soundFile from "../../Media/error.mp3";
import "../../Styles/errormodal_successmodal.css";

const ErrorModal = ({ handleError, errorMsg }) => {
    useEffect(() => {
        const sound = new Audio(soundFile);
        sound.play();
    }, []);
    return (
        <div className="errormodal-background">
            <div className="errormodal">
                <h1 className="errormodal-header">Sorry!</h1>
                <p className="errormodal-info">{errorMsg}</p>
                <button
                    className="errormodal-btn"
                    onClick={() => {
                        handleError(false);
                    }}
                    autoFocus
                >
                    ok
                </button>
            </div>
        </div>
    );
};

export default ErrorModal;
