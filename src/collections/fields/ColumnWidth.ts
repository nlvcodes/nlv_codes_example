import {Field} from 'payload'

export const ColumnWidth: Field = {
  type: 'select',
  name: 'columnWidth',
  options: [
    {label: 'Auto', value: 'none' },
    {label: '80%', value: '4/5' },
    {label: '75%', value: '3/4' },
    {label: '66%', value: '2/3' },
    {label: '50%', value: '1/2' },
    {label: '33%', value: '1/3' },
    {label: '25%', value: '1/4' },
    {label: '20%', value: '1/5' },
  ],
  defaultValue: 'none',
}