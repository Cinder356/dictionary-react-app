import { addModule, editModule } from "@/app/helpers/moduleController"
import paths from '/src/app/consts/paths'

export default function (id, dict, moduleMetaData, navigate = null) {
	(async () => {
		if (id < 0) {
			const receivedID = await addModule(moduleMetaData, dict)
			if (navigate)
				navigate(paths.getEditing(receivedID))
			return
		}
		console.log('save')
		return editModule(id, moduleMetaData, dict)
	})()
}