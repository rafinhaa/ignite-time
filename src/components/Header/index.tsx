import { HeaderContainer } from './styles'

import { NavLink } from 'react-router-dom'
import { Timer, Scroll } from 'phosphor-react'

import logoIgnite from '../../assets/logo.svg'

export const Header = () => {
  return (
    <HeaderContainer>
      <img src={logoIgnite} alt="Ignite" />
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
