export const getUserLanguage = () => {
	const language = navigator.language || (navigator as any).userLanguage

	if (navigator.languages && navigator.languages.length > 0) {
		return navigator.languages[0]
	}

	return language
}
