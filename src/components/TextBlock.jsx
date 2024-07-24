import React, { useState } from "react";
import useSpeakToText from "../hook/useSpeakToText";
import Alert from 'react-bootstrap/Alert';

const VoiceInput = () => {
    const [textInput, setTextInput] = useState('');
    const [fontSize, setFontSize] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const { isListening, transcript, startListening, stopListening } = useSpeakToText({ continuous: true, lang: "th-TH" });

    const startStopListening = () => {
        if (fontSize === '') {
            setShowAlert(true);
            return;
        }
        setShowAlert(false);
        isListening ? stopVoiceinput() : startListening();
    };

    const stopVoiceinput = () => {
        setTextInput(prevVal => prevVal + (transcript.length ? (prevVal.length ? ' ' : '') + transcript : ''));
        stopListening();
    };

    const handleFontSizeChange = (event) => {
        setFontSize(event.target.value);
        setShowAlert(false);
    };

    return (
        <div style={{ display: "block", margin: "0 auto", width: "500px", textAlign: "center", marginTop: "80px" }}>
            {showAlert && (
                <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                    กรุณาเลือกขนาดตัวอักษร
                </Alert>
            )}
            <textarea
                style={{
                    width: "100%",
                    height: "300px",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    transition: "border-color 0.3s ease",
                    resize: "none",
                    fontSize: fontSize || '16px',
                    fontFamily: "'Sarabun', sans-serif",
                    backgroundColor: "#f8f8f8",
                    color: "#333",
                }}
                disabled={isListening}
                value={isListening ? textInput + (transcript.length ? (textInput.length ? ' ' : '') + transcript : '') : textInput}
                onChange={(e) => { setTextInput(e.target.value); }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: "20px", gap: "20px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <button
                        onClick={() => { startStopListening(); }}
                        style={{
                            backgroundColor: isListening ? "#d62d20" : "#008744",
                            color: "white",
                            padding: "10px 20px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            transition: "border-color 0.3s ease",
                        }}>
                        {isListening ? "Stop Listening" : "Speak"}
                    </button>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <select
                        onChange={handleFontSizeChange}
                        value={fontSize}
                        style={{
                            backgroundColor: "#008744",
                            color: "white",
                            padding: "10px 20px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            transition: "border-color 0.3s ease",
                            textAlign: "",
                        }} >
                        <option value="" disabled hidden>ขนาดตัวอักษร</option>
                        <option value="12px">12</option>
                        <option value="16px">16</option>
                        <option value="20px">20</option>
                        <option value="24px">24</option>
                        <option value="26px">26</option>
                        <option value="28px">28</option>
                        <option value="36px">36</option>
                        <option value="40px">40</option>
                        <option value="48px">48</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default VoiceInput;
