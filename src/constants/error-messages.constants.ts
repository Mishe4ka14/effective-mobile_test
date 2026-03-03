export const ERROR_MESSAGES = {
    INTERNAL_SERVER: 'Внутренняя ошибка сервера',
    
    REQUIRED_FIELDS: 'Все поля обязательны: fullName, birthDate, email, password',
    INVALID_EMAIL: 'Некорректный формат email',
    INVALID_DATE: 'Некорректный формат даты рождения',
    EMAIL_PASSWORD_REQUIRED: 'Email и пароль обязательны',
    
    EMAIL_EXISTS: 'Пользователь с таким email уже существует',
    INVALID_CREDENTIALS: 'Неверный email или пароль',
    USER_BLOCKED: 'Пользователь заблокирован',
    
    ACCESS_DENIED: 'Доступ запрещен',
    UNAUTHORIZED: 'Неавторизованный доступ',
} as const;