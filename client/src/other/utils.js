export const clone = target => JSON.parse(JSON.stringify(target))

export const getValueFields = (formControls = {}) => {
	return Object.keys(formControls).reduce((res, controlName) => {
		res[controlName] = formControls[controlName].value;
		return res;
	}, {})
}

export const formatDate = date => {
	return Intl.DateTimeFormat('ru-RU', {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	}).format(date)
}

export const convertToCurrency = value => {
	return Intl.NumberFormat('ru-RU', {
		currency: 'rub',
		style: 'currency'
	}).format(value)
}

