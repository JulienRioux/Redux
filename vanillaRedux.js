// Init the store
class Store {
	constructor(reducer, initialState){
		this.reducer = reducer
		this.state = initialState
	}

	getState() {
		return this.state;
	}

	dispatch(update) {
		this.state = this.reducer(this.state, update)
	}
}

// init the default state
const DEFAULT_STATE = {user: {}, contacts : []};

// Create the contacts reducer
const contactsReducer = (state, action) => {
	if(action.type === UPDATE_CONTACT){
		return [...state, action.payload];
	}
	return state;
}

// Create the user reducer
const userReducer = (state, action) => {
	if(action.type === UPDATE_USER){
		return { ...state, ...action.payload}
	}
	if(action.type = UPDATE_CONTACT) {
		return {...state, ...{recentlyAdded: action.payload}}
	}
	return state;
}

// Create the global reducer
const reducer = (state, action) => ({
	user: userReducer(state.user, action),
	contacts: contactsReducer(state.contacts, action),
})

// Create the action creator to update user
const updateUser = update => ({
	type: UPDATE_USER,
	payload: update,
})

// Create the action creator to add contact
const addContact = newContact => ({
	type: UPDATE_CONTACT,
	payload: newContact,
})

// init the store state
const store = new Store(reducer, DEFAULT_STATE);

// Store the action names inside variable (prevent typos)
const UPDATE_USER = "UPDATE_USER";
const UPDATE_CONTACT = "UPDATE_CONTACT";

// Call some user modif
store.dispatch(updateUser({foo: "foo"}));
store.dispatch(updateUser({bar: "bar"}));
store.dispatch(updateUser({foo: "baz"}));
// Call some contact modif
store.dispatch(addContact({name: "Julien Rioux", phone: "1234567890"}));
store.dispatch(addContact({name: "Julia Ouellet", phone: "5678123490"}));
store.dispatch(addContact({name: "Yeti the Cat", phone: "7908123456"}));

// Log the store state
console.log(store.getState());
