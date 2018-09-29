

function drawInput(initialValue, onChange) {
  const input = document.createElement('input');
  input.value = initialValue;

  input.addEventListener('input', onChange);
  return input;
}

function drawResultDiv(initialValue) {
  const div = document.createElement('div');
  div.textContent = initialValue;
  return div;
}


function renderDemoComputedProperties() {
  const demo = document.querySelector('.demo');

  const computedObject = window._withComputed({
    firstName: 'John',
    lastName: 'Doe',

    computed: {
      fullName: (obj) => `${obj.firstName} ${obj.lastName} => magic`
    }
  });

  const resultDiv = drawResultDiv(computedObject.fullName);
  const inputFirstName = drawInput(computedObject.firstName, (e) => {
    computedObject.firstName = e.target.value;
    resultDiv.textContent = computedObject.fullName;
  });
  const inputLastName = drawInput(computedObject.lastName, (e) => {
    computedObject.lastName = e.target.value;
    resultDiv.textContent = computedObject.fullName;
  });

  demo.appendChild(inputFirstName);
  demo.appendChild(inputLastName);
  demo.appendChild(resultDiv);
}

renderDemoComputedProperties();