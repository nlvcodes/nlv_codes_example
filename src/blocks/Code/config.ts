import type {Block} from 'payload'

export const Code: Block = {
  slug: 'code',
  interfaceName: 'CodeBlock',
  fields: [
    {
      name: 'language',
      type: 'select',
      options: [
        {label: 'TypeScript', value: 'typescript' },
        {label: 'TSX', value: 'tsx' },
        {label: 'JavaScript', value: 'javascript' },
        {label: 'JSX', value: 'jsx' },
        {label: 'JSON', value: 'json' },
        {label: 'CSS', value: 'css' },
        {label: 'HTML', value: 'html' },
        {label: 'Python', value: 'python' },
      ],
      defaultValue: 'typescript',
    },
    {
      name: 'filename',
      type: 'text',
    },
    {
      name: 'code',
      type: 'code',
      label: false,
      required: true,
    }
  ]
}