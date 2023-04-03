import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import '@testing-library/jest-dom';
import { Attraction } from './Attraction.js';
import { BrowserRouter } from 'react-router-dom';
import { testAttraction } from '../../../constants/TestConstants.js';

describe('Attraction component', () => {

    it('Show attraction card details', () => {

        render(<BrowserRouter>
            <Attraction attraction={testAttraction} />
        </BrowserRouter>);

        expect(screen.getByText(testAttraction.name)).toBeInTheDocument();
    });
    it('Show attraction city details', () => {

        render(<BrowserRouter>
            <Attraction attraction={testAttraction} />
        </BrowserRouter>);

        expect(screen.queryByText(testAttraction.city)).toBeInTheDocument();
    });
    it('Click Details should redirect to attraction details', async () => {

        render(<BrowserRouter>
            <Attraction attraction={testAttraction} />
        </BrowserRouter>);
        userEvent.click(screen.queryByText('Details'));
        expect(document.location.pathname).toContain(`/attractions/${testAttraction._id}`);
    })
})