const cyrillicPattern = /^[а-яА-ЯёЁ\s-]+$/
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const latinPattern = /^[a-zA-Z0-9-]+$/
const numberPattern = /^[0-9-]+$/

export const validationFunc = (
	value,
	name,
	setUser,
  user,
	setEmailState,
	setLoginState,
	setPasswordState,
  pageType
) => {
	switch (name) {
		case 'FIO':
			setUser({
				...user,
				FIO: { value, isValid: !cyrillicPattern.test(value) }
			})
			break
		case 'number':
			setUser({
				...user,
				number: { value, isValid: !numberPattern.test(value) }
			})
			break
		case 'login':
			setLoginState(false)
			setUser({
				...user,
				login: { value, isValid: !latinPattern.test(value) }
			})
			break
		case 'email':
			setEmailState(false)
			setUser({
				...user,
				email: { value, isValid: !emailPattern.test(value) }
			})
			break
		case 'password':
			setPasswordState(false)
			setUser({
				...user,
				password: {
					value,
					isValid: pageType === 'login' ? false : value.length < 6
				}
			})
			break
		case 'passwordRepeat':
			setUser({
				...user,
				passwordRepeat: { value, isValid: value !== user.password.value }
			})
			break
	}
}
