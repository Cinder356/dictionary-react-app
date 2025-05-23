import { useState, useRef, useCallback } from 'react'
import './Card.scss'

const ANIMATION_CLASSES = Object.freeze({
	swipingLeft: 'animation-swiping-left',
	swipingRight: 'animation-swiping-right',
	gettingNextCard: 'animation-next-card'
})

export default function ({ term, translation, onSwipe }) { // !!! I must embed useCallbacks
	const [isFlipped, setIsFlipped] = useState(false)
	const [currentAnimationClass, setCurrentAnimationClass] = useState('')
	const [cardOffset, setCardOffset] = useState(0);
	const isTouching = useRef(false)
	const isAnimating = useRef(false)
	const touchStartXRef = useRef(0)

	const handleClick = () => {
		setIsFlipped(prev => !prev)
	}

	const handleTouchStart = (e) => {
		if (isAnimating.current || isTouching.current) return

		touchStartXRef.current = e.clientX
		isTouching.current = true
	}

	const handleTouchMove = (e) => {
		if (isAnimating.current || !isTouching.current) return

		const currentX = e.clientX
		const diff = currentX - touchStartXRef.current
		setCardOffset(diff)
	}

	const handleTouchEnd = (e) => {
		if (isAnimating.current && !isTouching.current) return

		if (cardOffset < -100) {
			console.log('left')
			setCurrentAnimationClass(ANIMATION_CLASSES.swipingLeft)
			isAnimating.current = true
		}
		else if (cardOffset > 100) {
			console.log('right')
			setCurrentAnimationClass(ANIMATION_CLASSES.swipingRight)
			isAnimating.current = true
		}
		else if (cardOffset === 0)
			handleClick()
		else
			setCardOffset(0)
		isTouching.current = false
		console.log(e)
	}

	const handlePointerOut = (e) => {
		if (isTouching.current)
			handleTouchEnd(e)
	}

	const handleAnimationEnd = (e) => {
		if (currentAnimationClass === ANIMATION_CLASSES.swipingLeft || currentAnimationClass === ANIMATION_CLASSES.swipingRight) {
			setCardOffset(0)
			setCurrentAnimationClass(ANIMATION_CLASSES.gettingNextCard)
			isAnimating.current = true
			onSwipe()
		}
		else if (currentAnimationClass === ANIMATION_CLASSES.gettingNextCard) {
			setCurrentAnimationClass('')
			isAnimating.current = false
		}
	}

	return (
		<>
			<div
				style={{
					transition: isAnimating.current || isTouching.current ? 'none' : 'transform .2s',
					transform: `translateX(${cardOffset}px) rotate(${cardOffset * .04}deg)`,
					touchAction: 'pan-y'
				}}
				className={"flashcard" + (isFlipped ? ' ' + 'flipped' : '')}
				onPointerDown={handleTouchStart}
				onPointerMove={handleTouchMove}
				onPointerUp={handleTouchEnd}
				onPointerOut={handlePointerOut}
				onAnimationEnd={handleAnimationEnd}
			>
				<div
					className={'flashcard-front' + (!isFlipped ? ' ' + currentAnimationClass : '')}
					onAnimationEnd={handleAnimationEnd}
				>{term} <br /> {Math.round(cardOffset)}</div>

				<div
					className={'flashcard-back' + (isFlipped ? ' ' + currentAnimationClass : '')}
					onAnimationEnd={handleAnimationEnd}
				>{translation}</div>
			</div >
		</>
	)
}