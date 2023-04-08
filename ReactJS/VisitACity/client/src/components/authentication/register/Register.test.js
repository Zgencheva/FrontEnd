import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Register } from './Register.js';
import { AuthContext } from '../../../contexts/AuthContext.js';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';

beforeEach(async() => {
    await act(async () => {
        render(<BrowserRouter>
            <AuthContext.Provider value={{
                serverErrors: [],
                onUserRegister: () => { return true },
            }}><Register />
            </AuthContext.Provider>
        </BrowserRouter>);
    });
});

describe("Register component", () => {
    it("should be rendered with all data", async ()=> {
        expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Last name")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("First name")).toBeInTheDocument();
    })
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
    it("should show warining upon inncorrect password input", async () => {
        const wrongPassword = "111"

        const emailNode = screen.getByPlaceholderText("Enter email");
        const passwordNode = screen.getByPlaceholderText("Password");
        userEvent.type(passwordNode, wrongPassword);
        userEvent.type(emailNode, "visitacity@abv.bg");
        expect(screen.queryByText(/Input should be at least 6 characters long/i)).toBeInTheDocument();
    })
    it("should show warining if first name is less than 3 characters", async () => {
        const wrongFirstName = "zz"

        const firstNameNode = screen.getByPlaceholderText("First name");
        const emailNode = screen.getByPlaceholderText("Enter email");
        userEvent.type(firstNameNode, wrongFirstName);
        userEvent.type(emailNode, "visitacity@abv.bg");
        expect(screen.queryByText(/Input should be at least 3 characters long/i)).toBeInTheDocument();
    })
    it("should show warining if last name is less than 3 characters", async () => {
        const wrongLastName = "zz"

        const lastNameNode = screen.getByPlaceholderText("Last name");
        const emailNode = screen.getByPlaceholderText("Enter email");
        userEvent.type(lastNameNode, wrongLastName);
        userEvent.type(emailNode, "visitacity@abv.bg");
        expect(screen.queryByText(/Input should be at least 3 characters long/i)).toBeInTheDocument();
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

        const emailInputNode = screen.getByPlaceholderText("Enter email");
        const PasswordInputNode = screen.getByPlaceholderText("Password");
        userEvent.type(emailInputNode, "abv@abv.bg");
        userEvent.type(PasswordInputNode, "1234567");
        await act(async ()=> {
            userEvent.click(await screen.findByTestId("submit"));
        })
        expect(document.location.pathname).toMatch(`/`);

    })
})