function createSmartObj(obj) {
  const newObj = { ...obj };

  Object.defineProperty(newObj, 'computed', {
    value: {},
    enumerable: false,
    configurable: false,
    writable: true,
  });

  Object.keys(obj).forEach(key => {
    Object.defineProperty(newObj, key, {
      enumerable: true,
      configurable: true,
      get: () => this[key] || obj[key],
      set: value => {
        const shallowCopyObj = {...newObj};
        this[key] = value;

        Object.keys(newObj.computed).forEach(computedKey => {
          const property = Object.getOwnPropertyDescriptor(newObj.computed, computedKey);
          if (((newObj.computed[computedKey].dependencyKeys.length && newObj.computed[computedKey].dependencyKeys.includes(key)) || !newObj.computed[computedKey].dependencyKeys.length)) {
            property.set.call(this, shallowCopyObj, newObj, key)
          }

        });
      },
    });
  });

  return newObj;
}

function defineComputedField(obj, computeField, cb) {

  Object.defineProperty(obj.computed, `__${computeField}`, {
    enumerable: true,
    configurable: false,
    get: () => this[`__${computeField}`] || { dependencyKeys: [], value: cb(obj) },
    set: (shallowCopyObj, newObj, dependencyKey) => {
      const oldValue = cb(shallowCopyObj);
      const newValue = cb(newObj);

      if (oldValue === newValue || (oldValue !== oldValue && newValue !== newValue)) {
        return;
      }

      return {
        dependencyKeys: !this[`__${computeField}`] ? [] : this[`__${computeField}`].dependencyKeys.some(key => key === dependencyKey) ? this[`__${computeField}`].dependencyKeys : [dependencyKey, ...this[`__${computeField}`].dependencyKeys],
        value: newValue
      };
    }
  });

  Object.defineProperty(obj, computeField, {
    enumerable: true,
    configurable: true,
    get: () => obj.computed[`__${computeField}`].value,
    set: obj => {
      throw Error('error set');
    },
  });
}

const obj = createSmartObj({ firstName: 'John', lastName: 'Doe', test: 'ss' });
defineComputedField(obj, 'fullName', data => `${data.firstName} ${data.lastName}`);

