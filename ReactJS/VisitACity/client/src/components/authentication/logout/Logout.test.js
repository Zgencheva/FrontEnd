import { render, cleanup, } from '@testing-library/react';
import React, { useContext, useState as useStateMock } from 'react';
import '@testing-library/jest-dom';
import { BrowserRouter, Navigate } from 'react-router-dom';
import { testUser } from '../../../constants/TestConstants.js';
import { AuthContext } from '../../../contexts/AuthContext.js';
import { act } from 'react-dom/test-utils';
import * as authService from '../../../services/authServices.js';
import { Logout } from './Logout.js';
import { routes } from '../../../constants/routes.js';

describe('Logout component', () => {
    beforeEach(() => {
        const authService = require('../../../services/authServices.js');
        authService.logout = jest.fn();
      
      });
      afterEach(() => cleanup);
    it('should show redirect to home page upon successfull logout',async () => {
        await act(async () => {
            render(<BrowserRouter>
                <AuthContext.Provider value={{
                  user: testUser,
                  isAuthenticated: true,
                  isAdmin: true,
                  onLogout: ()=> {authService.logout()}}
                }>
                  <Logout />
                </AuthContext.Provider>
              </BrowserRouter>);
          });
          expect(authService.logout).toHaveBeenCalledTimes(1);
          expect(document.location.pathname).toContain(`/`);          
    });
    
})