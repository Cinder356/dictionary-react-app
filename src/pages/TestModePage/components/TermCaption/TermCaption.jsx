export default function ({ children, ...props }) {
	return <h1 style={{ textAlign: 'center' }} {...props}>{children}</h1>
}