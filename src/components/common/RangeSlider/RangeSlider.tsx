'use client'

import * as SliderPrimitive from '@radix-ui/react-slider'

import { mergeClassNames } from '@utils'
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react'

const RangeSlider = forwardRef<
  ElementRef<typeof SliderPrimitive.Root>,
  ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={mergeClassNames(
      'relative flex w-full touch-none select-none items-center',
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-300">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="ring-offset-background focus-visible:ring-ring block h-5 w-5 rounded-full border-2 border-primary bg-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
RangeSlider.displayName = SliderPrimitive.Root.displayName

export { RangeSlider }
