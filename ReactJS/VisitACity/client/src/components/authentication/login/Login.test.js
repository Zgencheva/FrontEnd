import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Login } from './Login.js';
import { AuthContext } from '../../../contexts/AuthContext.js';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';

beforeEach(async () => {
    await act(async () => {
        render(<BrowserRouter>
            <AuthContext.Provider value={{
                serverErrors: [],
                onUserLogin: () => { return true },
            }}><Login /></AuthContext.Provider>
        </BrowserRouter>);
    });
});

describe("Login component", () => {
    it("should render form with 1 button", async () => {

        const buttonList = await screen.findAllByRole("button");
        expect(buttonList).toHaveLength(1);
    })
    it("should fail on incorrect email validation", async () => {
        const wrongEmail = "vasit.abv.bg"

        const emailNode = screen.getByPlaceholderText("Enter email");
        const passwordNode = screen.getByPlaceholderText("Password");
        await act(async () => {
            userEvent.type(emailNode, wrongEmail);
            userEvent.type(passwordNode, "11111111");
        })
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
    it("should be able to submit form and regirect to home page", async () => {

        const emailInputNode = screen.getByPlaceholderText("Enter email");
        const PasswordInputNode = screen.getByPlaceholderText("Password");
        await act(async () => {
            userEvent.type(emailInputNode, "abv@abv.bg");
            userEvent.type(PasswordInputNode, "1234567");
            userEvent.click(await screen.findByTestId("submit"));
        })
        expect(document.location.pathname).toMatch(`/`);
    })
})