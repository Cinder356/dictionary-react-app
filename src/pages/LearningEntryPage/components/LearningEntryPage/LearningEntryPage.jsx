import LearningSettingsForm from "../LearningSettingsForm/LearningSettingsForm"
import useUrlValidModuleId from "../../../../app/hooks/useUrlValidModuleId"

export default function () {
	const id = useUrlValidModuleId()

	return (
		<>
			<LearningSettingsForm moduleId={id} />
		</>
	)
}