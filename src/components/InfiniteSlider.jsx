import { useMotionValue, animate, motion } from 'motion/react'
import { useState, useEffect } from 'react'
import useMeasure from 'react-use-measure'

export function InfiniteSlider({
  children,
  gap = 16,
  duration,
  durationOnHover,
  speed,        // alias — matches LogoCloud demo props
  speedOnHover, // alias
  direction = 'horizontal',
  reverse = false,
  className = '',
}) {
  const actualDuration = duration ?? speed ?? 25
  const actualDurationOnHover = durationOnHover ?? speedOnHover

  const [currentDuration, setCurrentDuration] = useState(actualDuration)
  const [ref, { width, height }] = useMeasure()
  const translation = useMotionValue(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [key, setKey] = useState(0)

  useEffect(() => {
    let controls
    const size = direction === 'horizontal' ? width : height
    const contentSize = size + gap
    const from = reverse ? -contentSize / 2 : 0
    const to   = reverse ? 0 : -contentSize / 2

    if (isTransitioning) {
      controls = animate(translation, [translation.get(), to], {
        ease: 'linear',
        duration: currentDuration * Math.abs((translation.get() - to) / contentSize),
        onComplete: () => {
          setIsTransitioning(false)
          setKey(k => k + 1)
        },
      })
    } else {
      controls = animate(translation, [from, to], {
        ease: 'linear',
        duration: currentDuration,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
        onRepeat: () => { translation.set(from) },
      })
    }

    return controls?.stop
  }, [key, translation, currentDuration, width, height, gap, isTransitioning, direction, reverse])

  const hoverProps = actualDurationOnHover ? {
    onHoverStart: () => { setIsTransitioning(true); setCurrentDuration(actualDurationOnHover) },
    onHoverEnd:   () => { setIsTransitioning(true); setCurrentDuration(actualDuration) },
  } : {}

  return (
    <div style={{ overflow: 'hidden' }} className={className}>
      <motion.div
        ref={ref}
        style={{
          display: 'flex',
          width: 'max-content',
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
          gap: `${gap}px`,
          ...(direction === 'horizontal' ? { x: translation } : { y: translation }),
        }}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  )
}

export default InfiniteSlider
