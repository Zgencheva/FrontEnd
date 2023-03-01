import { UserActions } from "../user-section/UserConstants.js";

export const AddUserButton = ({onActionClick}) => {
    return (
        <button className="btn-add btn" onClick={()=> onActionClick(null, UserActions.Add)}>Add new user</button>
    );
}