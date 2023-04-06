import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import '@testing-library/jest-dom';
import { Attraction } from './Attraction.js';
import { BrowserRouter } from 'react-router-dom';
import { testAttraction, testAttractionWthUserReviews } from '../../../constants/TestConstants.js';
import { act } from 'react-dom/test-utils';

describe('Attraction component', () => {

    it('should show attraction details',async () => {
        await act(async () => {
            render(<BrowserRouter>
                <Attraction attraction={testAttraction} />
            </BrowserRouter>);
          });
          const displayedImage = document.querySelector("img");
          expect(displayedImage.src).toContain(testAttraction.image);
              expect(screen.queryByText(testAttraction.city)).toBeInTheDocument();
              expect(screen.queryByText(testAttraction.name)).toBeInTheDocument();
              expect(screen.getByText(/Price: 25/i)).toBeInTheDocument();
              expect(screen.getByText(/Address: Saltanat primorski park/i)).toBeInTheDocument();
              expect(screen.getByText(/Revied by 0 adventurers/i)).toBeInTheDocument();
    });
    it('should show user reviews when there are some',async () => {
        await act(async () => {
            render(<BrowserRouter>
                <Attraction attraction={testAttractionWthUserReviews} />
            </BrowserRouter>);
          });
        expect(screen.getByText(/Revied by 1 adventurer/i)).toBeInTheDocument();
    });
    it('should show user reviews when there are some',async () => {
        await act(async () => {
            render(<BrowserRouter>
                <Attraction attraction={testAttractionWthUserReviews} />
            </BrowserRouter>);
          });
        expect(screen.getByText(/Revied by 1 adventurer/i)).toBeInTheDocument();
    });
   
    it('should redirect to attraction details when Details button is clicked', async () => {

        await act(async () => {
            render(<BrowserRouter>
                <Attraction attraction={testAttraction} />
            </BrowserRouter>);
          });
        userEvent.click(screen.queryByText('Details'));
        expect(document.location.pathname).toContain(`/attractions/${testAttraction._id}`);
    })
    it('should redirect to attraction details when user click on the image', async () => {

        await act(async () => {
            render(<BrowserRouter>
                <Attraction attraction={testAttraction} />
            </BrowserRouter>);
          });
          const displayedImage = document.querySelector("img");
        userEvent.click(displayedImage);
        expect(document.location.pathname).toContain(`/attractions/${testAttraction._id}`);
    })
})