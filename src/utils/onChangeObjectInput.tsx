const onChangeObjectInput = (
  object: { [key: string]: string },
  setObject: (value: any) => void,
  value: string,
  field: string
) => {
  const updatedObject = { ...object };
  updatedObject[field] = value;
  setObject(updatedObject);
};

export default onChangeObjectInput;
