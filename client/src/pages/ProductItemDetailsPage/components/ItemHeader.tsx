import type { FC } from 'react'

interface ItemHeaderProps {
  title: string
  description?: string
  price?: number
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

const ItemHeader: FC<ItemHeaderProps> = ({ title, description, price }) => (
  <header className="space-y-3">
    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5FC1D1]">
      Product detail
    </p>
    <div className="flex flex-wrap items-start justify-between gap-3">
      <h1 className="font-display text-[clamp(1.4rem,2.8vw,1.9rem)] font-extrabold tracking-[-0.02em] leading-tight text-[#F5F5F7]">
        {title}
      </h1>
      {price !== undefined ? (
        <div className="rounded-xl border border-[#6DBD4E]/35 bg-[#6DBD4E]/10 px-3.5 py-2 text-right">
          <span className="block text-[10px] font-semibold uppercase tracking-wide text-[#6DBD4E]/80">
            Price
          </span>
          <span className="text-base font-bold text-[#6DBD4E]">{formatPrice(price)}</span>
        </div>
      ) : null}
    </div>
    {description ? (
      <p className="max-w-prose text-sm leading-relaxed text-[#A1A1A6]">{description}</p>
    ) : null}
  </header>
)

export default ItemHeader
