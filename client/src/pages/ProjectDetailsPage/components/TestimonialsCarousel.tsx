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
    <div id="testimonials" className="scroll-mt-32 px-5 py-16 sm:px-7 sm:py-20" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label mb-4">Testimonials</p>
            <h2
              id="testimonials-heading"
              className="font-display text-[clamp(1.6rem,3vw,2.35rem)] font-extrabold leading-[1.2] tracking-[-0.03em] text-[#F5F5F7]"
            >
              Client Feedback
            </h2>
          </div>
          {hasMultiple ? (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-[#A1A1A6] transition-colors hover:border-[#5FC1D1]/40 hover:text-[#5FC1D1]"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-[#A1A1A6] transition-colors hover:border-[#5FC1D1]/40 hover:text-[#5FC1D1]"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          ) : null}
        </div>

        <article className="relative overflow-hidden rounded-3xl border border-white/[0.1] bg-[#111118] p-6 sm:p-10">
          <Quote className="absolute right-6 top-6 h-16 w-16 text-[#5FC1D1]/10" aria-hidden="true" />

          <div className="relative z-[1] grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="max-w-3xl text-lg leading-relaxed text-[#F5F5F7] sm:text-xl">
                “{item.message}”
              </p>
              {typeof item.rating === 'number' ? (
                <div className="mt-5">
                  <StarRating rating={item.rating} />
                </div>
              ) : null}
            </div>

            <div className="flex items-center gap-4">
              {item.clientImage ? (
                <div className="h-14 w-14 overflow-hidden rounded-full border border-[#5FC1D1]/30">
                  <MediaItem media={item.clientImage} alt={item.clientName} />
                </div>
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#5FC1D1]/30 bg-[#5FC1D1]/10 font-display text-lg font-bold text-[#5FC1D1]">
                  {item.clientName.charAt(0)}
                </div>
              )}
              <div>
                <p className="font-display text-base font-bold text-[#F5F5F7]">{item.clientName}</p>
                {(item.designation || item.companyName) ? (
                  <p className="text-sm text-[#A1A1A6]">
                    {[item.designation, item.companyName].filter(Boolean).join(' · ')}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          {hasMultiple ? (
            <div className="mt-8 flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? 'w-6 bg-[#5FC1D1]' : 'w-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          ) : null}
        </article>
      </div>
    </div>
  )
}

export default TestimonialsCarousel
