import { render, screen, cleanup } from '@testing-library/react';
import { MyPlans } from "./MyPlans.js";
import { testPlan, testUser} from '../../../constants/TestConstants.js';
import * as planService from '../../../services/planService.js';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext.js';
import userEvent from '@testing-library/user-event';

describe("MyPlans component", ()=> {
    beforeEach(() => {
        
      });
      afterEach(() => cleanup);
    it("should render noPlans component in case user has no plans", async ()=> {
        const noPlansPromise = Promise.resolve([]);
        const noPlansMock = jest.fn().mockReturnValue(noPlansPromise);
        planService.getUserPlans = noPlansMock;

        await act(async () => {
            render(<BrowserRouter>
              <AuthContext.Provider value={{
                user: testUser,
                isAuthenticated: true,
                isAdmin: true,
              }}>
                <MyPlans />
              </AuthContext.Provider>
            </BrowserRouter>);
          });
          expect(screen.queryByText(/You have no plans yet./i)).toBeInTheDocument();
    })
    it("should redirect to createPlan component when user has no plans", async ()=> {
        const noPlansPromise = Promise.resolve([]);
        const noPlansMock = jest.fn().mockReturnValue(noPlansPromise);
        planService.getUserPlans = noPlansMock;

        await act(async () => {
            render(<BrowserRouter>
              <AuthContext.Provider value={{
                user: testUser,
                isAuthenticated: true,
                isAdmin: true,
              }}>
                <MyPlans />
              </AuthContext.Provider>
            </BrowserRouter>);
          });
          await act(async()=> {
            userEvent.click(await screen.findByTestId('create-plan-here'));
          })
          expect(document.location.pathname).toContain(`/createPlan`);
    })
    it("should render user plans correctly when there are some", async ()=> {
        const planPromise = Promise.resolve([testPlan]);
        const planMock = jest.fn().mockReturnValue(planPromise);
        planService.getUserPlans = planMock;

        await act(async () => {
            render(<BrowserRouter>
              <AuthContext.Provider value={{
                user: testUser,
                isAuthenticated: true,
                isAdmin: true,
              }}>
                <MyPlans />
              </AuthContext.Provider>
            </BrowserRouter>);
          });
          
          expect(screen.queryByText(testPlan.city)).toBeInTheDocument();
          expect(screen.queryByText(testPlan.country)).toBeInTheDocument();
          expect(screen.queryByText(testPlan.fromDate)).toBeInTheDocument();
          expect(screen.queryByText(testPlan.toDate)).toBeInTheDocument();
          expect(screen.queryByText("Info")).toBeInTheDocument();
          expect(screen.queryByText(1)).toBeInTheDocument();
    })
    it("should redirect to user plans info when click on info button", async ()=> {
        const planPromise = Promise.resolve([testPlan]);
        const planMock = jest.fn().mockReturnValue(planPromise);
        planService.getUserPlans = planMock;

        await act(async () => {
            render(<BrowserRouter>
              <AuthContext.Provider value={{
                user: testUser,
                isAuthenticated: true,
                isAdmin: true,
              }}>
                <MyPlans />
              </AuthContext.Provider>
            </BrowserRouter>);
          });
          
          await act(async ()=> {
            userEvent.click(await screen.findByText('Info'));
          })
      
          expect(document.location.pathname).toContain(`/myPlans/${testPlan._id}`);
    })
})