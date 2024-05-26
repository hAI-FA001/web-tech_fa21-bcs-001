import { useState } from "react";

const Counter = () => {
    // let count = 0; // we can modify this but it won't affect html (need React to create state variable + update logic)
    // note/reminder: useState returns array, not object, so use [] instead of {} to destructure
    // we can use let instead of const, but const is better so we don't accidentally modify state variable
    const [count, setCount] = useState(0);  // we tell React to make these things
    console.log(count, setCount);
    const onInc = (event) => {
        // count++;
        setCount(count+1);  // use this func to change state variables
    }
    
    const onDec = (event) => {
        // count--;
        setCount(count-1);
    }
    return ( 
        // we can add CSS like this, first {} is for JS, second is for JSON
        // react auto adds px to padding value
        <div style={{backgroundColor: "#AA88FF", border: "3px solid green", textAlign: "center", padding: 10}}>
            <button onClick={onDec}>-</button>
            <span style={{padding: "0px 10px"}}>{count}</span>
            <button onClick={onInc}>+</button>
            {(count > 3) && "Some text" /*conditional rendering*/}
        </div>
     );
}
 
export default Counter;