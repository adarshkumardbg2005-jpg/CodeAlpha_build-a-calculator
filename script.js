const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const historyList = document.getElementById("historyList");
let currentInput = "";

function updateDisplay(value) {
  display.textContent = value || "0";
}

function addToHistory(expr, result) {
  const li = document.createElement("li");
  li.textContent = `${expr} = ${result}`;
  historyList.prepend(li);
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "C") {
      currentInput = "";
      updateDisplay("0");
    } else if (value === "⌫") {
      currentInput = currentInput.slice(0, -1);
      updateDisplay(currentInput);
    } else if (value === "=") {
      try {
        let result = eval(currentInput);
        addToHistory(currentInput, result);
        currentInput = result.toString();
        updateDisplay(result);
      } catch {
        updateDisplay("Error");
      }
    } else if (value === "√") {
      try {
        let result = Math.sqrt(eval(currentInput));
        addToHistory(`√(${currentInput})`, result);
        currentInput = result.toString();
        updateDisplay(result);
      } catch {
        updateDisplay("Error");
      }
    } else if (value === "%") {
      try {
        let result = eval(currentInput) / 100;
        addToHistory(`${currentInput}%`, result);
        currentInput = result.toString();
        updateDisplay(result);
      } catch {
        updateDisplay("Error");
      }
    } else {
      currentInput += value;
      updateDisplay(currentInput);
    }
  });
});

document.addEventListener("keydown", (event) => {
  if ("0123456789+-*/.".includes(event.key)) {
    currentInput += event.key;
    updateDisplay(currentInput);
  } else if (event.key === "Enter") {
    try {
      let result = eval(currentInput);
      addToHistory(currentInput, result);
      currentInput = result.toString();
      updateDisplay(result);
    } catch {
      updateDisplay("Error");
    }
  } else if (event.key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput);
  } else if (event.key.toLowerCase() === "c") {
    currentInput = "";
    updateDisplay("0");
  }
});

