import { ButtonContainer, ButtonVariant } from './Button.styles'

interface IButtonProps {
  variant?: ButtonVariant
}

export const Button = ({ variant = 'primary' }: IButtonProps) => {
  return <ButtonContainer variant={variant}>Enviar</ButtonContainer>
}
