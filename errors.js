const COMMON_ERROR = 500
const NOT_FOUND = 404
const VALIDATION_ERROR = 422
const AUTH_ERROR = 401

module.exports = {
	COMMON: {code: COMMON_ERROR, message: 'Что-то пошло не так'},
	NOT_FOUND: {code: NOT_FOUND, message: 'Не найден'},
	COURSE_NOT_FOUND: {code: NOT_FOUND, message: 'Курс не найден'},
	VALIDATION_ERROR: {code: VALIDATION_ERROR, message: 'Ошибка валидации'},
	AUTH_ERROR: {code: AUTH_ERROR, message: 'Вы не авторизованы'},
	EMAIL_EXIST: {code: VALIDATION_ERROR, message: 'Указанный email уже занят'},
	EMAIL_NOT_EXIST: {code:  VALIDATION_ERROR, message: 'Пользователь не найден'},
	EMAIL_INCORRECT: {code:  VALIDATION_ERROR, message: 'Введите корректный email'},
	PASSWORD_INCORRECT: {code:  VALIDATION_ERROR, message: 'Введите пароль'},
	PASSWORD_NOT_ALPHANUMERIC: {code:  VALIDATION_ERROR, message: 'Пароль должен состоять из букв и цифр'},
	PASSWORD_NOT_SAME: {code:  VALIDATION_ERROR, message: 'Неверный пароль'},
	PASSWORD_MINLENGTH: {code:  VALIDATION_ERROR, message: 'Длина пароля не меньше 6 символов'},
	REPEAT_INCORRECT: {code:  VALIDATION_ERROR, message: 'Введенные пароли не совпадают'},
	NAME_INCORRECT: {code:  VALIDATION_ERROR, message: 'Пожалуйста укажите свое имя или логин'},
	TITLE_INCORRECT: {code: VALIDATION_ERROR, message: 'Укажите название курса'},
	PRICE_INCORRECT: {code: VALIDATION_ERROR, message: 'Введите корректную цену'},
	URL_INCORRECT: {code: VALIDATION_ERROR, message: 'Поправьте url адрес'}
}