# Simple realization of computed properties in objects

Spetial property in object `computed` wich recalculate 
its own value only if its dependency(ies) field(s) changed 

## Example

```javascript
const computedObject = _withComputed({
    firstName: 'John',
    lastName: 'Doe',

    computed: {
      fullName: (obj) => `${obj.firstName} ${obj.lastName}` // John Doe
    }
  });
```

## License

MIT