
export default function (currentSep, currentCusomSep, defaultSep) {
	let sep = currentSep
	if (!sep) {
		sep = currentCusomSep
		if (!sep)
			sep = defaultSep
	}
	return sep
}