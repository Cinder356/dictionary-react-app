import { useEffect, useRef, useState, useCallback } from 'react'
import TermCaption from '../TermCaption/TermCaption'
import Input from '@/ui/Input/Input'
import Button from '@/ui/Button/Button'
import './InputWordMode.scss'

export default function ({ dict, currentDictIndex, onAnswer, modeEnterHandlerRef }) {
  const [isAnswered, setIsAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [inputText, setInputText] = useState('')
  const inputTextRef = useRef('');
  const inputRef = useRef()

  useEffect(() => {
    setIsAnswered(false)
    setIsCorrect(false)
    setInputText('')
    inputTextRef.current = ''
  }, [dict, currentDictIndex])

  const handleChecking = () => {
    if (isAnswered) return
    const terms = dict[currentDictIndex].left
      .replace(/\s/g, '')
      .toLowerCase()
      .split(',')
    const defs = inputTextRef.current
      .replace(/\s/g, '')
      .toLowerCase()
      .split(',')
    const correctness = defs.every(def => terms.includes(def)) && defs

    setIsCorrect(correctness)
    setIsAnswered(true)
    onAnswer(correctness)
  }

  const enterHandler = () => {
    handleChecking()
    inputRef.current?.blur()
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setInputText(value);
    inputTextRef.current = value;
  }

  return (
    <>
      <TermCaption>{dict[currentDictIndex].right}</TermCaption>
      {isAnswered && <h3 id='input-word-correct-answer' translate='no'>{dict[currentDictIndex].left}</h3>}
      <div id='test-definition-input-container'>
        <Input
          ref={inputRef}
          id='test-definition-input'
          isWrong={isAnswered && !isCorrect}
          isCorrect={isAnswered && isCorrect}
          value={inputText}
          onChange={handleInputChange}
          onFocus={() => modeEnterHandlerRef.current = enterHandler}
          onBlur={() => modeEnterHandlerRef.current = null}
          translate='no'
        />
        <Button id='test-definition-submit-btn' onClick={handleChecking}>Check</Button>
      </div>
    </>
  )
}
