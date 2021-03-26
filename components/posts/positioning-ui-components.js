const variants = {
  small: 6,
  medium: 8,
  big: 10,
}

export function Button({ children, variant = 'medium', onClick }) {
  const style = {
    padding: variants[variant],
    backgroundColor: 'rgb(55, 110, 109)',
    borderRadius: 5,
    color: 'white',
    minWidth: 100,
    fontSize: 16,
    margin: 5,
    border: 0,
  }

  return (
    <button style={style} onClick={onClick}>
      {children}
    </button>
  )
}
