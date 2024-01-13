import { useState, useMemo } from "react";

// In this assignment, your task is to create a component that performs an expensive calculation (finding the factorial) based on a user input. 
// Use useMemo to ensure that the calculation is only recomputed when the input changes, not on every render.

export default function Assignment1() {
    const [input, setInput] = useState(0);
    // Your solution starts here
    
    function findFactorial() {
      if (input == 0 | input == 1) {
          return 1;
      }
      let output = 1;
      for (let i=input; i>1; i--) {
        output *= i;
      }
      return output;
    }

    const expensiveValue = useMemo(findFactorial, [input]); 
    // Your solution ends here

    return (
        <div>
            <input 
                type="number" 
                value={input} 
                onChange={(e) => setInput(Number(e.target.value))} 
            />
            <p>Calculated Value: {expensiveValue}</p>
        </div>
    );
}
