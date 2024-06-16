/**
 * 객체 안의 input에 대한 onChange
 * @param object 객체
 * @param setObject 객체 업데이트
 * @param value 입력된 값
 * @param field 객체 키 값
 */
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
