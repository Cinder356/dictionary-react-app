

export default Object.freeze({
  getHome: () => '/',
  getView: () => '/view',
  getEditing: (id) => `/editing/${id}`,
  getLearn: (id) => `/learn/${id}`,
  getCards: (id) => `/learn/${id}/cards`,
  getTest: (id) => `/learn/${id}/test`
})
