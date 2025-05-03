import PageTitle from "/src/ui/PageTitle/PageTitle"
import CardList from "../CardList/CardList"

export default function () {

	return (
		<>
			<div className="content-wrapper">
				<PageTitle>View</PageTitle>
			</div>
			<CardList />
		</>
	)
}

//	{moduleDict.map(translation => <Translation key={translation.id} id={translation.id} left={translation.left} right={translation.right} onRemove={removePair} onEdit={editPair} />)}
