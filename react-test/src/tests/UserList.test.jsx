import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom/vitest"
import UserList from "../components/UserList";

describe('UserList Component without any users', () => {
    it('should render "No users found" message', () => {
        render(<UserList users={[]} />);
        expect(screen.getByText("No users found")).toBeInTheDocument();
    });

    it('should render user name', () => {
        const users = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
        render(<UserList users={users} />);
        users.forEach(user => {
            expect(screen.getByText(user.name)).toBeInTheDocument();
            expect(screen.getAllByRole("link", { name: user.name })).toHaveAttribute("href", `/users/${user.id}`);
        });
    });
});