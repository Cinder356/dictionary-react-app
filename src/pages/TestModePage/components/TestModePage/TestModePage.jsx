import PageTitle from "@/ui/PageTitle/PageTitle"
import TestWindow from "../TestWindow/TestWindow"
import ProgressBar from "@/ui/ProgressBar/ProgressBar";
import ProgressModal from '@/components/ProgressModal/ProgressModal'
import useTestLogic from "../../hooks/useTestLogic";

export default function () {
	const {
		dict,
		currentDictIndex,
		progressValue,
		progressModalState,
		correctAnswersAmount,
		handleProceed,
		handleRestart
	}
		= useTestLogic()


	if (dict.length <= 0) return <PageTitle className='content-wrapper'>Empty module</PageTitle>
	return (
		<>
			<PageTitle className='content-wrapper'>Test</PageTitle>
			<ProgressBar progress={progressValue / dict.length * 100} />
			<TestWindow dict={dict} currentDictIndex={currentDictIndex} proceed={handleProceed} />
			<ProgressModal isOpen={progressModalState} fails={dict.length - correctAnswersAmount} succeses={correctAnswersAmount} onRestart={handleRestart} />
		</>
	)
}