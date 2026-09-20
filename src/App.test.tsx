import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('Wayfinder demo flow', () => {
  it('moves from transaction intake to an evidence-backed action plan', async () => {
    const user = userEvent.setup()
    render(<App />)

    expect(screen.getByRole('heading', { name: /understand your next regulatory steps/i })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /review assumptions/i }))
    expect(screen.getByRole('heading', { name: /confirm material assumptions/i })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /generate action plan/i }))
    expect(screen.getByRole('heading', { name: /action plan for inv-2026-041/i })).toBeInTheDocument()
    expect(screen.getByText(/one material fact is unconfirmed/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /what to do next/i })).toBeInTheDocument()
  })

  it('opens source evidence from an obligation', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: /review assumptions/i }))
    await user.click(screen.getByRole('button', { name: /generate action plan/i }))

    await user.click(screen.getAllByRole('button', { name: /national bank of ethiopia/i })[0])
    expect(screen.getByRole('dialog', { name: /foreign-currency receipt documentation directive/i })).toBeInTheDocument()
    expect(screen.getByText(/synthetic demonstration source/i)).toBeInTheDocument()
  })
})
