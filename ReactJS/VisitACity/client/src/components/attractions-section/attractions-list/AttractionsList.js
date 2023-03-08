import styles from './AttractionsList.module.css';

import { Attraction } from "../attraction-item/Attraction.js";

export const AttractionsList = ({data}) => {
    return (
    <div className={`card-group m ${styles.cardgroup}`}>
           {data.map(attr => 
                <Attraction key={attr._id} attraction={attr}/>
           )}
        </div>
    );
}