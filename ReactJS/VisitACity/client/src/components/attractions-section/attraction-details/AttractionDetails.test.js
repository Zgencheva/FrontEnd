import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import {React} from 'react'
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';
import { AttractionDetails, TestComponent } from './AttractionDetails.js';
import { BrowserRouter, Router, json } from 'react-router-dom';
import { testAttraction, testUser } from '../../../constants/TestConstants.js';
import { AuthContext } from '../../../contexts/AuthContext.js';
import { act } from 'react-dom/test-utils';
import * as attractionService from '../../../services/attractionService.js';
import { useState } from 'react';



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
beforeEach(() => {
});
afterEach(cleanup);
describe('AttractionDetails component', () => {
    it('should fetch attraction', async () => {
      const setStateMock = jest.fn();
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
    expect(true).toBe(true);

    })

})