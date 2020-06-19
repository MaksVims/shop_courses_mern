const VALIDATION_ERROR = 422
const COMMON_ERROR = 500

module.exports = {
	COMMON: {code: COMMON_ERROR, message: 'Что-то пошло не так'},
	VALIDATION_ERROR: {code: VALIDATION_ERROR, message: 'Ошибка валидации'},
	EMAIL_EXIST: {code: VALIDATION_ERROR, message: 'Указанный email уже занят'},
	EMAIL_NOT_EXIST: {code:  VALIDATION_ERROR, message: 'Пользователь не найден'},
	EMAIL_INCORRECT: {code:  VALIDATION_ERROR, message: 'Введите корректный email'},
	PASSWORD_INCORRECT: {code:  VALIDATION_ERROR, message: 'Введите пароль'},
	PASSWORD_NOT_SAME: {code:  VALIDATION_ERROR, message: 'Неверный пароль'},
	PASSWORD_MINLENGTH: {code:  VALIDATION_ERROR, message: 'Длина пароля не меньше 6 символов'},
	REPEAT_INCORRECT: {code:  VALIDATION_ERROR, message: 'Введенные пароли не совпадают'},
	NAME_INCORRECT: {code:  VALIDATION_ERROR, message: 'Пожалуйста укажите свое имя или логин'},
}