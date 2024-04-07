const onChangeObjectInput = (
  object: { [key: string]: string | number | boolean },
  setObject: (value: any) => void,
  value: string | number | boolean,
  field: string
) => {
  const updatedObject = { ...object };
  updatedObject[field] = value;
  setObject(updatedObject);
};

export default onChangeObjectInput;
