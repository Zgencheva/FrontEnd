import { render, screen, cleanup } from '@testing-library/react';
import { PlanDetails } from "./PlanDetails.js";
import { testPlan, testUser, testAttraction, testRestaurant } from '../../../constants/TestConstants.js';
import * as planService from '../../../services/planService.js';
import * as attractionService from '../../../services/attractionService.js';
import * as restaurantService from '../../../services/restaurantService.js';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext.js';
import userEvent from '@testing-library/user-event';

describe("Plan details component when plan has attractions and restaurnts", () => {
    beforeEach(async () => {
        const planPromise = Promise.resolve(testPlan);
        const emptyPromise = Promise.resolve({});
        const attractionPromise = Promise.resolve(testAttraction);
        const restaurantPromise = Promise.resolve(testRestaurant);
        const planMock = jest.fn().mockReturnValue(planPromise);
        const emptyMock = jest.fn().mockReturnValue(emptyPromise);
 
        const attractionMock = jest.fn().mockReturnValue(attractionPromise);
        const restaurantMock = jest.fn().mockReturnValue(restaurantPromise);

        planService.getById = planMock;
        attractionService.getById = attractionMock;
        restaurantService.getById = restaurantMock;
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
        expect(screen.queryByText(`Welcome to your plan to ${testPlan.city}!`)).toBeInTheDocument();
        expect(screen.queryByText(`Attractions:`)).toBeInTheDocument();
        expect(screen.queryByText(`Restaurants:`)).toBeInTheDocument();
        expect(screen.queryByText(/You have no attractions yet./i)).toBeNull();
        expect(screen.queryByText(/You have no restaurants yet./i)).toBeNull();
    })
})