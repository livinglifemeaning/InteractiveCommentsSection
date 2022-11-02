import classes from "../../styles/Button.module.scss"

const Button = (props) => {
  return (
    <div className={`${classes.button} ${props.type==="red" && classes.red} ${props.type==="gray" && classes.gray}`} onClick={props.onClick}>
      {props.children}
    </div>
  )
}

export default Button
