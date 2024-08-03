/**
 * 한 객체 안의 여러 field를 업데이트
 * @param setObject 객체 업데이트
 * @param updatedObjectState 객체
 */

interface ObjectState {
  [key: string]: string | number | boolean | object;
}

const updateObjectState = (
  setObject: (value: any) => void,
  updatedObject: Partial<ObjectState>
) => {
  setObject((prev: any) => ({
    ...prev,
    ...updatedObject,
  }));
};

export default updateObjectState;
