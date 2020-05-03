import profileReducer, {addNewPostActionCreator, deletePost} from "./profile_reducer"
let state = {
    posts: [
        {id: 1, message: 'hi, how do you do?'},
        {id: 2, message: 'Hello World'},
        {id: 3, message: 'What is your name?'}
    ],
    profile: null,
    status: ""
};
it('lehngth of posts should be incremented', () =>{

    let action = addNewPostActionCreator("it-cam");
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(4);
});
it('Message of new post should bi it-com', () =>{

    let action = addNewPostActionCreator("it-cam");
    let newState = profileReducer(state, action);
    expect(newState.posts[3].message).toBe("it-cam");
});
it('After deleting post lenght should be deleted', () =>{

    let action = deletePost(1);
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(2);
});