import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { Presentation, PresentationFile } from '@oai/artifact-tool'

const workspaceDir = process.cwd()
const { SKILL_DIR, TMP_DIR, FINAL_PPTX, RUNTIME_PYTHON } = process.env
if (![SKILL_DIR, TMP_DIR, FINAL_PPTX, RUNTIME_PYTHON].every(value => value && path.isAbsolute(value))) throw new Error('Presentation runtime paths must be absolute')
const utilities = await import(pathToFileURL(path.join(SKILL_DIR, 'container_tools/artifact_tool_utils.mjs')).href)
const { finalizePresentation, resolvePresentationFont } = utilities
await fs.mkdir(TMP_DIR, { recursive: true })
await fs.mkdir(path.dirname(FINAL_PPTX), { recursive: true })

const font = resolvePresentationFont()
const colors = { navy: '#102C55', blue: '#173E70', amber: '#B8742A', ink: '#10233D', muted: '#526177', pale: '#EAF0F6', white: '#FFFFFF', line: '#CBD5E1', green: '#20755A' }
const presentation = Presentation.create({ slideSize: { width: 1280, height: 720 } })

function box(slide, { left, top, width, height, fill = 'none', line = 'none', radius = 0 }) {
  return slide.shapes.add({ geometry: radius ? 'roundRect' : 'rect', position: { left, top, width, height }, fill, line: { fill: line, width: line === 'none' ? 0 : 1 } })
}
function text(slide, value, { left, top, width, height, size = 24, color = colors.ink, bold = false }) {
  const shape = slide.shapes.add({ geometry: 'textbox', position: { left, top, width, height }, fill: 'none', line: { fill: 'none', width: 0 } })
  shape.text = value
  shape.text.style = { typeface: font, fontSize: size, bold, color, autoFit: 'shrinkText' }
  return shape
}
function base(slide, index, dark = false) {
  slide.background.fill = dark ? colors.navy : colors.white
  box(slide, { left: 0, top: 0, width: 18, height: 720, fill: colors.amber })
  text(slide, String(index).padStart(2, '0'), { left: 1170, top: 36, width: 60, height: 24, size: 14, color: dark ? '#AFC1D5' : '#8190A3', bold: true, align: 'right' })
  text(slide, 'WAYFINDER', { left: 74, top: 665, width: 130, height: 22, size: 12, color: dark ? colors.white : colors.navy, bold: true })
  text(slide, 'Information You Can Trust And Act On', { left: 205, top: 665, width: 330, height: 22, size: 11, color: dark ? '#AFC1D5' : '#8190A3' })
}
function title(slide, kicker, heading, subtitle, dark = false) {
  text(slide, kicker.toUpperCase(), { left: 76, top: 62, width: 500, height: 28, size: 15, color: dark ? '#EFB86F' : colors.amber, bold: true })
  text(slide, heading, { left: 76, top: 108, width: 1040, height: 155, size: 46, color: dark ? colors.white : colors.navy, bold: true })
  if (subtitle) text(slide, subtitle, { left: 76, top: 275, width: 1020, height: 86, size: 21, color: dark ? '#DCE8F5' : colors.muted })
}
function bullets(slide, points, { top = 390, columns = 2, dark = false } = {}) {
  const gap = 28
  const width = columns === 2 ? 520 : 1030
  points.forEach((point, index) => {
    const column = columns === 2 ? index % 2 : 0
    const row = columns === 2 ? Math.floor(index / 2) : index
    const left = 76 + column * (width + gap)
    const y = top + row * 78
    box(slide, { left, top: y + 3, width: 19, height: 19, fill: colors.amber, radius: 6 })
    text(slide, '✓', { left: left + 1, top: y + 1, width: 17, height: 18, size: 12, color: colors.white, bold: true, align: 'center', valign: 'middle' })
    text(slide, point, { left: left + 34, top: y - 2, width: width - 34, height: 54, size: 18, color: dark ? '#E5EEF7' : '#394B61' })
  })
}
function notes(slide, value) { slide.speakerNotes.textFrame.setText(value) }

