export const assign = (targetObject, newObject) => {
    for (let key in newObject) targetObject[key] = newObject[key];

    return targetObject;
};