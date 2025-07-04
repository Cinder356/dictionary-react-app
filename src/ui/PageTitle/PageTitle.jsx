
export default function ({ children, ...props }) {
	return <h2 style={{ textAlign: 'center' }} {...props}>{children}</h2>
}