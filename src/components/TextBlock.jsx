import React, {useState} from "react";
import useSpeakToText from "../hook/useSpeakToText";

const VoiceInput = () => {
    const [textInput, setTextInput] = useState('');

    const {isListening, transcript, startListening, stopListening} = useSpeakToText({continuous:true})

    const startStopListening = () => {
        isListening ? stopVoiceinput() : startListening()
    }

    const stopVoiceinput = () => {
        setTextInput(prevVal => prevVal + (transcript.length ? (prevVal.length ? ' ' : '') + transcript : ''))
        stopListening()
    }

    return (
        <div style = {{display: "block", margin: "0 auto", width: "500px", textAlign: "center", marginTop: "150px"}}>
            <textarea
            style={{
                width: "100%",
                height: "300px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                transition: "border-color 0.3s ease",
                resize: "none",
                fontSize: "40px",
                backgroundColor: "#f8f8f8",
                color: "#333",
            }}
            

            disabled= {isListening}
            value = {isListening ? textInput + (transcript.length ? (textInput.length ? ' ' : '') + transcript : '') : textInput}
            onChange = {(e) => {setTextInput(e.target.value)}}
            />
            <button 
            onClick= {() => {startStopListening()}}
            style={{
                backgroundColor: isListening ? "#d62d20" : "#008744",
                color: "white",
                margin: "20px 20px",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "border-color 0.3s ease",
            }}>
                {isListening ? "Stop Listening" : "Speak"}
            </button>
        </div>
    );
};

export default VoiceInput;