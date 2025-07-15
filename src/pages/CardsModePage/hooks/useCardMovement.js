import { useRef } from "react"
import cardAnimationClasses from "../consts/cardAnimationClasses"

const MIN_SWIPE_OFFSET = 60

export default function (flashcardRef, isAnimatingRef, setIsFlipped, handleSwipe, setCurrentAnimationClass) {
	const isDraggingRef = useRef(false)
	const startPointerXRef = useRef(0)
	const offsetXRef = useRef(0)

	const moveCard = (offsetX) => {
		flashcardRef.current.style.setProperty('--current-card-offset-x', `${offsetX}`)
	}

	const handlePointerDown = (e) => {
		if (isAnimatingRef.current || isDraggingRef.current || !flashcardRef.current) return
		startPointerXRef.current = e.clientX
		isDraggingRef.current = true
	};

	const handlePointerMove = (e) => {
		console.log('move')
		if (!isDraggingRef.current) return

		const currentX = e.clientX
		const offsetX = currentX - startPointerXRef.current
		offsetXRef.current = offsetX
		moveCard(offsetX)
	}

	const handlePointerUp = (e) => {
		if (!isDraggingRef.current) return

		if (offsetXRef.current === 0) // click
			setIsFlipped(prev => !prev)
		else if (offsetXRef.current >= MIN_SWIPE_OFFSET)
			handleSwipe('right')
		else if (offsetXRef.current <= -MIN_SWIPE_OFFSET)
			handleSwipe('left')
		else {
			moveCard(0)
			setCurrentAnimationClass(cardAnimationClasses.gettingBack)
			isAnimatingRef.current = true;
		}

		offsetXRef.current = 0
		isDraggingRef.current = false
	}

	return {
		handlePointerDown,
		handlePointerMove,
		handlePointerUp,
		moveCard
	}
}