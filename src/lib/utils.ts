import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs))
}

/**
 * This function shortens a string to a specified length for the purpose of display.
 * @param { string } originalString The string to be shortened
 * @param { number } maxLength The maximum length of the string
 * @param {number } lastPartLength The length of the last part of the string
 */
function shortenString(
	originalString: string,
	maxLength: number = 30,
	lastPartLength: number = 10,
): string {
	const ellipsis = '...'

	if (originalString.length <= maxLength) {
		return originalString
	}

	const firstPartLength = maxLength - ellipsis.length - lastPartLength
	const firstPart = originalString.slice(0, firstPartLength)
	const lastPart = originalString.slice(lastPartLength * -1)

	return `${firstPart}${ellipsis}${lastPart}`
}

export { cn, shortenString }
