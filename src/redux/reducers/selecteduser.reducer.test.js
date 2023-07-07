import selectedUserReducer from './selecteduser.reducer';

test('Thing does a thing', () => {
    const action = { type: "SET_SELECT_USER", payload: {id: 1}};
    expect(selectedUserReducer(undefined, action)).toStrictEqual({id: 1})
});