// We need a reducer
// We need some redux store
// We need some way of changing the state

const initialState = {
	count: 0
}

const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

function rootReducer(state=initialState, action){
	let newState = { ...state };

	switch (action.type){
		case INCREMENT:
			newState.count++;
			return newState

		case DECREMENT:
			newState.count--;
			return newState

		default:
		  return newState;
	}
}

const store = Redux.createStore(rootReducer);

const increment = () => {
	return {
		type: INCREMENT
	}
}

const decrement = () => {
	return {
		type: DECREMENT
	}
}

function changeDOM() {
	let currentState = store.getState();
	$("#counter").text(currentState.count);
}

$(document).ready(()=>{
	changeDOM()
})

$(document).ready(function(){
	$("#increment").on("click", function(){
		// dispatch some action to increment the count
		store.dispatch(increment())
		changeDOM()
	})
})


$(document).ready(function(){
	$("#decrement").on("click", function(){
		// dispatch some action to decrement the count
    store.dispatch(decrement())
		changeDOM()
	})
})
