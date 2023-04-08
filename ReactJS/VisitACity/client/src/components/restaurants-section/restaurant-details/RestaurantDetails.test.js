import { render, screen, cleanup } from '@testing-library/react';
import React, { useState as useStateMock } from 'react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { RestaurantDetails } from './RestaurantDetails.js';
import { BrowserRouter } from 'react-router-dom';
import { testPlan, testRestaurant, testUser, testComment } from '../../../constants/TestConstants.js';
import { AuthContext } from '../../../contexts/AuthContext.js';
import { act } from 'react-dom/test-utils';
import * as restaurantService from '../../../services/restaurantService.js';
import * as planService from '../../../services/planService.js';
import * as commentService from '../../../services/commentService.js';
import { click } from '@testing-library/user-event/dist/click.js';

describe('RestaurantDetails component', () => {
  beforeEach(() => {
    const requester = require('../../../helpers/requester.js');
    const restaurantService = require('../../../services/restaurantService.js');
    const planService = require('../../../services/planService.js');
    const promise1 = Promise.resolve(testRestaurant);
    const emptyPromiseObj = Promise.resolve({});
    const planPromise = Promise.resolve(testPlan);
    const commentPromise = Promise.resolve([testComment]);
    const mock = jest.fn().mockReturnValue(promise1);
    const emptyMockObj = jest.fn().mockReturnValue(emptyPromiseObj);
    const planMock = jest.fn().mockReturnValue(planPromise);
    const commentMock = jest.fn().mockReturnValue(commentPromise);
    requester.requester = mock;
    restaurantService.getById = mock;
    planService.addRestaurantToPlan = planMock;
    restaurantService.deleteData = emptyMockObj;
    commentService.getRestaurantComments = commentMock;
  });
  afterEach(() => cleanup);
  it('Should render testRestaurant correctly', async () => {
    await act(async () => {
      render(<BrowserRouter>
        <AuthContext.Provider value={{
          user: testUser,
          isAuthenticated: true,
          isAdmin: true,
        }}>
          <RestaurantDetails />
        </AuthContext.Provider>
      </BrowserRouter>);
    });
    
    expect(screen.getByText(testRestaurant.name)).toBeInTheDocument();
    expect(screen.getByText(/Address: Nqkyde v Plovdiv i v Sofia/i)).toBeInTheDocument();
    expect(screen.getByText(/Phone: 055555555/i)).toBeInTheDocument();
    expect(screen.getByText("Add to plan")).toBeInTheDocument();
    const displayedImage = document.querySelector("img");
    expect(displayedImage.src).toContain(testRestaurant.image);

  })
  it('should show comments in case there are some', async () => {
    await act(async () => {
      render(<BrowserRouter>
        <AuthContext.Provider value={{
          user: testUser,
          isAuthenticated: true,
          isAdmin: true,
        }}>
          <RestaurantDetails />
        </AuthContext.Provider>
      </BrowserRouter>);
    });

    expect(screen.getByText(testComment.comment)).toBeInTheDocument();
    expect(screen.getByText(/by visitacity@abv.bg/i)).toBeInTheDocument();
  })
  it('should show Edit and Delete buttons when user is admin', async () => {
    await act(async () => {
      render(<BrowserRouter>
        <AuthContext.Provider value={{
          user: testUser,
          isAuthenticated: true,
          isAdmin: true,
        }}>
          <RestaurantDetails />
        </AuthContext.Provider>
      </BrowserRouter>);
    });
    const editButton = screen.getByText("Edit");
    const deletBeutton = screen.getAllByText("Delete");

    expect(editButton).toBeInTheDocument();
    expect(deletBeutton).toHaveLength(2);

  });
  it('should NOT show Edit and Delete buttons when user is not admin', async () => {
    await act(async () => {
      render(<BrowserRouter>
        <AuthContext.Provider value={{
          user: testUser,
          isAuthenticated: true,
          isAdmin: false,
        }}>
          <RestaurantDetails />
        </AuthContext.Provider>
      </BrowserRouter>);
    });

    expect(screen.queryByText("Edit")).toBeNull();
    expect(screen.queryByText("Delete")).toBeNull();
  })

  it("should render testRestaurant when user is not Authenticated", async () => {
    await act(async () => {
      render(<BrowserRouter>
        <AuthContext.Provider value={{
          user: testUser,
          isAuthenticated: false,
          isAdmin: false,
        }}>
          <RestaurantDetails />
        </AuthContext.Provider>
      </BrowserRouter>);
    });

    expect(screen.getByText(testRestaurant.name)).toBeInTheDocument();
  })
  it("should render testRestaurant when user is Authenticated", async () => {

    await act(async () => {
      render(<BrowserRouter>
        <AuthContext.Provider value={{
          user: testUser,
          isAuthenticated: true,
          isAdmin: false,
        }}>
          <RestaurantDetails />
        </AuthContext.Provider>
      </BrowserRouter>);
    });

    expect(screen.getByText(testRestaurant.name)).toBeInTheDocument();
  })
  it("Add comment section should NOT be visible if user already left comment", async () => {

    await act(async () => {
      render(<BrowserRouter>
        <AuthContext.Provider value={{
          user: testUser,
          isAuthenticated: true,
          isAdmin: false,
        }}>
          <RestaurantDetails />
        </AuthContext.Provider>
      </BrowserRouter>);
    });

    expect(screen.queryByText("Leave your comment here:")).toBeNull();
  })
  it("Add comment section should be visible if user did not left comment", async () => {

    await act(async () => {
      render(<BrowserRouter>
        <AuthContext.Provider value={{
          user: {},
          isAuthenticated: true,
          isAdmin: false,
        }}>
          <RestaurantDetails />
        </AuthContext.Provider>
      </BrowserRouter>);
    });

    expect(screen.queryByText("Leave your comment here:")).toBeInTheDocument();
  })
  it("user should not be able to leave empty comment", async () => {

    await act(async () => {
      render(<BrowserRouter>
        <AuthContext.Provider value={{
          user: {
            "_id": "sdadadadadada",
            "email": "test2@abv.bg",
            "accessToken": "test-test-test"
          },
          isAuthenticated: true,
          isAdmin: false,
        }}>
          <RestaurantDetails />
        </AuthContext.Provider>
      </BrowserRouter>);
    });
    expect(screen.queryByText("Leave your comment here:")).toBeInTheDocument();
    await act(async ()=> {
      userEvent.click(await screen.findByTestId("submit-button"));
    })
    expect(await screen.findByText("Please fill in your comment")).toBeInTheDocument();
  })
  it("user should be able to leave comment", async () => {

    await act(async () => {
      render(<BrowserRouter>
        <AuthContext.Provider value={{
          user: {
            "_id": "sdadadadadada",
            "email": "test2@abv.bg",
            "accessToken": "test-test-test"
          },
          isAuthenticated: true,
          isAdmin: false,
        }}>
          <RestaurantDetails />
        </AuthContext.Provider>
      </BrowserRouter>);
    });
    expect(screen.queryByText("Leave your comment here:")).toBeInTheDocument();
    //TODO: Simulate radio button and texarea fill
    // userEvent.type(await screen.findByTestId("submit-button"));

  })
  it("AddToPlan button should redirect to login page when user is not authenticated", async () => {

    await act(async () => {
      render(<BrowserRouter>
        <AuthContext.Provider value={{
          user: {},
          isAuthenticated: false,
          isAdmin: false,
        }}>
          <RestaurantDetails />
        </AuthContext.Provider>
      </BrowserRouter>);
    });
    await act(async()=> {
      userEvent.click(await screen.findByText('Add to plan'));
    })
    expect(document.location.pathname).toContain(`/login`);
  })
  it("AddToPlan button should call addRestaurantToPlan in planService once", async () => {

    await act(async () => {
      render(<BrowserRouter>
        <AuthContext.Provider value={{
          user: testUser,
          isAuthenticated: true,
          isAdmin: true,
        }}>
          <RestaurantDetails />
        </AuthContext.Provider>
      </BrowserRouter>);
    });
    await act(async ()=> {
      userEvent.click(await screen.findByText('Add to plan'));
    })
    expect(planService.addRestaurantToPlan).toHaveBeenCalledTimes(1);
  })
  it("Edit button should regirect to Edit restaurant page wneh user is Admin", async () => {
    await act(async () => {
      render(<BrowserRouter>
        <AuthContext.Provider value={{
          user: testUser,
          isAuthenticated: true,
          isAdmin: true,
        }}>
          <RestaurantDetails />
        </AuthContext.Provider>
      </BrowserRouter>);
    });

    await act(async ()=> {
      userEvent.click(await screen.findByText('Edit'));
    })

    expect(document.location.pathname).toContain(`/admin/restaurants/edit/`);
  })
  it("Delete button should call restaurantService.deleteData once and should render modal button", async () => {
    await act(async () => {
      render(<BrowserRouter>
        <AuthContext.Provider value={{
          user: testUser,
          isAuthenticated: true,
          isAdmin: true,
        }}>
          <RestaurantDetails />
        </AuthContext.Provider>
      </BrowserRouter>);
    });
    await act(async () => {
      userEvent.click(await screen.findByTestId('delete-button'));
      userEvent.click(await screen.findByTestId('delete-confirmation'));
    })
    expect(document.location.pathname).not.toContain(`/Details`);
    expect(restaurantService.deleteData).toHaveBeenCalledTimes(1);
  })
})
