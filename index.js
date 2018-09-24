function createSmartObj(obj) {
  const newObj = { ...obj };

  Object.defineProperty(newObj, 'computed', {
    value: {},
    enumerable: true,
    configurable: false,
    writable: true,
  });

  Object.keys(obj).forEach(key => {
    Object.defineProperty(newObj, key, {
      enumerable: true,
      configurable: true,
      get: () => this[key] || obj[key],
      set: value => {
        this[key] = value;
        Object.keys(newObj.computed).forEach(key => (newObj.computed[key] = newObj));
      },
    });
  });

  return newObj;
}

function defineComputedField(obj, computeField, cb) {
  Object.defineProperty(obj.computed, `__${computeField}`, {
    enumerable: true,
    configurable: false,
    get: () => this[`__${computeField}`] || cb(obj),
    set: obj => cb(obj),
  });

  Object.defineProperty(obj, computeField, {
    enumerable: true,
    configurable: true,
    get: () => obj.computed[`__${computeField}`],
    set: obj => {
      throw Error('error set');
    },
  });
}

const obj = createSmartObj({ firstName: 'John', lastName: 'Doe' });
defineComputedField(obj, 'fullName', data => `${data.firstName} ${data.lastName}`);
