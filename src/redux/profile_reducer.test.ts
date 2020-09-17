import profileReducer, {actions} from "./profile_reducer"
let state = {
    posts: [
        {id: 1, message: 'hi, how do you do?', likesCount: 1},
        {id: 2, message: 'Hello World',  likesCount: 2},
        {id: 3, message: 'What is your name?',  likesCount: 1}
    ],
    profile: null,
    status: ""
};
it('lehngth of posts should be incremented', () =>{

    let action = actions.addNewPostActionCreator("it-cam");
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(4);
});
it('Message of new post should bi it-com', () =>{

    let action = actions.addNewPostActionCreator("it-cam");
    let newState = profileReducer(state, action);
    expect(newState.posts[3].message).toBe("it-cam");
});
it('After deleting post lenght should be deleted', () =>{

    let action = actions.deletePost(1);
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(2);
});