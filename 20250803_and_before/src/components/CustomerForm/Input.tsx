
type Props = {
  label: string
  name: string
  type: 'text' | 'password' | 'email'
  placeholder?: string
  required?: boolean
  defaultValue?: string
}

export const Input = (props: Props) => {
  return <div className={`flex flex-col gap-2`}>
    <label htmlFor={props.name}>{props.label}</label>
    <input required={props.required} className={`w-full bg-white text-emerald-950 border border-emerald-950 rounded-md p-2 leading-tight`} id={props.name} name={props.name} placeholder={props.placeholder ? props.placeholder : `Enter your ${props.label.toLowerCase()}`} type={props.type} defaultValue={props.defaultValue ? props.defaultValue : ''} />
  </div>
}