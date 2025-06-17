import './ImportModal.scss'
import Modal from "@/ui/Modal/Modal"
import Button from "@/ui/Button/Button"
import Input from '@/ui/Input/Input'
import RadioGroup from '@/ui/RadioGroup/RadioGroup'
import btnColors from '@/app/consts/btnColors'
import { useCallback, useEffect, useContext, useState } from 'react'
import { TERM_SEPARATORS, TERM_DEFAULT_SEP, PAIR_SEPARATORS, PAIR_DEFAULT_SEP } from '../../consts/importSeparators'
import getValidSeparator from '../../helpers/getValidSeparator'
import ModuleDataContext from '../../contexts/moduleData/ModuleDataContext'


export default function ({ isOpen, onClose }) {
	const { addPair } = useContext(ModuleDataContext)
	const [currentTermSeparatorI, setCurrentTermSeparatorI] = useState(TERM_SEPARATORS[0].value)
	const [currentPairSeparatorI, setCurrentPairSeparatorI] = useState(PAIR_SEPARATORS[0].value)
	const [termCustomSep, setTermCustomSep] = useState('')
	const [pairCustomSep, setPairCustomSep] = useState('')
	const [textareaPlaceholder, setTextareaPlaceholder] = useState('')
	const [currentText, setCurrentText] = useState('')


	useEffect(() => {
		let termSep = getValidSeparator(TERM_SEPARATORS[parseInt(currentTermSeparatorI)].sep, termCustomSep, TERM_DEFAULT_SEP)
		let pairSep = getValidSeparator(PAIR_SEPARATORS[parseInt(currentPairSeparatorI)].sep, pairCustomSep, PAIR_DEFAULT_SEP)
		let placeholder = `term1${termSep}translation1${pairSep}term2${termSep}translation2`
		setTextareaPlaceholder(placeholder)
	}, [currentTermSeparatorI, currentPairSeparatorI, termCustomSep, pairCustomSep])


	const handleFileLoading = useCallback((e) => {
		const file = e.target.files[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = (e) => {
			setCurrentText(prev => prev + e.target.result)
		};
		reader.readAsText(file);
		e.target.value = ''
	}, [])

	const handleImport = useCallback((e) => {
		let termSep = getValidSeparator(TERM_SEPARATORS[parseInt(currentTermSeparatorI)].sep, termCustomSep, TERM_DEFAULT_SEP)
		let pairSep = getValidSeparator(PAIR_SEPARATORS[parseInt(currentPairSeparatorI)].sep, pairCustomSep, PAIR_DEFAULT_SEP)
		let pairArr = currentText.split(pairSep)
		for (let i = 0; i < pairArr.length; i++) {
			const currentSlice = pairArr[i]
			const sepIndex = currentSlice.indexOf(termSep)
			if (sepIndex <= 0) continue
			const pair = {
				left: currentSlice.slice(0, sepIndex),
				right: currentSlice.slice(sepIndex + termSep.length)
			}
			addPair(pair)
		}
		setCurrentText('')
	}, [currentText, currentTermSeparatorI, currentPairSeparatorI, termCustomSep, pairCustomSep])


	return (
		<Modal className='import-modal' isOpen={isOpen}>
			<textarea value={currentText} onChange={(e) => setCurrentText(e.target.value)} placeholder={textareaPlaceholder} name="" id=""></textarea>
			<div className='import-control-panel'>
				<div className='sep-input-container'>
					<label htmlFor="term-sep-group"><b>Term separator: </b></label>
					<RadioGroup id='term-sep-group' options={TERM_SEPARATORS} name='term-sep-group' defaultValue={TERM_SEPARATORS[0].value} onChange={(val) => setCurrentTermSeparatorI(val)} />
					{!TERM_SEPARATORS[parseInt(currentTermSeparatorI)].sep &&
						<span className='custom-sep-input-container'>
							<label htmlFor="custom-term-sep-input">Custom: </label>
							<Input value={termCustomSep} onChange={(e) => setTermCustomSep(e.target.value)} id='custom-term-sep-input' />
						</span>}
				</div>
				<div className='sep-input-container'>
					<label htmlFor="pair-sep-group"><b>Pair separator: </b></label>
					<RadioGroup id='pair-sep-group' options={PAIR_SEPARATORS} name='pair-sep-group' defaultValue={PAIR_SEPARATORS[0].value} onChange={(val) => setCurrentPairSeparatorI(val)} />
					{!PAIR_SEPARATORS[parseInt(currentPairSeparatorI)].sep &&
						<span className='custom-sep-input-container'>
							<label htmlFor="custom-pair-sep-input">Custom: </label>
							<Input value={pairCustomSep} onChange={(e) => setPairCustomSep(e.target.value)} id='custom-pair-sep-input' />
						</span>}
				</div>
				<div className='import-buttons'>
					<label className='file-loading-btn' htmlFor="import-modal-file-input">
						<input
							id='import-modal-file-input'
							type="file"
							accept=".txt,.json"
							onChange={handleFileLoading} />
						<span>Load file</span>
					</label>
					<Button color={btnColors.GREEN} onClick={handleImport} >Import</Button>
					<Button color={btnColors.RED} onClick={onClose}>Close</Button>
				</div>
			</div>
		</Modal>
	)
}