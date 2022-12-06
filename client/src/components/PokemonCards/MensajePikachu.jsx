import React from "react";
import pikachumensajetres from "../../img/pikachumensajetres.png"
import "./MensajePikachu.css"

export default function MensajePikachu(){
    return (
        <div className="contenedormensajepikachu">
            <img className="mensajepikachu" src={pikachumensajetres} alt="" />
        </div>
    )
}