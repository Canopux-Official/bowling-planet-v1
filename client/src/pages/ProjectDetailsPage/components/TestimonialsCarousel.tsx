import { type FC, useState } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import MediaItem from '../../../components/common/MediaItem'
import StarRating from '../../../components/common/StarRating'
import type { ITestimonial } from '../../ProjectsPage/types'

interface TestimonialsCarouselProps {
  testimonials?: ITestimonial[]
}

const TestimonialsCarousel: FC<TestimonialsCarouselProps> = ({ testimonials }) => {
  const [index, setIndex] = useState(0)

  if (!testimonials || testimonials.length === 0) return null

  const item = testimonials[index]
  const hasMultiple = testimonials.length > 1

  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
  const next = () => setIndex((i) => (i + 1) % testimonials.length)

  return (
    <section id="testimonials" className="scroll-mt-28" aria-labelledby="testimonials-heading">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 id="testimonials-heading" className="font-display text-base font-bold text-[#F5F5F7]">
          Client feedback
        </h2>
        {hasMultiple ? (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/15 text-[#A1A1A6] transition-colors hover:border-[#5FC1D1]/40 hover:text-[#5FC1D1]"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/15 text-[#A1A1A6] transition-colors hover:border-[#5FC1D1]/40 hover:text-[#5FC1D1]"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        ) : null}
      </div>

      <article className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-[#111118] p-5">
        <Quote className="absolute right-4 top-4 h-12 w-12 text-[#5FC1D1]/10" aria-hidden="true" />
        <p className="relative z-[1] text-[15px] leading-relaxed text-[#F5F5F7]">
          “{item.message}”
        </p>
        {typeof item.rating === 'number' ? (
          <div className="mt-3">
            <StarRating rating={item.rating} />
          </div>
        ) : null}
        <div className="mt-4 flex items-center gap-3">
          {item.clientImage ? (
            <div className="h-11 w-11 overflow-hidden rounded-full border border-[#5FC1D1]/30">
              <MediaItem media={item.clientImage} alt={item.clientName} />
            </div>
          ) : (
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#5FC1D1]/30 bg-[#5FC1D1]/10 font-display text-sm font-bold text-[#5FC1D1]">
              {item.clientName.charAt(0)}
            </div>
          )}
          <div>
            <p className="text-sm font-bold text-[#F5F5F7]">{item.clientName}</p>
            {(item.designation || item.companyName) ? (
              <p className="text-xs text-[#A1A1A6]">
                {[item.designation, item.companyName].filter(Boolean).join(' · ')}
              </p>
            ) : null}
          </div>
        </div>
      </article>
    </section>
  )
}

export default TestimonialsCarousel
