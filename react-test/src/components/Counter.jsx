import { useState } from "react";
import React from "react";
export default function Counter() {
    const [count, setCount] = useState(0);
    return (
        <>
            <p >{count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)}>Decrement</button>
        </>

    );
}