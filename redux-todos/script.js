// We need a reducer
// We need some redux store
// We need some way of changing the state

const initialState = {
	todos: [],
	id: 0,
}

const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";


function rootReducer(state=initialState, action){
	let newState = { ...state }
	switch (action.type){
		case ADD_TODO:
		  // add a todo
			// debugger
			newState.id++;
			return {
				...newState,
				todos: [...newState.todos, { task: action.task, id: ""+newState.id }]
			};
		case REMOVE_TODO:
		  // remove a todo
			// debugger
			return {
				...newState,
				todos: newState.todos.filter(todo => todo.id !== action.id)
			};

		default:
		  return newState;
	}
}

const store = Redux.createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


$(document).ready(function(){

	$("ul").on("click", "button", (event)=>{
		// e.preventDefault();
		store.dispatch({
			type: REMOVE_TODO,
			id: event.target.id
		});
		$(event.target).parent().remove()
	});

	$("form").on("submit", (e) => {
		e.preventDefault();
		let newTask = $("#task").val();
		store.dispatch({
			type: "ADD_TODO",
			task: newTask
		});
		let currentState = store.getState();
		let $newLi = $("<li>", {
			text: newTask
		});
		let $newButton = $("<button>", {
			text: "X",
			id: currentState.id
		})
		$newLi.append($newButton);
		$("#todos").append($newLi);
		$("form").trigger("reset");
	})
})
