import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import React, { useState as useStateMock } from 'react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { AttractionDetails } from './AttractionDetails.js';
import { BrowserRouter} from 'react-router-dom';
import { testAttraction, testUser } from '../../../constants/TestConstants.js';
import { AuthContext } from '../../../contexts/AuthContext.js';
import { act } from 'react-dom/test-utils';
// import { getById } from '../../../services/attractionService.js';
// import { requester } from '../../../helpers/requester.js';

// const wrapper = ({children}) => (
//   <BrowserRouter>
//     <AuthContext.Provider value={{ 
//       user: testUser,
//       isAuthenticated: true,
//       isAdmin: true,
//      }}>
//       {children}
//   </AuthContext.Provider> 
//   </BrowserRouter>         
// )

describe('AttractionDetails component', () => {
  beforeEach(() => {
    const requester = require('../../../helpers/requester.js');
    const promise1 = Promise.resolve(testAttraction)
    const mock = jest.fn().mockReturnValue(promise1 );
    requester.requester = mock;
  });
  afterEach(()=> cleanup());
  it('should show Admin buttons when user is admin',async () => {
  await act(async () => {
    render(<BrowserRouter>
      <AuthContext.Provider value={{ 
        user: testUser,
        isAuthenticated: true,
        isAdmin: true,
       }}>
        <AttractionDetails/>
    </AuthContext.Provider> 
    </BrowserRouter>       );
  });
  const editButton = screen.getByText("Edit");
  const deletBeutton = screen.getAllByText("Delete");

  expect(editButton).toBeInTheDocument();
  expect(deletBeutton).toHaveLength(2);

  });
   it('should NOT show Admin buttons when user is not admin',async () => {
    await act(async () => {
      render(<BrowserRouter>
        <AuthContext.Provider value={{ 
          user: testUser,
          isAuthenticated: true,
          isAdmin: false,
         }}>
          <AttractionDetails/>
      </AuthContext.Provider> 
      </BrowserRouter>       );
    });
    expect(screen.queryByText("Edit")).toBeNull();
    expect(screen.queryByText("Delete")).toBeNull();

    })

  it("render testAttraction when user is not Authenticated", async ()=> {
      await act(async () => {
      render(<BrowserRouter>
        <AuthContext.Provider value={{ 
          user: testUser,
          isAuthenticated: false,
          isAdmin: false,
         }}>
          <AttractionDetails/>
      </AuthContext.Provider> 
      </BrowserRouter>       );
    });
    expect(screen.getByText(testAttraction.name)).toBeInTheDocument();
    // requester.requester.mockClear();
  })
  it("render testAttraction when user is Authenticated", async ()=> {
   
    await act(async () => {
      render(<BrowserRouter>
        <AuthContext.Provider value={{ 
          user: testUser,
          isAuthenticated: true,
          isAdmin: false,
         }}>
          <AttractionDetails/>
      </AuthContext.Provider> 
      </BrowserRouter>       );
    });
    expect(screen.getByText(testAttraction.name)).toBeInTheDocument();
    // requester.requester.mockClear();
  })
   
})

// function setupFetchStub(data) { 
//     return new Promise((resolve) => {
//       resolve({
       
//           Promise.resolve({
//             data,
//           }),
//       })
//     })

// }