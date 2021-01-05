import {USER_LOGIN, SET_POSTS, USER_LOGOUT} from '../types';

// import history from "../../Utilities/history";

import {setPosts} from "../Actions/postsAction";
import {userLogin, userLogout} from "../Actions/userAction";

const initState = {
    posts: [],
    user: undefined,
    isUser: false,
    isAdmin: false
}

const Reducer = (state = initState, action) => {
    switch (action.type){
        case SET_POSTS:
            return {
                ...state,
                posts: action.playLoad
            }

        case USER_LOGIN:
           return {
                ...state,
                user: action.playLoad,
               isUser: true,
                isAdmin: action.playLoad.AccessLevel==='ADMIN'
            }

        case USER_LOGOUT:
            return {
                ...state,
                user: undefined,
                isUser: false,
                isAdmin: false
            }

        default:
            return state;
    }
}

export default Reducer;


export const loadPosts = () => async (dispatch, getState) => {
    await fetch('/home')
        .then(res => res.json())
        .then(res => dispatch(setPosts(res)));

}

export const loadUser = (user) =>  async (dispatch, getState) => {
    const {username, password} = user;
    await  fetch('/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(res => res.json())
            .then(res => {
                dispatch(userLogin(res));
            }).catch(err => {
                console.log('err: ', err);
        })
}

export const deleteUser = () =>  (dispatch, getState) => {
    // await fetch('/logout')
    //     .then(res => res.json())
    //     .then(res => {console.log(res.msg)});
    dispatch(userLogout());
}