import React, { useState } from "react";
import '../css/Form.css';

//const Form = ({value, onChange, onCreate, onKeyPress}) => {
const Form = ({onCreate}) => {
//Hook 사용으로 수정
    const [input, setInput] = useState(""); 

    const handleChange = (event) => {   //input값 hook으로 관리
        setInput(event.target.value);   //값 입력 시 input에 저장됨.
    }
    const handleKeyPress = (event) => {
        if(event.key === "Enter"){ //엔터 눌렀을 시 처리 과정
            onCreate(input);    //현재 값 input에 담겼음. onCreate에 전달
            setInput("");       //input값 초기화
        }
    }

    return (
        <div className="form">
            <input value={input} placeholder="오늘 할 일을 입력하세요"
            onChange={handleChange} onKeyPress={handleKeyPress}/>
            <div className="create-button" onClick={() => {
                onCreate(input);    //handleCreate() 실행
                setInput("");}}>
                    추가
            </div>
        </div>
    );
};
    
    


export default Form;