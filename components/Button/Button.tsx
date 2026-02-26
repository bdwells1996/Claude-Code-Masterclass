type ButtonVariant = 'primary' | 'secondary'

type ButtonProps = {
  children: React.ReactNode
  variant?: ButtonVariant
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
  tabIndex?: number
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    'bg-primary text-white',
    'shadow-[4px_4px_0px_0px_#302D79]',
    'hover:bg-primary-dark hover:shadow-[2px_2px_0px_0px_#302D79] hover:translate-x-[2px] hover:translate-y-[2px]',
  ].join(' '),
  secondary: [
    'bg-secondary text-white',
    'shadow-[4px_4px_0px_0px_#C04A2A]',
    'hover:bg-secondary-dark hover:shadow-[2px_2px_0px_0px_#C04A2A] hover:translate-x-[2px] hover:translate-y-[2px]',
  ].join(' '),
}

export default function Button({
  children,
  variant = 'primary',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  tabIndex = 0,
}: ButtonProps) {
  const baseStyles = [
    'inline-flex items-center justify-center',
    'px-6 py-3 rounded-xl',
    'font-medium font-serif text-md tracking-wide',
    'transition-all duration-150 ease-in-out cursor-pointer',
  ].join(' ')

  const disabledStyles = [
    'bg-disabled-bg text-disabled-text',
    'shadow-[4px_4px_0px_0px_#D4CEC4]',
    'cursor-not-allowed',
  ].join(' ')

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        baseStyles,
        disabled ? disabledStyles : variantStyles[variant],
        className,
      ].join(' ')}
      tabIndex={tabIndex}
    >
      {children}
    </button>
  )
}