{
  const slide = presentation.slides.add(); base(slide, 1, true)
  text(slide, 'OSF × ANDELA HACKATHON', { left: 76, top: 84, width: 500, height: 28, size: 16, color: '#EFB86F', bold: true })
  text(slide, 'Wayfinder', { left: 76, top: 190, width: 850, height: 100, size: 70, color: colors.white, bold: true })
  text(slide, 'Evidence-Backed Regulatory Intelligence And Action For Ethiopian Businesses', { left: 76, top: 308, width: 850, height: 120, size: 29, color: '#DCE8F5' })
  box(slide, { left: 940, top: 145, width: 210, height: 210, fill: 'none', line: colors.amber, radius: 105 })
  text(slide, 'W', { left: 965, top: 180, width: 160, height: 120, size: 82, color: colors.white, bold: true, align: 'center', valign: 'middle' })
  text(slide, 'Transparency & Accountability Track', { left: 76, top: 520, width: 600, height: 35, size: 18, color: '#AFC1D5' })
  notes(slide, 'Wayfinder pitch deck. Built for the OSF × Andela Information You Can Trust capstone. All product organizations, identities, and transactions shown in the prototype are synthetic.')
}

const slides = [
  ['The Problem', 'Businesses Discover Regulatory Obligations Too Late', 'Relevant information is fragmented across official pages, notices, directives, and scanned documents. Teams often investigate only when a bank, accountant, or filing deadline forces the question.', ['Older authentic guidance remains searchable', 'Applicability changes by date, audience, and transaction', 'A publication rarely explains the next operational step']],
  ['The User', 'Service Exporters Need Answers At The Transaction Moment', 'The primary user is a founder or finance lead issuing an invoice or receiving foreign payment for digital services.', ['Confirm the current foreign-exchange position', 'Prepare the right evidence before tax filing', 'Escalate only the unresolved professional question']],
  ['The Evidence Gap', 'An Authentic Source May No Longer State The Current Position', 'Wayfinder preserves the version trail, then checks the audience and effective date before identifying the applicable position.', ['2024 FAQ showed a 50% retention position', '2026 notice identified a 100% position for service exporters', 'Audience and effective date determine applicability']],
  ['The Solution', 'Wayfinder Connects Evidence, Interpretation, Action, And Judgment', 'The product separates four information layers so generated reasoning never appears to be official text.', ['Verified source evidence with dates and provenance', 'Generated interpretation with stated assumptions', 'Transaction-specific actions and evidence requirements', 'Recorded professional judgment for high-impact questions']],
  ['The Working Prototype', 'A Transaction Becomes A Cited Compliance Checklist', 'The prototype guides a user from transaction facts to a source-cited action plan through three clear stages.', ['Current-rule verification', 'Previous-versus-current comparison', 'Action checklist and evidence pack']],
  ['Autonomous Monitoring', 'Wayfinder Watch Detects Changes And Preserves Human Control', 'The operational agent scans administrator-approved sources, fingerprints changes, structures candidate facts, and routes consequential interpretation to people.', ['Manual and scheduled live scans', 'Configurable official-source registry', 'Curator and policy-review queues', 'Timestamped run and decision history']],
  ['Trust And Safety', 'Consequential Guidance Cannot Publish Without The Required Review', 'Foreign exchange, tax, filing, penalty, licensing, conflict, and probable supersession findings remain reviewable.', ['No unsupported confidence score', 'No unrestricted legal-advice chatbot', 'No silent conflict resolution', 'Synthetic fixtures remain clearly labeled']],
  ['Scale Model', 'Jurisdiction Packs Preserve Local Relevance While Supporting Expansion', 'The service-export workflow provides the first deep vertical. Goods exports add customs, commodity, logistics, permit, tax, and foreign-exchange evidence.', ['Reusable evidence and review architecture', 'Local sources and professional reviewers', 'English-first interface with multilingual-ready content structures']],
  ['Build And Next Step', 'A Working Proof Of Concept Ready For Deeper Validation', 'The prototype demonstrates the complete path from source monitoring to business action and professional review.', ['React and TypeScript frontend', 'Vercel Functions and scheduled scans', 'Supabase persistence', 'Structured AI extraction with deterministic fallback']],
]

