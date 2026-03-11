import DragHandle from '@tiptap/extension-drag-handle-react'
import Document from '@tiptap/extension-document'
import NodeRange from '@tiptap/extension-node-range'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

import { Dropcursor } from '@tiptap/extensions'
import { EditorContent, useEditor } from '@tiptap/react'
import { GripVertical } from 'lucide-react'
import UniqueIdExtension from "../tiptap-editor-with-custom-uuid/unique-id-extension"

const starterContent = `
  <p>Hello from Tiptap.</p>
  <p>Each paragraph has a unique ID, and you can drag it by the handle that appears on the left.</p>
  <p>Move these blocks around to reproduce the Unique ID drag-and-drop behavior.</p>
`

export default function TiptapEditorWithCustomUuid() {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      NodeRange,
      UniqueIdExtension.configure({
        types: 'all',
      }),
      Dropcursor,
    ],

    content: starterContent,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'tiptap-simple-editor__content',
      },
    },
  })

  return (
    <div className="tiptap-simple-editor">
      <div className="mb-4 flex flex-wrap items-center gap-2 text-sm font-semibold text-[var(--sea-ink-soft)]">
        <span className="rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1">
          @tiptap/react
        </span>
        <span className="rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1">
          Document
        </span>
        <span className="rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1">
          Paragraph
        </span>
        <span className="rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1">
          Text
        </span>
        <span className="rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1">
          NodeRange
        </span>
        <span className="rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1">
          DragHandle
        </span>
      </div>

      {editor ? (
        <div className="tiptap-simple-editor__canvas">
          <p className="mb-4 text-sm font-medium text-[var(--sea-ink-soft)]">
            Drag paragraphs by the grip on the left edge.
          </p>
          <DragHandle editor={editor} className="tiptap-simple-editor__drag-handle">
            <div className="tiptap-simple-editor__drag-handle-grip" aria-hidden="true">
              <GripVertical size={16} strokeWidth={2.4} />
            </div>
          </DragHandle>
          <EditorContent editor={editor} />
        </div>
      ) : (
        <div className="tiptap-simple-editor__content">
          <p>Hello from Tiptap.</p>
          <p>Each paragraph has a unique ID, and you can drag it by the handle on the left.</p>
          <p>Move these blocks around to reproduce the Unique ID drag-and-drop behavior.</p>
        </div>
      )}
    </div>
  )
}
