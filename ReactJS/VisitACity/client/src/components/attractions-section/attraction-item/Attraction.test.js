import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { Attraction } from './Attraction.js';
import { BrowserRouter } from 'react-router-dom';

describe('Attraction component', () => {
    const testAttraction = {
        "_id": "62cde487-6b82-468f-bdbf-fcfe2d7c779b",
        "name": "Dolphinarium",
        "address": "Saltanat primorski park",
        "attractionUrl": "https://dolphinariumvarna.bg/",
        "type": "DayTours",
        "price": 25,
        "city": "Varna", 
        "country": "Bulgaria",
        "image": "https://res.cloudinary.com/dllgr6ope/image/upload/v1678911306/62cde487-6b82-468f-bdbf-fcfe2d7c779b_vajldw.jpg",
        "description": "Yes, you can swim with dolphins. Dolphins can have fun.",
        "userReviews": []
    }
    const testAttractionId = "62cde487-6b82-468f-bdbf-fcfe2d7c779b";

    test('Show name', ()=> {

        render(<BrowserRouter><Attraction attraction={testAttraction}/></BrowserRouter>);

        expect(screen.queryByText(testAttraction.name)).toBeInTheDocument();
    });
    test('Click info should redirect to attraction details', async ()=> {

        render(<BrowserRouter><Attraction attraction={testAttraction}/></BrowserRouter>);
        await userEvent.click(screen.queryByText('Details'));
        expect(document.location.pathname).toContain(`/attractions/${testAttractionId}`);
    })
})