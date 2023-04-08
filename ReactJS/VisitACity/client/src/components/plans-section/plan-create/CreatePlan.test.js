import { render, screen, cleanup, getByLabelText, getByTestId, findByTestId } from '@testing-library/react';
import { CreatePlan } from "./CreatePlan.js";
import { emptyTestPlan, testCountries, testPlan, testRestaurant, testUser } from '../../../constants/TestConstants.js';
import * as planService from '../../../services/planService.js';
import * as attractionService from '../../../services/attractionService.js';
import * as restaurantService from '../../../services/restaurantService.js';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext.js';
import userEvent from '@testing-library/user-event';
import { CountriesContext } from '../../../contexts/CountriesContext.js';
import { GetDate} from '../../../helpers/getDate.js';

describe("Create plan component", () => {
    beforeEach(async () => {
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
                    <CreatePlan />
                </AuthContext.Provider>
                </CountriesContext.Provider>
            </BrowserRouter>);
        });
    });
    afterEach(() => cleanup);
    it("should render create plan correctly", async () => {
        const cutrrentDate = GetDate();
        const fromDateNode = await screen.findByTestId("from-date");
        const toDateNode = await screen.findByTestId("to-date");

        expect(screen.queryByText("Where are you travelling to?"));
        expect(screen.queryByText("Select country"));
        expect(screen.queryByText("Select city"));
        expect(fromDateNode.value).toEqual(cutrrentDate);
        expect(toDateNode.value).toEqual(cutrrentDate);
    })
    it("should render correct cities upon country select", async () => {
        userEvent.selectOptions(    
            screen.getByTestId('countries'),    
            'Bulgaria'
        );

        expect(screen.getByTestId('countries')).toHaveValue('Bulgaria')
        expect(screen.getByTestId('cities',               
        { name: /Sofia/i})).toBeInTheDocument();
        expect(screen.getByTestId('cities',               
        { name: /Plovdiv/i})).toBeInTheDocument();
    })
    // it("should show warning message when from date is in the past", async () => {
    //     const cutrrentDate = GetDate();
    //     const previousDate = getPreviousDay();

    //     const fromDate = screen.getByTestId("from-date");
    //     const toDate = screen.getByTestId("to-date");
    //     userEvent.type(fromDate, previousDate);
    //     userEvent.selectOptions(    
    //         screen.getByTestId('countries'),    
    //         'Bulgaria'
    //     );
    //     expect(screen.queryByText(/Start date cannot be in the past./i)).toBeInTheDocument();
    // })
})

function getPreviousDay(date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);
  
    return previous;
  }