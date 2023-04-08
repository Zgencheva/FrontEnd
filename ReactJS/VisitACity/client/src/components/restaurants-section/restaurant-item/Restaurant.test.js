import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Restaurant } from './Restaurant.js';
import { BrowserRouter } from 'react-router-dom';
import { testRestaurant } from '../../../constants/TestConstants.js';
import { act } from 'react-dom/test-utils';

describe('Restaurant component', () => {

    it('should show restaurant details',async () => {
        await act(async () => {
            render(<BrowserRouter>
                <Restaurant restaurant={testRestaurant} />
            </BrowserRouter>);
          });
          const displayedImage = document.querySelector("img");
          expect(displayedImage.src).toContain(testRestaurant.image);
              expect(screen.queryByText(testRestaurant.city)).toBeInTheDocument();
              expect(screen.queryByText(testRestaurant.name)).toBeInTheDocument();
              expect(screen.getByText(/Address: Nqkyde v Plovdiv i v Sofia/i)).toBeInTheDocument();
    });
   
    it('should redirect to restaurant details when Details button is clicked', async () => {

        await act(async () => {
            render(<BrowserRouter>
                <Restaurant restaurant={testRestaurant} />
            </BrowserRouter>);
          });
          await act(async()=> {
            fireEvent.click(await screen.findByText('Details'));
          })
          expect(document.location.pathname).toContain(`/restaurants/${testRestaurant._id}`);

   })
    it('should redirect to restaurant details when user click on the image', async () => {

        await act(async () => {
            render(<BrowserRouter>
                <Restaurant restaurant={testRestaurant} />
            </BrowserRouter>);
          });
          await act(async ()=> {
            fireEvent.click(await screen.findByTestId('img'));
          })
          expect(document.location.pathname).toContain(`/restaurants/${testRestaurant._id}`);

    })
})