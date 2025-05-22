import React from "react";

export default function Greetings({ name }) {
    return (
        <div>
            <h1>Hello {name ? name : "User"}</h1>
        </div>
    );
}