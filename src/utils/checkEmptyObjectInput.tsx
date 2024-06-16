/**
 * 객체 안의 input 길이가 0인지에 따른 true or false
 * @param object
 * @param setObjectError
 * @returns
 */
const checkEmptyObjectInput = (
  object: { [key: string]: string },
  setObjectError: (value: any) => void
) => {
  for (const [field, value] of Object.entries(object)) {
    if (field !== 'code' && value.length === 0) {
      setObjectError((prev: any) => ({ ...prev, [field]: true }));
      document.getElementById(field)?.focus();
      return true;
    }
  }
  return false;
};

export default checkEmptyObjectInput;
