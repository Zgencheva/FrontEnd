import { render, screen, cleanup } from '@testing-library/react';
import { PlanDetails } from "./PlanDetails.js";
import { emptyTestPlan, testAttraction, testPlan, testRestaurant, testUser } from '../../../constants/TestConstants.js';
import * as planService from '../../../services/planService.js';
import * as attractionService from '../../../services/attractionService.js';
import * as restaurantService from '../../../services/restaurantService.js';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext.js';
import userEvent from '@testing-library/user-event';

describe("Plan details component", () => {
    beforeEach(async () => {
        const planPromise = Promise.resolve(emptyTestPlan);
        const emptyPromise = Promise.resolve({});

        const planMock = jest.fn().mockReturnValue(planPromise);
        const emptyMock = jest.fn().mockReturnValue(emptyPromise);

        planService.getById = planMock;
        planService.deletePlan = emptyMock;

        await act(async () => {
            render(<BrowserRouter>
                <AuthContext.Provider value={{
                    user: testUser,
                    isAuthenticated: true,
                    isAdmin: true,
                }}>
                    <PlanDetails />
                </AuthContext.Provider>
            </BrowserRouter>);
        });
    });
    afterEach(() => cleanup);
    it("should render plan details correctly", () => {
        expect(screen.queryByText(/You have no attractions yet./i)).toBeInTheDocument();
        expect(screen.queryByText(/You have no restaurants yet./i)).toBeInTheDocument();
        expect(screen.queryByText(`Welcome to your plan to ${testPlan.city}!`)).toBeInTheDocument();
        expect(screen.queryByText(`Attractions:`)).toBeInTheDocument();
        expect(screen.queryByText(`Restaurants:`)).toBeInTheDocument();
    }),
        it("should show attractions in the plan city when user click on See all attraction in {city}", async () => {

            await act(async () => {
                userEvent.click(await screen.findByTestId('attractions-city'));
            })
            expect(document.location.pathname).toContain(`/${testPlan.city}/attraction`);
        })
    it("should show restaurants in the plan city when user click on See all restaurants in {city}", async () => {

        await act(async () => {
            userEvent.click(await screen.findByTestId('restaurants-city'));
        })
        expect(document.location.pathname).toContain(`/${testPlan.city}/restaurant`);
    })
    it("user should be able to delete plan and should be redirected to myPlans", async () => {

        await act(async () => {
            userEvent.click(await screen.findByTestId('delete'));
            userEvent.click(await screen.findByTestId('delete-confirm'));
        })
        expect(document.location.pathname).toContain(`/myPlans`);
        expect(planService.deletePlan).toHaveBeenCalledTimes(1);
    })
})