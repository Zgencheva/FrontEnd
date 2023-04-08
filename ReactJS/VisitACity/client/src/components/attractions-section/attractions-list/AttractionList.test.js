import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { AttractionsList } from './AttractionsList.js';
import { BrowserRouter } from 'react-router-dom';
import { testAttractions, testAttraction } from '../../../constants/TestConstants.js';
import { act } from 'react-dom/test-utils';

describe('AttractionList component', () => {

    it('should render all attractions', async () => {
        await act(async () => {
            render(<BrowserRouter>
                <AttractionsList data={testAttractions} />
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
    it('should show no result if empty attractions list passed', async () => {
        await act(async () => {
            render(<BrowserRouter>
                <AttractionsList data={[]} />
            </BrowserRouter>);
        });

        expect(screen.queryByText(testAttraction.city)).toBeNull();
        expect(screen.queryByText(testAttraction.name)).toBeNull();
    });
})