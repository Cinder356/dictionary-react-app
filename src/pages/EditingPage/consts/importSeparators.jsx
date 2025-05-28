// term sep
export const TERM_DEFAULT_SEP = ' '

export const TERM_SEPARATORS = Object.freeze([ // if you change this array restart your app
	{
		component: <span>space</span>,
		sep: ' '
	},
	{
		component: <span> - </span>,
		sep: '-'
	},
	{
		component: <span> : </span>,
		sep: ':'
	},
	{
		component: <span>custom</span>,
		sep: ''
	}
].map((item, index) => ({ ...item, value: String(index) })))

// pair sep
export const PAIR_DEFAULT_SEP = '\n'

export const PAIR_SEPARATORS = Object.freeze([ // if you change this array restart your app
	{
		component: <span>new line</span>,
		sep: '\n'
	},
	{
		component: <span> ; </span>,
		sep: ';'
	},
	{
		component: <span>custom</span>,
		sep: ''
	}
].map((item, index) => ({ ...item, value: String(index) })))