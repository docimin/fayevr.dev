import { act, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ThemeProvider, useTheme } from './ThemeProvider'

function Probe() {
  const { theme, toggle } = useTheme()
  return (
    <button type="button" onClick={toggle} data-testid="probe">
      {theme}
    </button>
  )
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  it('defaults to light when nothing is stored', () => {
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>
    )
    expect(screen.getByTestId('probe')).toHaveTextContent('light')
  })

  it('reads the persisted theme', () => {
    localStorage.setItem('theme', 'dark')
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>
    )
    expect(screen.getByTestId('probe')).toHaveTextContent('dark')
  })

  it('toggling writes the class and persists', () => {
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>
    )
    act(() => screen.getByTestId('probe').click())
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem('theme')).toBe('dark')
  })

  it('still renders when localStorage.getItem throws', () => {
    const getItemSpy = vi
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation(() => {
        throw new Error('storage disabled')
      })

    expect(() =>
      render(
        <ThemeProvider>
          <Probe />
        </ThemeProvider>
      )
    ).not.toThrow()
    expect(screen.getByTestId('probe')).toHaveTextContent('light')

    getItemSpy.mockRestore()
  })
})
