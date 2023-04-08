import { render, screen, cleanup, getByLabelText, getByTestId, findByTestId } from '@testing-library/react';
import { CreatePlan } from "./CreatePlan.js";
import {  testCountries, testUser } from '../../../constants/TestConstants.js';
import * as planService from '../../../services/planService.js';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext.js';
import userEvent from '@testing-library/user-event';
import { CountriesContext } from '../../../contexts/CountriesContext.js';
import { GetDate} from '../../../helpers/getDate.js';
import { routes } from '../../../constants/routes.js';

describe("Create plan component", () => {
    const emptyPromise = Promise.resolve({});
    const emptyMock = jest.fn().mockReturnValue(emptyPromise);
    planService.createPlan = emptyMock;
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
    it("should redirect to user plans upon successfull plan reate", async () => {
       await act(async ()=> {
        userEvent.selectOptions(    
           await screen.findByTestId('countries'),    
            'Bulgaria'
        );
       }) 
       await act(async()=> {
        userEvent.click(await screen.findByTestId("from-date"));
       })
        expect(screen.getByTestId('countries')).toHaveValue('Bulgaria')
        expect(screen.getByTestId('cities',               
        { name: /Sofia/i})).toBeInTheDocument();
        expect(screen.getByTestId('cities',               
        { name: /Plovdiv/i})).toBeInTheDocument();
        screen.debug();
        await act(async()=> {
            userEvent.selectOptions(    
                await screen.findByTestId('cities'),    
                "Sofia"
            );
        })
       
        await act(async ()=> {
            userEvent.click(await screen.findByTestId("create-plan"));
        })
        expect(planService.createPlan).toHaveBeenCalledTimes(1);
        expect(document.location.pathname).toContain(routes.myPlans);

    })
})

function getPreviousDay(date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);
  
    return previous;
  }