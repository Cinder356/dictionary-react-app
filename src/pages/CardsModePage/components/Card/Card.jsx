import { useState, useRef, useEffect } from 'react'
import useCardMovement from '../../hooks/useCardMovement'
import cardAnimationClasses from "../../consts/cardAnimationClasses"
import './Card.scss'

export default function ({ term, translation, onSwipe }) {
	const [isFlipped, setIsFlipped] = useState(false)
	const [currentAnimationClass, setCurrentAnimationClass] = useState('')
	const hasFlipAnimation = useRef(true)
	const isAnimatingRef = useRef(false)
	const flashcardRef = useRef(null)

	const handleSwipe = (swipeDirection) => {
		if (swipeDirection === 'left')
			setCurrentAnimationClass(cardAnimationClasses.swipingLeft)
		else if (swipeDirection === 'right')
			setCurrentAnimationClass(cardAnimationClasses.swipingRight)
		isAnimatingRef.current = true;
	}

	const { handlePointerDown, handlePointerMove, handlePointerUp, moveCard } = useCardMovement(flashcardRef, isAnimatingRef, setIsFlipped, handleSwipe, setCurrentAnimationClass)

	const handleAnimationEnd = () => {
		switch (currentAnimationClass) {
			case cardAnimationClasses.swipingLeft:
				onSwipe('left')
				setIsFlipped(false)
				setCurrentAnimationClass(cardAnimationClasses.gettingNextCard)
				hasFlipAnimation.current = false
				moveCard(0)
				break
			case cardAnimationClasses.swipingRight:
				onSwipe('right')
				setIsFlipped(false)
				setCurrentAnimationClass(cardAnimationClasses.gettingNextCard)
				hasFlipAnimation.current = false
				moveCard(0)
				break
			case cardAnimationClasses.gettingBack:
			case cardAnimationClasses.gettingNextCard:
				isAnimatingRef.current = false
				setCurrentAnimationClass('')
				hasFlipAnimation.current = true
				break
		}
	}

	return (
		<div
			ref={flashcardRef}
			className={'flashcard' + ' '
				+ currentAnimationClass
				+ (isFlipped ? ' flipped' : '')
				+ (hasFlipAnimation.current ? ' has-flip-animation' : '')
			}
			onPointerDown={handlePointerDown}
			onPointerMove={handlePointerMove}
			onPointerUp={handlePointerUp}
			onPointerOut={handlePointerUp}
			onAnimationEnd={handleAnimationEnd}
			onTransitionEnd={handleAnimationEnd}
		>
			<div className="flashcard-front" translate='no'>{term}</div>
			<div className="flashcard-back" translate='no'>{translation}</div>
		</div>
	)
}