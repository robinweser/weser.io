import React, { createContext, useState, useEffect } from 'react'

export const ModeContext = createContext('light')

export default function ModeProvider({ children }) {
  const [mode, setMode] = useState('light')

  useEffect(() => {
    setMode(window.__theme)

    window.__onThemeChange = () => {
      setMode(window.__theme)
    }
  })

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  )
}
