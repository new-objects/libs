const mergeObjects = (obj1, obj2) => {
  const merged = {};
  for (const key in obj1) {
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      merged[key] = mergeObjects(obj1[key], obj2[key]);
    } else {
      merged[key] = obj1[key];
    }
  }
  for (const key in obj2) {
    if (typeof obj2[key] === 'object' && !merged[key]) {
      merged[key] = obj2[key];
    } else if (typeof obj2[key] !== 'object') {
      merged[key] = obj2[key];
    }
  }
  return merged;
};

export { mergeObjects };
