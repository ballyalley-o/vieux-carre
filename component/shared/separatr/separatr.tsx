type SeparatrProps = {
  label: string
}

const Separatr = ({ label }: SeparatrProps) => {
  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-border" />
      </div>
      <span className="relative z-10 bg-background px-2 text-sm text-muted-foreground">{label}</span>
    </div>
  )
}

export default Separatr