slides.forEach(([kicker, heading, subtitle, points], offset) => {
  const index = offset + 2
  const dark = index === 7 || index === 9
  const slide = presentation.slides.add(); base(slide, index, dark); title(slide, kicker, heading, subtitle, dark)
  if (index === 4) {
    box(slide, { left: 76, top: 392, width: 430, height: 142, fill: '#F7F9FC', line: colors.line, radius: 10 })
    box(slide, { left: 76, top: 392, width: 430, height: 5, fill: '#8190A3' })
    text(slide, 'OLDER GUIDANCE', { left: 98, top: 416, width: 220, height: 22, size: 12, color: '#627288', bold: true })
    text(slide, '50% retention', { left: 98, top: 446, width: 340, height: 45, size: 31, color: colors.navy, bold: true })
    text(slide, '2024 NBE FAQ', { left: 98, top: 500, width: 260, height: 22, size: 14, color: colors.muted, bold: true })
    text(slide, '→', { left: 526, top: 438, width: 80, height: 60, size: 40, color: colors.amber, bold: true, align: 'center' })
    box(slide, { left: 628, top: 392, width: 476, height: 142, fill: '#FFF7ED', line: '#E7C79F', radius: 10 })
    box(slide, { left: 628, top: 392, width: 476, height: 5, fill: colors.amber })
    text(slide, 'CURRENT SERVICE-EXPORTER GUIDANCE', { left: 650, top: 416, width: 390, height: 22, size: 12, color: colors.amber, bold: true })
    text(slide, '100% retention', { left: 650, top: 446, width: 390, height: 45, size: 31, color: colors.navy, bold: true })
    text(slide, '2026 NBE notice', { left: 650, top: 500, width: 300, height: 22, size: 14, color: colors.muted, bold: true })
    text(slide, 'Applicability depends on the transaction date and audience.', { left: 76, top: 555, width: 920, height: 28, size: 15, color: colors.green, bold: true })
  } else if (index === 6) {
    const stages = [
      ['01', 'Describe The Transaction', 'Confirm the service, payment route, date, and business profile.'],
      ['02', 'Verify The Current Position', 'Compare applicable official publications and expose the source trail.'],
      ['03', 'Receive The Action Plan', 'Get required documents, deadlines, and any question held for expert review.'],
    ]
    stages.forEach(([number, label, detail], stageIndex) => {
      const left = 76 + stageIndex * 350
      box(slide, { left, top: 394, width: 320, height: 176, fill: '#F4F7FB', line: colors.line, radius: 10 })
      box(slide, { left, top: 394, width: 320, height: 5, fill: colors.amber })
      text(slide, number, { left: left + 22, top: 418, width: 50, height: 20, size: 12, color: colors.amber, bold: true })
      text(slide, label, { left: left + 22, top: 450, width: 276, height: 48, size: 20, color: colors.navy, bold: true })
      text(slide, detail, { left: left + 22, top: 510, width: 276, height: 48, size: 14, color: colors.muted })
    })
  } else {
    bullets(slide, points, { top: 400, columns: points.length > 3 ? 2 : 1, dark })
  }
  if (index === 10) {
    box(slide, { left: 76, top: 584, width: 510, height: 44, fill: colors.pale, radius: 8 })
    text(slide, 'Role-Based User Guide Available Inside The Product', { left: 92, top: 594, width: 470, height: 24, size: 15, color: colors.navy, bold: true })
  }
  notes(slide, `${kicker}. ${subtitle} Product claims describe the working proof of concept and do not claim production coverage or legal certainty.`)
})

const stagingDir = path.join(workspaceDir, '.codex-finalizer')
await fs.mkdir(stagingDir, { recursive: true })
const candidatePath = path.join(stagingDir, 'wayfinder-pitch-candidate.pptx')
await (await PresentationFile.exportPptx(presentation)).save(candidatePath)
const result = await finalizePresentation({
  explicitTotalSlideCount: 10,
  requiredNativeTableOwnerSlides: [],
  requiredNativeChartOwnerSlides: [],
  workspaceDir,
  candidatePath,
  finalPath: FINAL_PPTX,
  pythonExecutable: RUNTIME_PYTHON,
  integrityValidatorPath: path.join(SKILL_DIR, 'container_tools/inspect_presentation_package_integrity.py'),
  layoutValidatorPath: path.join(SKILL_DIR, 'container_tools/inspect_presentation_layout_geometry.py'),
  layoutArgs: ['--expected-slide-size-emu', '12192000,6858000', '--validate-heading-fit'],
  fontPolicy: { basis: 'design', families: [font] },
  verifyArtifactToolImport: true,
  receiptPath: path.join(stagingDir, `${path.basename(FINAL_PPTX)}.validation.json`),
})
if (!result) throw new Error('Presentation finalization did not return a result')
