import { cn } from 'cn'

export function BrandMark({ className }: { className?: string }) {
  return (
    <img
      className={cn('afeb-logo', className)}
      src="/brand/afeb-logo.png"
      alt="AFEB · Asociación de Fabricantes de Bricolaje y Ferretería"
      width={435}
      height={365}
      decoding="async"
    />
  )
}
