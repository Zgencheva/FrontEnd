import { render, screen, cleanup, findByTestId } from '@testing-library/react';
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
        planService.deleteAttractionFromPlan = emptyMock;
        planService.deleteRestaurantFromPlan = emptyMock;

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
        expect(screen.queryByText(testAttraction.name)).toBeInTheDocument();
        expect(screen.queryByText(testAttraction.name)).toBeInTheDocument();
        expect(screen.queryByText(/Yes, you can swim with dolphins. Dolphins can have fun./i)).toBeInTheDocument();
        expect(screen.queryByText(/You have no attractions yet./i)).toBeNull();
        expect(screen.queryByText(/You have no restaurants yet./i)).toBeNull();
    })
    it("should rdirect to attraction details when user click on attraction-visit", async () => {
        await act(async () => {
            userEvent.click(await screen.findByTestId('attraction-visit'))
        })

        expect(document.location.pathname).toContain(`/attractions/${testAttraction._id}`);
    })

    it("should rdirect to restaurant details when user click on restaurant-visit", async () => {
        await act(async () => {
            userEvent.click(await screen.findByTestId('restaurant-visit'));
        })

        expect(document.location.pathname).toContain(`/restaurants/${testRestaurant._id}`);
    })
    it("should delete attraction from plan when user choose delete-attraction and then confirm it", async () => {
        await act(async () => {
            userEvent.click(await screen.findByTestId('delete-attraction'));
            expect(screen.getByText(`Are you sure you want to delete ${testAttraction.name}?`)).toBeInTheDocument();
            userEvent.click(await screen.findByTestId('delete-attraction-confirmation'));
        })

        expect(planService.deleteAttractionFromPlan).toHaveBeenCalledTimes(1);
        expect(screen.queryByText(testAttraction.name)).toBeNull();
    })
    it("should delete restaurant from plan when user choose delete-restaurant and then confirm it", async () => {
        await act(async () => {
            userEvent.click(await screen.findByTestId('delete-restaurant'));
            expect(screen.getByText(`Are you sure you want to delete ${testRestaurant.name}?`)).toBeInTheDocument();
            userEvent.click(await screen.findByTestId('delete-restaurant-confirmation'));
        })

        expect(planService.deleteRestaurantFromPlan).toHaveBeenCalledTimes(1);
        expect(screen.queryByText(testRestaurant.name)).toBeNull();
    })
})