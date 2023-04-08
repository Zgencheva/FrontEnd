import { render, screen, cleanup } from '@testing-library/react';
import { testUser } from '../../../constants/TestConstants.js';
import * as planService from '../../../services/planService.js';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext.js';
import userEvent from '@testing-library/user-event';
import { CountriesContext } from '../../../contexts/CountriesContext.js';
import { routes } from '../../../constants/routes.js';
import { CountryCreate } from './CountryCreate.js';

describe("Create plan component", () => {
    const emptyPromise = Promise.resolve({});
    const emptyMock = jest.fn().mockReturnValue(emptyPromise);
    planService.createPlan = emptyMock;
    const onCountryCreate = jest.fn().mockReturnValue(true);
    beforeEach(async () => {
        await act(async () => {
            render(<BrowserRouter>
            <CountriesContext.Provider value={{
                onCountryCreate: onCountryCreate,
                success: false,
                setSuccess: ()=> {return false}
            }}>
                <AuthContext.Provider value={{
                    user: testUser,
                    isAuthenticated: true,
                    isAdmin: true,
                }}>
                    <CountryCreate />
                </AuthContext.Provider>
                </CountriesContext.Provider>
            </BrowserRouter>);
        });
    });
    afterEach(() => cleanup);
    it("should render country create correctly", async () => {
      
        expect(screen.queryByText("Country"));
    })
    it("should make add button disabled is county is less than 3 characters long", async () => {
        const wrongCountry = "zz"

        const countryInput = screen.getByTestId("country-input");
        const addCountryButton = screen.getByTestId("add-country");
        userEvent.type(countryInput, wrongCountry);
        userEvent.click(addCountryButton);
        expect(screen.queryByText(/Input should be at least 3 characters long/i)).toBeInTheDocument();
    })
    it("should call onCountryCreate upon successfull country create", async () => {
        const correctCountry = "Liberia"

        const countryInput = screen.getByTestId("country-input");
        const addCountryButton = screen.getByTestId("add-country");
        userEvent.type(countryInput, correctCountry);
        userEvent.click(addCountryButton);

        expect(onCountryCreate).toHaveBeenCalledTimes(1);

    })
    
})