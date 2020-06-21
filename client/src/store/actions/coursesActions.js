import * as types from './actionsTypes'

export function actionToggleDuration() {
	return {
		type: types.TOGGLE_DURATION
	}
}

export function actionSwitchMode() {
	return {
		type: types.SWITCH_MODE_VIEW
	}
}

export function actionChangeSortFilter(filter) {
	return {
		type: types.CHANGE_SORT_FILTER,
		payload: filter
	}
}