export const clone = target => JSON.parse(JSON.stringify(target))

export const getValueFields = (formControls = {}) => {
	return Object.keys(formControls).reduce((res, controlName) => {
		res[controlName] = formControls[controlName].value;
		return res;
	}, {})
}