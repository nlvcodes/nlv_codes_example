import type {Block} from 'payload'

export const Code: Block = {
  slug: 'code',
  interfaceName: 'CodeBlock',
  fields: [
    {
      name: 'filename',
      type: 'text',
    },
    {
      name: 'language',
      type: 'select',
      options: [
        { label: 'TypeScript', value: 'typescript' },
        { label: 'TSX', value: 'tsx' },
        { label: 'JavaScript', value: 'javascript' },
        { label: 'JSX', value: 'jsx' },
        {label: 'HTML', value: 'html'},
        {label: 'CSS', value: 'css'},
        {label: 'JSON', value: 'json'},
        {label: 'Python', value: 'python'},
      ],
      defaultValue: 'typescript',
    },
    {
      name: 'code',
      type: 'code',
      label: false,
      required: true,
    }
  ]
}