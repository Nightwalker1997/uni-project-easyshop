import { SET_POSTS } from '../types';

export const setPosts = (posts) => {
    return{
        type: SET_POSTS,
        playLoad: posts
    }
}
