import { cn } from "lib"

type SeparatrProps = {
  label           ?: string
  className       ?: string
  wrapperClassName?: string
  borderClassName ?: string
}

const Separatr = ({ label, className, wrapperClassName, borderClassName }: SeparatrProps) => {
  return (
    <div className={cn('relative flex items-center', wrapperClassName ? wrapperClassName : 'justify-center')}>
      <div className={'absolute inset-0 flex items-center'}>
        <span className={cn('w-full border-t', borderClassName ? borderClassName : 'border-border')} />
      </div>
      {label && <span className={cn('relative z-10 bg-background px-2 text-muted-foreground', className ? className : 'text-sm')}>{label}</span>}
    </div>
  )
}

export default Separatr