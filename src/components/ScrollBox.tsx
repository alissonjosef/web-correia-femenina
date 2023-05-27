import React, { ReactElement, useEffect } from 'react';

interface ScrollProps {
	children: React.ReactNode;
	
	variant?: 'outside' | 'inline'
	bottomOffset?: number
}

const ScrollBox: React.FC<ScrollProps> = ({
	children,
	
	variant,
	bottomOffset = 40,
}) => {
	useEffect(() => {
		const handleScroll = (event: Event) => {
			const target = (event.target as Document).querySelector(
				'html',
			) as HTMLElement
			const reachedTheBottom =
				target.scrollTop + target.clientHeight >=
				target.scrollHeight - bottomOffset
			if (reachedTheBottom) {
				
			}
		}
		if (variant === 'outside') {
			document.addEventListener('scroll', handleScroll)
		}
		return () => {
			if (variant === 'outside') {
				document.removeEventListener('scroll', handleScroll)
			}
		}
	}, [ bottomOffset, variant])

	if (variant === 'outside') {
		return <>{children}</>
	}

	const onScroll = (e: Event) => {
		const target = e.target as HTMLElement
		const reachedTheBottom =
			target.scrollTop + target.clientHeight >=
			target.scrollHeight - bottomOffset
		if (reachedTheBottom) {
			
		}
	}

	return (
		<>
			{React.Children.map(children, (child, index) =>
				React.cloneElement(child as ReactElement, {
					onScrollCapture: onScroll,
				}),
			)}
		</>
	)
}

export { ScrollBox };

