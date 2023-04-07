import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Register } from './Register.js';
import { AuthContext } from '../../../contexts/AuthContext.js';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';

beforeEach(async () => {
    await act(() => {
        render(<BrowserRouter>
            <AuthContext.Provider value={{
                serverErrors: [],
                onUserRegister: () => { return true },
            }}><Register /></AuthContext.Provider>
        </BrowserRouter>);
    });
});

describe("Register component", () => {
    it("should render form with 1 button", async () => {

        const buttonList = await screen.findAllByRole("button");
        expect(buttonList).toHaveLength(1);
    })
    it("should show warining upon inncorrect email input", async () => {
        const wrongEmail = "vasit.abv.bg"

        const emailNode = screen.getByPlaceholderText("Enter email");
        const passwordNode = screen.getByPlaceholderText("Password");
        userEvent.type(emailNode, wrongEmail);
        userEvent.type(passwordNode, "11111111");
        expect(screen.queryByText(/Invalid email/i)).toBeInTheDocument();
    })
    it("email input should have type email", async () => {

        const emailNode = screen.getByPlaceholderText("Enter email");
        expect(emailNode).toHaveAttribute("type", "email");
    })
    it("password input should have type password", async () => {

        const password = screen.getByPlaceholderText("Password");
        expect(password).toHaveAttribute("type", "password");
    })
    it("button submit should be disabled upon incorrect data", async () => {
        const emailInputNode = screen.getByPlaceholderText("Enter email");
        const PasswordInputNode = screen.getByPlaceholderText("Password");

        userEvent.type(emailInputNode, "abvabv.bg");
        userEvent.type(PasswordInputNode, "1234567");

        expect(screen.getByTestId("submit")).toBeDisabled();
    })
    it("should be able to submit form and regirect to home page", async () => {

        const submitButton = screen.getByTestId("submit");
        const emailInputNode = screen.getByPlaceholderText("Enter email");
        const PasswordInputNode = screen.getByPlaceholderText("Password");
        userEvent.type(emailInputNode, "abv@abv.bg");
        userEvent.type(PasswordInputNode, "1234567");

        userEvent.click(submitButton);
        expect(document.location.pathname).toMatch(`/`);

    })
})