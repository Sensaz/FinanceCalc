const CheckboxOption = ({ id, value, checked, onCheckedChange }) => (
  <label className="form__label">
    <input
      className="form__input form__input_type_text"
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(event) => onCheckedChange(event.target.checked)}
    />
    {value}
  </label>
);

export default CheckboxOption;
