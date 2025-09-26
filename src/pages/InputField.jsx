import React from 'react'
import "./InputField.css"
const InputField = ({label,type="text",name,value,onChange,error}) => {
  return (
    <div className='input-field'>
        <label>{label}</label>
        <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={error?"input-error": ""}
        />
        {error && <p className="error-text">{error}</p>}
      
    </div>
  )
}

export default InputField
