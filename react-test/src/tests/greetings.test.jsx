import React from "react";
import "@testing-library/jest-dom/vitest"
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Greetings from "../components/Greetings";
describe("Greetings Component", () => {
    it("should render the Greetings component", () => {
        render(<Greetings />)
        expect(screen.getByText("Hello User")).toBeInTheDocument()
    })
    it("should greet the user with a User's name", () => {
        render(<Greetings name="John" />)
        expect(screen.getByText("Hello John")).toBeInTheDocument()
    })
})
