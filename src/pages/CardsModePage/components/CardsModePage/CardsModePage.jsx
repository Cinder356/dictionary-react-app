import PageTitle from '../../../../ui/PageTitle/PageTitle'
import CardsDeck from '../CardsDeck/CardsDeck'
import useUrlValidModuleId from '../../../../app/hooks/useUrlValidModuleId'

export default function () {
	const id = useUrlValidModuleId()
	if (id < 0) return <PageTitle>Wrong Module</PageTitle>

	return (
		<>
			<div className='content-wrapper'>
				<PageTitle>Cards: {id}</PageTitle>
			</div>
			<CardsDeck id={id} />
		</>
	)
}