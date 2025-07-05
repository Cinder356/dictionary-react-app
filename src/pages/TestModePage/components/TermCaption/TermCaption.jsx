export default function ({ children, ...props }) {
	return <h1 style={{ textAlign: 'center', hyphens: 'auto', wordBreak: 'break-all' }} {...props}>{children}</h1>
}