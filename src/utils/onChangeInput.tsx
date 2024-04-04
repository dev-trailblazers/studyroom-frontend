const onChangeInput = (
  userInfo: { [key: string]: string },
  setUserInfo: (value: any) => void,
  value: string,
  field: string
) => {
  const updatedObject = { ...userInfo };
  updatedObject[field] = value;
  setUserInfo(updatedObject);
};

export default onChangeInput;
