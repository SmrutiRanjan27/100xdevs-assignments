/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

class Calculator {
  constructor() {
    this.result = 0;
    this.operators = ["/", "*", "+", "-"];
    this.operatorMap = {
      "/": this.divide_,
      "*": this.multiply_,
      "+": this.add_,
      "-": this.substract_,
    };
  }

  add(num) {
    this.result += num;
  }

  subtract(num) {
    this.result -= num;
  }

  multiply(num) {
    this.result *= num;
  }

  divide(num) {
    if (num === 0) {
      throw Error("Error occurred!");
    }
    this.result /= num;
  }

  add_(num1, num2) {
    return num1 + num2;
  }

  substract_(num1, num2) {
    return num1 - num2;
  }

  multiply_(num1, num2) {
    return num1 * num2;
  }

  divide_(num1, num2) {
    if (num2 === 0) {
      throw Error("Error occurred!");
    }
    return num1 / num2;
  }

  operate(num1, num2, operation) {
    return operation(num1, num2);
  }

  clear() {
    this.result = 0;
  }

  getResult() {
    return this.result;
  }

  findSubExpressions(expr) {
    let listOfExprs = [];
    let subExpr = "";
    let openBracketCount = 0;
    let closeBracketCount = 0;
    for (let i = 0; i < expr.length; i++) {
      if (expr[i] === "(") {
        openBracketCount += 1;
        if (openBracketCount > 1) {
          subExpr += expr[i];
        }
      } else if (expr[i] === ")") {
        closeBracketCount += 1;
        if (openBracketCount === closeBracketCount) {
          listOfExprs.push(subExpr);
          subExpr = "";
          openBracketCount = 0;
          closeBracketCount = 0;
        } else if (closeBracketCount > openBracketCount) {
          throw Error("Error occurred!");
        } else {
          subExpr += expr[i];
        }
      } else {
        if (this.operators.includes(expr[i])) {
          if (openBracketCount === 0 && closeBracketCount === 0) {
            if (subExpr != "") {
              listOfExprs.push(subExpr);
            }
            listOfExprs.push(expr[i]);
            subExpr = "";
          } else {
            subExpr += expr[i];
          }
        } else {
          subExpr += expr[i];
        }
      }
    }
    if (subExpr) {
      listOfExprs.push(subExpr);
    }
    if (closeBracketCount != openBracketCount) {
      throw Error("Error occurred!");
    }
    return listOfExprs;
  }

  isNumber(str) {
    const floatRegex = /^[-+]?[0-9]*\.?[0-9]+$/;
    return floatRegex.test(str);
  }

  calculate(expr) {
    expr = expr.replace(/\s/g, "");
    if (this.isNumber(expr)) {
      return parseFloat(expr);
    }
    let expressions = this.findSubExpressions(expr);
    for (let i = 0; i < this.operators.length; i++) {
      while (expressions.includes(this.operators[i])) {
        const ind = expressions.indexOf(this.operators[i]);
        const num1 = this.calculate(expressions[ind - 1]);
        const num2 = this.calculate(expressions[ind + 1]);
        if (Number.isNaN(num1) || Number.isNaN(num2)) {
          throw Error("Error occurred!");
        }
        const value = this.operate(
          num1,
          num2,
          this.operatorMap[this.operators[i]]
        );
        // console.log(num1, this.operators[i], num2, "=", value);
        expressions = [
          ...expressions.slice(0, ind - 1),
          value.toString(),
          ...expressions.slice(ind + 2),
        ];
      }
    }
    this.result = parseFloat(expressions[0]);
    return parseFloat(expressions[0]);
  }
}

module.exports = Calculator;
