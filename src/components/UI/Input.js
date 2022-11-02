import { useRef } from "react"
import classes from "../../styles/Input.module.scss"

const Input = ({defaultValue, setCommentValue}) => {
    const inputRef = useRef(); 
    if(defaultValue === "" && inputRef.current){
        inputRef.current.value = ""; 
    }  
  return (
    <textarea className={classes.input}  placeholder="Add a comment..." ref={inputRef} onBlur={() => setCommentValue(inputRef.current.value)} defaultValue={defaultValue}></textarea>
    
  )
}

export default Input
