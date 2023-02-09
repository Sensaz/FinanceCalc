const CheckboxOption = ({ id, value, checked, onCheckedChange }) => (
  <label>
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(event) => onCheckedChange(event.target.checked)}
    />
    {value}
  </label>
);

export default CheckboxOption;
