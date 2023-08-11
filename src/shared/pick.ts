const pick = <T extends object, K extends keyof T>(
  obj: T,
  kays: K[],
): Partial<T> => {
  const finalObj: Partial<T> = {};
  for (const key of kays) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key];
    }
  }
  return finalObj;
};
export default pick;
