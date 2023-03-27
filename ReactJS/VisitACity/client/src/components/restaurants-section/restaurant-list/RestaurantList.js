import styles from './RestaurantList.module.css';

import { Restaurant } from "../restaurant-item/Restaurant.js";

export const RestaurantList = ({data}) => {
    return (
    <div className={`card-group m ${styles.cardgroup}`}>
           {data.map(rest => 
                <Restaurant key={rest._id} restaurant={rest}/>
           )}
        </div>
    );
}