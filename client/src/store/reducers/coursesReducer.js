import * as types from '../actions/actionsTypes'

const initState = {
	modeView: 'card',
	direction: 'asc',
	filter: 'title'
}

export const coursesReducer = (state = initState, action) => {
	switch (action.type) {
		case types.CHANGE_SORT_FILTER:
			return {...state, filter: action.payload}
		case types.SWITCH_MODE_VIEW:
			return {...state, modeView: state.modeView === 'card' ? 'table' : 'card'}
		case types.TOGGLE_DIRECTION:
			return {...state, direction: state.direction === 'asc' ? 'desc' : 'asc'}
		default:
			return state;
	}
}