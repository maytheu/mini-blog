export const checkValidity= (values, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }
  if (rules.required) {
    isValid = values.trim() !== "" && isValid;
  }
  if (rules.minLength) {
    isValid = values.length >= rules.minLength && isValid;
  }
  return isValid
}
