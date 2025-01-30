export default {
  isValidEquation: (equation) => {
    const regex = /^[0-9+\-×÷=().%\s]*$/;
    return regex.test(equation);
  },
  isValidNumber: (number) => {
    const regex = /^[0-9]*$/;
    return regex.test(number);
  },
  isDisplayEmpty: (display) => {
    return display === "0";
  },
  isEqualsPressed: (display) => {
    return display === "=";
  },
  isClearPressed: (display) => {
    return display === "CE";
  },
  isClearAllPressed: (display) => {
    return display === "C";
  },
  isLastCharOperator: (equation, operators) => {
    equation = equation.trim();
    const lastChar = equation[equation.length - 1];
    return operators.includes(lastChar);
  },
  isEquationInverterPressed: (display) => {
    return display === "+/-";
  },

  //This function is breaking everything
  doesEquationContainOperator: (equation, operators) => {
    if (!operators || !Array.isArray(operators)) {
      throw new Error("Invalid operators array");
    }
    return operators.some((operator) => equation.includes(operator));
  },
};
