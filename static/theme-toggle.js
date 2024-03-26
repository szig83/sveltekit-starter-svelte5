const STORAGE_KEY = 'theme'

// Just in case this runs on the server,
// even though it should be impossible
const defaultTheme = 'dark'

const getTheme = () => {
	if (typeof localStorage !== 'undefined') {
		if (localStorage.getItem(STORAGE_KEY)) {
			return localStorage.getItem(STORAGE_KEY)
		} else {
			return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
		}
	}
	return defaultTheme
}

const setTheme = (theme) => {
	document.documentElement.dataset.theme = theme
}

// set early so no page flashes / CSS is made aware
setTheme(getTheme())

const themeObserver = new MutationObserver(() => {
	const nextTheme = document.documentElement.dataset.theme
	if (nextTheme) {
		localStorage.setItem(STORAGE_KEY, nextTheme)
	}
})
themeObserver.observe(document.documentElement, {
	attributes: true,
	attributeFilter: ['data-theme'],
})

const toggleTheme = () => {
	const currentTheme = getTheme()
	const nextTheme = currentTheme === 'dark' ? 'light' : 'dark'
	setTheme(nextTheme)
}

window.toggleTheme = toggleTheme
