import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import CustomUuidEditor from '../components/tiptap-editor-with-custom-uuid'
import TiptapEditor from '../components/tiptap-editor'
import { cn } from '../lib/utils'

export const Route = createFileRoute('/')({ component: App })

const editorTabs = {
  builtIn: {
    label: 'Built-in UniqueId',
    summary: 'Uses @tiptap/extension-unique-id',
    description:
      'Baseline behavior with Tiptap’s official UniqueId extension.',
    Component: TiptapEditor,
  },
  customUuid: {
    label: 'Custom UUID Extension',
    summary: 'Uses the repo custom unique-id extension',
    description:
      'Compare the same drag-and-drop flow against the local UUID implementation.',
    Component: CustomUuidEditor,
  },
} as const

type EditorTabKey = keyof typeof editorTabs

const editorTabOrder: EditorTabKey[] = ['builtIn', 'customUuid']

function App() {
  const [activeTab, setActiveTab] = useState<EditorTabKey>('builtIn')
  const activeEditor = editorTabs[activeTab]
  const ActiveEditor = activeEditor.Component

  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <section className="island-shell rise-in rounded-[2rem] px-5 py-6 sm:px-7 sm:py-7">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="island-kicker mb-3">Editor Comparison</p>
              <h1 className="display-title text-4xl font-semibold tracking-tight text-[var(--sea-ink)] sm:text-5xl">
                Switch between both Tiptap editors
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--sea-ink-soft)] sm:text-base">
                Use the tabs below to compare drag-and-drop behavior between
                the stock UniqueId extension and the custom UUID extension in
                this repo.
              </p>
            </div>

            <div className="rounded-[1.25rem] border border-[var(--line)] bg-[rgba(255,255,255,0.55)] px-4 py-3 text-sm text-[var(--sea-ink-soft)] shadow-[0_12px_28px_rgba(23,58,64,0.08)] backdrop-blur-sm">
              <div className="font-semibold text-[var(--sea-ink)]">
                Active extension
              </div>
              <div className="mt-1">{activeEditor.summary}</div>
            </div>
          </div>

          <div
            className="grid gap-3 md:grid-cols-2"
            role="tablist"
            aria-label="Choose a Tiptap editor"
          >
            {editorTabOrder.map((tabKey) => {
              const tab = editorTabs[tabKey]
              const isActive = tabKey === activeTab

              return (
                <button
                  key={tabKey}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`editor-panel-${tabKey}`}
                  id={`editor-tab-${tabKey}`}
                  onClick={() => setActiveTab(tabKey)}
                  className={cn(
                    'rounded-[1.5rem] border px-4 py-4 text-left backdrop-blur-sm transition hover:-translate-y-px',
                    isActive
                      ? 'border-[var(--lagoon-deep)] bg-[rgba(79,184,178,0.12)] text-[var(--sea-ink)] shadow-[0_16px_32px_rgba(23,58,64,0.1)]'
                      : 'border-[var(--line)] bg-[rgba(255,255,255,0.52)] text-[var(--sea-ink-soft)] hover:border-[rgba(50,143,151,0.34)] hover:bg-[rgba(255,255,255,0.74)]',
                  )}
                >
                  <div className="text-sm font-semibold">{tab.label}</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--kicker)]">
                    {tab.summary}
                  </div>
                  <p className="mt-3 text-sm leading-6">{tab.description}</p>
                </button>
              )
            })}
          </div>

          <div
            id={`editor-panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`editor-tab-${activeTab}`}
            className="rounded-[1.75rem] border border-[var(--line)] bg-[rgba(255,255,255,0.36)] p-3 sm:p-4"
          >
            <ActiveEditor />
          </div>
        </div>
      </section>
    </main>
  )
}
