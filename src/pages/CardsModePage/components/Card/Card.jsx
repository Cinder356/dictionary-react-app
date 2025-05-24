import { useState, useRef, useCallback } from 'react'
import './Card.scss'

const ANIMATION_CLASSES = Object.freeze({
	swipingLeft: 'animation-swiping-left',
	swipingRight: 'animation-swiping-right',
	gettingNextCard: 'animation-next-card'
})

export default function ({ term, translation, onLeftSwipe, onRightSwipe }) {
	const [isFlipped, setIsFlipped] = useState(false)
	const [currentAnimationClass, setCurrentAnimationClass] = useState('')
	const [cardOffset, setCardOffset] = useState(0);
	const isTouching = useRef(false)
	const isAnimating = useRef(false)
	const touchStartXRef = useRef(0)

	const handleClick = useCallback(() => setIsFlipped(prev => !prev))

	const handleTouchStart = useCallback((e) => {
		if (isAnimating.current || isTouching.current) return

		touchStartXRef.current = e.clientX
		isTouching.current = true
	}, [isAnimating, isTouching])

	const handleTouchMove = useCallback((e) => {
		if (isAnimating.current || !isTouching.current) return
		e.preventDefault();

		const currentX = e.clientX
		const diff = currentX - touchStartXRef.current
		setCardOffset(diff)
	}, [isAnimating, isTouching, touchStartXRef])

	const handleTouchEnd = useCallback((e) => {
		if (isAnimating.current && !isTouching.current) return

		if (cardOffset < -100) {
			setCurrentAnimationClass(ANIMATION_CLASSES.swipingLeft)
			isAnimating.current = true
		}
		else if (cardOffset > 100) {
			setCurrentAnimationClass(ANIMATION_CLASSES.swipingRight)
			isAnimating.current = true
		}
		else if (cardOffset === 0)
			handleClick()
		else
			setCardOffset(0)
		isTouching.current = false
	}, [isAnimating, isTouching, cardOffset, handleClick])

	const handlePointerOut = useCallback((e) => {
		if (isTouching.current)
			handleTouchEnd(e)
	}, [isTouching, handleTouchEnd])

	const handleAnimationEnd = useCallback((e) => {
		const isLeftSwipingAnimation = currentAnimationClass === ANIMATION_CLASSES.swipingLeft
		const isRightSwipingAnimation = currentAnimationClass === ANIMATION_CLASSES.swipingRight
		if (isLeftSwipingAnimation || isRightSwipingAnimation) {
			setCardOffset(0)
			setIsFlipped(false)
			setCurrentAnimationClass(ANIMATION_CLASSES.gettingNextCard)
			isAnimating.current = true

			if (isLeftSwipingAnimation)
				onLeftSwipe()
			else
				onRightSwipe()
		}
		else if (currentAnimationClass === ANIMATION_CLASSES.gettingNextCard) {
			setCurrentAnimationClass('')
			isAnimating.current = false
		}
	}, [isAnimating, currentAnimationClass, onLeftSwipe, onRightSwipe])

	return (
		<>
			<div
				style={{
					transition: isAnimating.current || isTouching.current ? 'none' : 'transform .2s',
					transform: `translateX(${cardOffset}px) rotate(${cardOffset * .04}deg)`,
					touchAction: 'none'
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
				>{term}</div>

				<div
					className={'flashcard-back' + (isFlipped ? ' ' + currentAnimationClass : '')}
				>{translation}</div>
			</div >
		</>
	)
}