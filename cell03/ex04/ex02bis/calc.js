$(document).ready(function() {
  $("#tryMe").click(function() {
    const leftVal = $("#left").val().trim();
    const rightVal = $("#right").val().trim();
    const operator = $("#operator").val();

    if (!/^\d+$/.test(leftVal) || !/^\d+$/.test(rightVal)) {
      alert("Error :(");
      return;
    }

    const left = parseInt(leftVal, 10);
    const right = parseInt(rightVal, 10);
    let result;

    if ((operator === "/" || operator === "%") && right === 0) {
      alert("It's over 9000!");
      console.log("It's over 9000!");
      return;
    }

    switch (operator) {
      case "+": result = left + right; break;
      case "-": result = left - right; break;
      case "*": result = left * right; break;
      case "/": result = left / right; break;
      case "%": result = left % right; break;
    }

    alert("Result: " + result);
    console.log("Result:", result);
  });

  setInterval(function() {
    alert("Please, use me...");
  }, 30000);
});