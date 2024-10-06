export const deepClone = <T = any>(target: T): T => {
  if (target === null) {
    return target;
  }

  if (typeof target !== "object") {
    return target;
  }

  if (Array.isArray(target)) {
    const cloneArray = [];
    for (let i = 0; i < target.length; i++) {
      cloneArray[i] = deepClone(target[i]);
    }
    return cloneArray as T;
  }

  const cloneObject: Record<string, any> = {};
  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      cloneObject[key] = deepClone(target[key]);
    }
  }

  return cloneObject as T;
};
