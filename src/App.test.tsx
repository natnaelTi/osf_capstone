import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'

afterEach(() => { cleanup(); window.localStorage.clear() })

describe('Wayfinder judge-ready flow', () => {
  it('keeps regulatory updates and official evidence public', async () => {
    const user = userEvent.setup()
    render(<App />)
    expect(screen.getByRole('heading', { name: /know which rule applies/i })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /regulatory updates/i }))
    expect(screen.getByRole('heading', { name: /recent changes and unresolved questions/i })).toBeInTheDocument()
  })

  it('publishes the pitch deck and role-based user guide', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: /^pitch deck$/i }))
    expect(screen.getByRole('heading', { name: /wayfinder pitch deck/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /download pdf/i })).toHaveAttribute('href', '/wayfinder-pitch-deck.pdf')
    await user.click(screen.getAllByRole('button', { name: /^user guide$/i })[0])
    expect(screen.getByRole('heading', { name: /role-based user guide/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /platform administrator/i })).toBeInTheDocument()
  })

  it('moves a business owner from demo login to a verified current rule', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: /verify a rule with demo access/i }))
    await user.click(screen.getByRole('button', { name: /business owner/i }))
    await user.click(screen.getByRole('button', { name: /verify against my transaction/i }))
    await user.click(screen.getByRole('button', { name: /^verify current rule/i }))
    await waitFor(() => expect(screen.getByRole('heading', { name: /100% of qualifying service-export proceeds may be retained/i })).toBeInTheDocument())
    expect(screen.getByRole('heading', { name: /previous versus current/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /what to do next/i })).toBeInTheDocument()
  })

  it('opens official source evidence from the public proof card', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: /inspect official evidence/i }))
    expect(screen.getByRole('dialog', { name: /notice on relaxation of foreign exchange directives/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /open official publication/i })).toHaveAttribute('href', expect.stringContaining('nbe.gov.et'))
  })

  it('stops at the evidence boundary for a goods exporter', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: /verify a rule with demo access/i }))
    await user.click(screen.getByRole('button', { name: /business owner/i }))
    await user.click(screen.getByRole('button', { name: /verify against my transaction/i }))
    await user.selectOptions(screen.getByLabelText(/exporter type/i), 'Goods exporter')
    await user.click(screen.getByRole('button', { name: /^verify current rule/i }))
    await waitFor(() => expect(screen.getByRole('heading', { name: /goods-export applicability cannot be concluded/i })).toBeInTheDocument())
    expect(screen.queryByRole('heading', { name: /100% of qualifying service-export proceeds may be retained/i })).not.toBeInTheDocument()
  })

  it('lets a policy reviewer record a professional resolution', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    await user.click(screen.getByRole('button', { name: /policy reviewer/i }))
    await user.click(screen.getByRole('button', { name: /record resolution and update guidance/i }))
    expect(screen.getByRole('button', { name: /resolution recorded/i })).toBeDisabled()
  })

  it('runs a controlled agent change through human review roles', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    await user.click(screen.getByRole('button', { name: /platform administrator/i }))
    await user.click(await screen.findByRole('button', { name: /run controlled change demo/i }))
    expect(await screen.findByText(/candidate foreign-exchange directive amendment detected/i)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /^route to policy review$/i }))
    await user.click(screen.getByRole('button', { name: /switch demo role/i }))
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    await user.click(screen.getByRole('button', { name: /policy reviewer/i }))
    expect(await screen.findByText(/agent findings awaiting professional judgment/i)).toBeInTheDocument()
    await user.click(await screen.findByRole('button', { name: /approve within recorded scope/i }))
    expect(await screen.findByText(/no agent findings are waiting for policy review/i)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /switch demo role/i }))
    await user.click(screen.getByRole('button', { name: /regulatory updates/i }))
    expect(await screen.findByRole('heading', { name: /human-approved monitored changes/i })).toBeInTheDocument()
  })
})
