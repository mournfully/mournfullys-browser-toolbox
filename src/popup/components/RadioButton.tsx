// https://www.codevertiser.com/how-to-create-custom-radio-button-in-reactjs/
// https://giancarlobuomprisco.com/solid/building-widgets-solidjs-web-components
// https://www.solidjs.com/tutorial/props_defaults

export function RadioButton(props) {
  return (
    <label>
      <input
        type="radio"
        name={props.name}
        id={props.id}
        value={props.value} 
        checked={props.checked}
      />
      {props.text ? props.text : props.value}
    </label>
  )
}
