import React from "react";
import "@testing-library/jest-dom/vitest"
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Counter from "../components/Counter";
import userEvent from "@testing-library/user-event";

describe('Counter Component', () => {
    it('should increment the count', async () => {
        render(<Counter />);
        const counterValue = screen.getByRole('paragraph');
        const incrementButton = screen.getByRole('button', { name: /increment/i });
        expect(counterValue.textContent).toEqual('0');
        await userEvent.click(incrementButton);
        expect(counterValue.textContent).toEqual('1');
    });
}); 