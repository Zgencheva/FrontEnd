import { render, screen, } from '@testing-library/react';

import '@testing-library/jest-dom';
import { RestaurantList } from './RestaurantList.js';
import { BrowserRouter } from 'react-router-dom';
import { testRestaurants, testRestaurant } from '../../../constants/TestConstants.js';
import { act } from 'react-dom/test-utils';

describe('AttractionList component', () => {

    it('should render all attractions', async () => {
        await act(async () => {
            render(<BrowserRouter>
                <RestaurantList data={testRestaurants} />
            </BrowserRouter>);
        });
        const displayedImage = document.querySelector("img");
        expect(displayedImage.src).toContain(testRestaurant.image);
            expect(screen.queryByText(testRestaurant.city)).toBeInTheDocument();
            expect(screen.queryByText(testRestaurant.name)).toBeInTheDocument();
            expect(screen.getByText(/Address: Nqkyde v Plovdiv i v Sofia/i)).toBeInTheDocument();
    });
    it('should show no result if empty attractions list passed', async () => {
        await act(async () => {
            render(<BrowserRouter>
                <RestaurantList data={[]} />
            </BrowserRouter>);
        });

        expect(screen.queryByText(testRestaurant.city)).toBeNull();
        expect(screen.queryByText(testRestaurant.name)).toBeNull();
    });
})