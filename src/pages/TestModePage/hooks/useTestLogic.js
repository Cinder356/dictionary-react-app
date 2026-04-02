import { useState } from "react";
import useUrlValidModuleId from "@/app/hooks/useUrlValidModuleId";
import useUrlMixedDict from "@/app/hooks/useUrlMixedDict";
import shuffleArray from "@/app/helpers/shuffleArray";
import { addRecentlyUsedModule, incrementSessionsCompleted } from "@/app/helpers/statsController";

export default function () {
  const id = useUrlValidModuleId();
  const [dict, setDict] = useUrlMixedDict(id)
  const [currentDictIndex, setCurrentDictIndex] = useState(0)
  const [progressValue, setProgressValue] = useState(0)
  const [progressModalState, setProgressModalState] = useState(false)
  const [correctAnswersAmount, setCorrectAnswersAmount] = useState(0)

  const handleProceed = async (isCorrect) => {
    if (isCorrect) setCorrectAnswersAmount(prev => prev + 1)
    setProgressValue(prev => prev + 1)
    
    const isLastQuestion = currentDictIndex + 1 === dict.length
    
    if (isLastQuestion) {
      setProgressModalState(true)
      await addRecentlyUsedModule(id)
      await incrementSessionsCompleted()
    } else {
      setCurrentDictIndex(prev => prev + 1)
    }
  }

  const handleRestart = () => {
    setCorrectAnswersAmount(0)
    setCurrentDictIndex(0)
    setProgressValue(0)
    setProgressModalState(false)
    setDict(prev => [...shuffleArray(prev)])
  }

  return {
    dict,
    currentDictIndex,
    progressValue,
    progressModalState,
    correctAnswersAmount,
    handleProceed,
    handleRestart
  }
}
