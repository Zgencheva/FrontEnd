import { render, screen, cleanup } from '@testing-library/react';
import { testCountries, testUser } from '../../../constants/TestConstants.js';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext.js';
import userEvent from '@testing-library/user-event';
import { CountriesContext } from '../../../contexts/CountriesContext.js';
import * as countriesService from '../../../services/countriesService.js';
import { routes } from '../../../constants/routes.js';
import { CityCreate } from './CityCreate.js';

describe("Create city component", () => {
    beforeEach(async () => {
        const emptyPromise = Promise.resolve({});
        const emptyMock = jest.fn().mockReturnValue(emptyPromise);
        countriesService.addCity = emptyMock;

        await act(async () => {
            render(<BrowserRouter>
                <CountriesContext.Provider value={{
                    countries: testCountries,
                }}>
                    <AuthContext.Provider value={{
                        user: testUser,
                        isAuthenticated: true,
                        isAdmin: true,
                    }}>
                        <CityCreate />
                    </AuthContext.Provider>
                </CountriesContext.Provider>
            </BrowserRouter>);
        });
    });
    afterEach(() => cleanup);
    it("should render city create correctly", async () => {

        expect(screen.queryByText("Country"));
        expect(screen.queryByText("City"));
    })
    it("should make add button disabled is city is less than 3 characters long", async () => {
        const wrongCity = "zz"

        const cityInput = screen.getByTestId("city-input");
        const addCityButton = screen.getByTestId("city-create");
        userEvent.type(cityInput, wrongCity);
        userEvent.click(addCityButton);
        expect(screen.queryByText(/Input should be at least 3 characters long/i)).toBeInTheDocument();
    })
    it("should call countriesService.addCity upon successfull city create", async () => {
        const correctCity = "Pernik";

        await act(async () => {
            userEvent.selectOptions(
                await screen.findByTestId('country-input'),
                'Bulgaria'
            );
            userEvent.type(await screen.findByTestId("city-input"), correctCity);
            userEvent.click(await screen.findByTestId("city-create"));
        })
        expect(countriesService.addCity).toHaveBeenCalledTimes(1);
        expect(screen.queryByText(/City Pernik added successfully!/i)).toBeInTheDocument();
    })

})