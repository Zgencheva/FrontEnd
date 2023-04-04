import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';
import { AttractionDetails, TestComponent } from './AttractionDetails.js';
import { BrowserRouter, Router, json } from 'react-router-dom';
import { testAttraction, testUser } from '../../../constants/TestConstants.js';
import { AuthContext } from '../../../contexts/AuthContext.js';
import { act } from 'react-dom/test-utils';


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
      jest.mock('react-router-dom', () => {
        return {
          useParams: () => ({
            attractionId: "62cde487-6b82-468f-bdbf-fcfe2d7c779b"
          })
        }
      })
      
      jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(JSON.stringify(testAttraction))
      })
    );

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
    screen.debug(screen.getByText("Address"));
    expect(addressText.toBeInTheDocument());

    })

})