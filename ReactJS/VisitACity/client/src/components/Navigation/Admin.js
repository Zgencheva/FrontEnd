export const Admin = () =>{
    return (
        <div className="dropdown">
        <label>Admin:
        <select >
            <option value="createAttraction" >Create Attraction</option>
            <option value="createRestaurant" >Create Restaurant</option>
            <option value="createCity" >Create City</option>
            <option value="createCountry">Create Country</option>
            <option value="deleteCity" >Delete city</option>
            <option value="deleteCountry">Delete Country</option>
        </select>
        </label>
    </div>
    );
}