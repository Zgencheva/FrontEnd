import { useState, useEffect } from 'react';
import * as userService from '../../services/userService.js';

import { User } from "./user-item/User.js";
import { UserInfo } from "./user-info/UserInfo.js";
import { UserAddorEdit } from "./user-add-edit/UserAddorEdit.js";
import { UserDelete } from "./user-delete/UserDelete.js";
import { UserActions } from './UserConstants.js';
import { AddUserButton } from '../common/AddUserButton.js'

export const UserSection = () => {
    const[users, setUsers] = useState([]);
    const [userAction, setUserAction] = useState({ user: null, action: null });

    useEffect(()=> {
        userService.getAll()
            .then(users => setUsers(users));
        }, []);

    const ActionClickHandler = async (userId, actionType) => {
        const user = userId !=null ? await userService.getUser(userId) : null;
        setUserAction({
            user: user,
            action: actionType,
        });

    };
    const OnCreateUserHandler = async (userData) => {
        await userService.createUser(userData)
        .then(user=> {
            setUsers(oldUsers => [...oldUsers, user])
            CloseHandler();
        });
    };
    const OnEditUserHandler = async (userData) => {

        await userService.editUser(userAction.user._id, userData)
        .then(user=> {
            setUsers(oldUsers => [...oldUsers.filter(x=> x._id != userAction.user._id), user])
            CloseHandler();
        });
    };

    const OnDeleteHandler = async () => {
        await userService.deleteUser(userAction.user._id)
        .then(userId => {
            setUsers(oldUsers => oldUsers.filter(user => user._id != userId));
            CloseHandler();
        })
    }
    const CloseHandler = () => {
        setUserAction({ user: null, action: null });
    };

    return (
        <>
            <div className="table-wrapper">

                {userAction.action == UserActions.Info && <UserInfo user={userAction.user} onClose={CloseHandler} />}
                {userAction.action == UserActions.Edit && <UserAddorEdit user={userAction.user} onClose={CloseHandler} onEdit={OnEditUserHandler} onCreate={OnCreateUserHandler}/>}
                {userAction.action == UserActions.Delete && <UserDelete user={userAction.user} onClose={CloseHandler} onDelete={OnDeleteHandler}/>}
                {userAction.action == UserActions.Add && <UserAddorEdit onClose={CloseHandler} onCreate={OnCreateUserHandler}/>}

                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                Image
                            </th>
                            <th>
                                First name<svg aria-hidden="true" focusable="false" data-prefix="fas"
                                    data-icon="arrow-down" className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Last name<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                    className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Email<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                    className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Phone<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                    className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Created
                                <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                    data-icon="arrow-down" className="icon active-icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Table row component */}
                        {users.map(user =>
                            <tr key={user._id}>
                                <User user={user} onActionClick={ActionClickHandler} />
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <AddUserButton onActionClick={ActionClickHandler} />
        </>
    );
}