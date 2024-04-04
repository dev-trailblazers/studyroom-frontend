const checkEmptyInputAndFocus = (
  userInfo: { [key: string]: string },
  setUserInfoError: (value: any) => void
) => {
  for (const [field, value] of Object.entries(userInfo)) {
    if (field !== 'code' && value.length === 0) {
      setUserInfoError((prev: any) => ({ ...prev, [field]: true }));
      document.getElementById(field)?.focus();
      return true;
    }
  }
  return false;
};

export default checkEmptyInputAndFocus;
