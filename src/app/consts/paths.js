

export default Object.freeze({
	getView: () => '/view',
	getEditing: (id) => `/editing/${id}`,
	getLearn: (id) => `/learn/${id}`,
	getCards: (id) => `/learn/${id}/cards`
})