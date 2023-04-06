import { render, screen, fireEvent, waitFor, cleanup, getByTestId, getByAltText } from '@testing-library/react';
import React, { useState as useStateMock } from 'react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { AttractionDetails } from './AttractionDetails.js';
import { BrowserRouter } from 'react-router-dom';
import { testAttraction, testUser } from '../../../constants/TestConstants.js';
import { AuthContext } from '../../../contexts/AuthContext.js';
import { act } from 'react-dom/test-utils';
import * as attractionService from '../../../services/attractionService.js';
import * as planService from '../../../services/planService.js';

describe('AttractionDetails component', () => {
  beforeEach(() => {
    const requester = require('../../../helpers/requester.js');
    const attractionService = require('../../../services/attractionService.js');
    const planService = require('../../../services/planService.js');
    const promise1 = Promise.resolve(testAttraction);
    const emptyPromise = Promise.resolve({});
    const mock = jest.fn().mockReturnValue(promise1);
    const emptyMock = jest.fn().mockReturnValue(emptyPromise);
    requester.requester = mock;
    attractionService.addUserReview = mock;
    attractionService.getById = mock;
    planService.addAttractionToPlan = emptyMock;
    attractionService.deleteAttraction = emptyMock;
  });
  afterEach(() => cleanup);
  it('Should render testAttraction correctly', async () => {
    await act(async () => {
      render(<BrowserRouter>
        <AuthContext.Provider value={{
          user: testUser,
          isAuthenticated: true,
          isAdmin: true,
        }}>
          <AttractionDetails />
        </AuthContext.Provider>
      </BrowserRouter>);
    });
    expect(screen.getByText(testAttraction.name)).toBeInTheDocument();
    expect(screen.getByText(testAttraction.description)).toBeInTheDocument();
    expect(screen.getByText(/Price: 25/i)).toBeInTheDocument();

    const displayedImage = document.querySelector("img");
    expect(displayedImage.src).toContain(testAttraction.image);

  })
  it('should show Edit and Delete buttons when user is admin', async () => {
    await act(async () => {
      render(<BrowserRouter>
        <AuthContext.Provider value={{
          user: testUser,
          isAuthenticated: true,
          isAdmin: true,
        }}>
          <AttractionDetails />
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
          <AttractionDetails />
        </AuthContext.Provider>
      </BrowserRouter>);
    });
    expect(screen.queryByText("Edit")).toBeNull();
    expect(screen.queryByText("Delete")).toBeNull();

  })

  it("should render testAttraction when user is not Authenticated", async () => {
    await act(async () => {
      render(<BrowserRouter>
        <AuthContext.Provider value={{
          user: testUser,
          isAuthenticated: false,
          isAdmin: false,
        }}>
          <AttractionDetails />
        </AuthContext.Provider>
      </BrowserRouter>);
    });
    expect(screen.getByText(testAttraction.name)).toBeInTheDocument();
  })
  it("should render testAttraction when user is Authenticated", async () => {

    await act(async () => {
      render(<BrowserRouter>
        <AuthContext.Provider value={{
          user: testUser,
          isAuthenticated: true,
          isAdmin: false,
        }}>
          <AttractionDetails />
        </AuthContext.Provider>
      </BrowserRouter>);
    });
    expect(screen.getByText(testAttraction.name)).toBeInTheDocument();

  })
  it("addUserReview should have been called once if user is Authenticated", async () => {

    await act(async () => {
      render(<BrowserRouter>
        <AuthContext.Provider value={{
          user: testUser,
          isAuthenticated: true,
          isAdmin: false,
        }}>
          <AttractionDetails />
        </AuthContext.Provider>
      </BrowserRouter>);
    });
    expect(attractionService.addUserReview).toHaveBeenCalledTimes(2);

  })
  it("addUserReview should NOT have been called if user is NOT Authenticated", async () => {

    await act(async () => {
      render(<BrowserRouter>
        <AuthContext.Provider value={{
          user: {},
          isAuthenticated: false,
          isAdmin: false,
        }}>
          <AttractionDetails />
        </AuthContext.Provider>
      </BrowserRouter>);
    });
    expect(attractionService.addUserReview).toHaveBeenCalledTimes(1);
  })
  it("AddToPlan button should redirect to login page when usee is not authenticated", async () => {

    await act(async () => {
      render(<BrowserRouter>
        <AuthContext.Provider value={{
          user: {},
          isAuthenticated: false,
          isAdmin: false,
        }}>
          <AttractionDetails />
        </AuthContext.Provider>
      </BrowserRouter>);
    });
    userEvent.click(screen.queryByText('Add to plan'));
    expect(document.location.pathname).toContain(`/login`);
  })
  it("AddToPlan button should call addAttractionToPlan in planService once", async () => {

    await act(async () => {
      render(<BrowserRouter>
        <AuthContext.Provider value={{
          user: testUser,
          isAuthenticated: true,
          isAdmin: true,
        }}>
          <AttractionDetails />
        </AuthContext.Provider>
      </BrowserRouter>);
    });
    userEvent.click(screen.queryByText('Add to plan'));
    expect(planService.addAttractionToPlan).toHaveBeenCalledTimes(1);
  })
  it("Edit button should regirect to Edit attraction page wneh user is Admin", async () => {
    await act(async () => {
      render(<BrowserRouter>
        <AuthContext.Provider value={{
          user: testUser,
          isAuthenticated: true,
          isAdmin: true,
        }}>
          <AttractionDetails />
        </AuthContext.Provider>
      </BrowserRouter>);
    });

    userEvent.click(screen.queryByText('Edit'));

    expect(document.location.pathname).toContain(`/admin/attractions/edit/`);
  })
  it("Delete button should call attractionService.deleteAttraction once and should render modal button", async () => {
    await act(async () => {
      render(<BrowserRouter>
        <AuthContext.Provider value={{
          user: testUser,
          isAuthenticated: true,
          isAdmin: true,
        }}>
          <AttractionDetails />
        </AuthContext.Provider>
      </BrowserRouter>);
    });

    userEvent.click(await screen.findByTestId('delete-button'));
    userEvent.click(await screen.findByTestId('delete-confirmation'));

    expect(document.location.pathname).toContain(`/`);
    expect(attractionService.deleteAttraction).toHaveBeenCalledTimes(1);
  })
})
