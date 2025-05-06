'use client'
import type {Form as FormType, FormFieldBlock} from '@payloadcms/plugin-form-builder/types'
import React,{useCallback, useState, useRef} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {fields} from './field'
import {RichText} from '@/components/RichText'
import {SerializedEditorState} from '@payloadcms/richtext-lexical/lexical'
import {getClientSideURL} from '@/utilities/getURL'
import SubmitButton from '@/components/CustomerForm/SubmitButton'
import {LoaderCircle} from 'lucide-react'
import ReCAPTCHA from 'react-google-recaptcha'
import {getCookie} from '@/utilities/getCookie'
import {usePathname} from 'next/navigation'

type FormBlockType = {
  blockName?: string,
  blockType?: 'formBlock'
  enableCompanionText?: boolean,
  form: FormType & { requireRecaptcha?: boolean },
  companionText?: SerializedEditorState
}

export const FormBlock: React.FC<{
  id?: string
} & FormBlockType> = (props) => {
  const {
    enableCompanionText,
    form: formFromProps,
    form: {id: formID, confirmationType, confirmationMessage, submitButtonLabel, requireRecaptcha} = {},
    companionText
  } = props

  const formMethods = useForm({
    defaultValues: formFromProps.fields,
  })

  const {
    control,
    formState: {errors},
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{message: string; status?: string} | undefined>()

  const recaptcha = useRef<ReCAPTCHA>(null)

  const pathname = usePathname()

  const onSubmit = useCallback((data: FormFieldBlock[]) => {
    let loadingTimerID: ReturnType<typeof setTimeout>
    const submitForm = async () => {

      const captchaValue = recaptcha.current ? recaptcha.current.getValue() : undefined

      if (recaptcha && !captchaValue) {
        if (requireRecaptcha) {
          setIsLoading(false)
          setError({
            message: 'Please complete reCAPTCHA.',
          })
          return
        }
      }

      setError(undefined)
      loadingTimerID = setTimeout(() => {
        setIsLoading(true)
      }, 1000)


      const dataToSend = Object.entries(data).map(([name, value]) => ({
        field: name,
        value,
      }))

      try {
        const hubspotCookie = getCookie('hubspotutk')
        const pageUri = `${getClientSideURL()}${pathname}`
        const slugParts = pageUri.split('/')
        const pageName = slugParts.at(-1) === '' ? 'Home' : slugParts.at(-1)
        const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
          body: JSON.stringify({
            form: formID,
            submissionData: dataToSend,
            recaptcha: captchaValue,
            hubspotCookie,
            pageUri,
            pageName,
          }),
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
        })

        const res = await req.json()

        clearTimeout(loadingTimerID)

        if (req.status >= 400) {
          setIsLoading(false)
          setError({
            message: res.errors?.[0]?.message || 'Internal Server Error',
            status: res.status
          })
          return
        }

        setIsLoading(false)
        setHasSubmitted(true)
        recaptcha.current?.reset?.()
      } catch (e) {
        console.warn(e)
        setIsLoading(false)
        setError({
          message: 'Something went wrong.'
        })
        recaptcha.current?.reset?.()
      }
    }
    void submitForm()
  }, [formID, requireRecaptcha])

  return (
    <section className={`md:grid md:grid-cols-12 gap-4 m-4 p-4 text-emerald-950 rounded-md`}>
      {enableCompanionText && companionText && !hasSubmitted && (
        <RichText data={companionText} className={`mb-8 lg:mb-12 md:col-span-6 xl:col-span-4 text-center md:text-start`} />
      )}
      <div className={`p-4 lg:p-8 border border-emerald-950 rounded-md md:col-span-6 xl:col-span-8`}>
        <FormProvider {...formMethods}>
          {!isLoading && hasSubmitted && confirmationType === 'message' && (
            <RichText data={confirmationMessage} className={`text-center`} />
          )}
          {isLoading && !hasSubmitted && (
            <p className={`flex items-center mb-4`}>
              <span><LoaderCircle className={`animate-spin me-2`} /> Loading, please wait...</span>
            </p>
          )}
          {error && <div className={`text-red-400}`}>{`${error.status || 'Error'}: ${error.message || ''}`}</div> }
          {!hasSubmitted && (
            <form id={formID} onSubmit={handleSubmit(onSubmit)}>
              <div className={`mb-4 last:mb-0 sm:flex sm:flex-wrap sm:gap-4`}>
                {formFromProps && formFromProps.fields &&
                formFromProps.fields?.map((field, index) => {
                  const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                  if (Field) {
                    return (
                      <Field
                      key={index}
                      form={formFromProps}
                      {...field}
                      {...formMethods}
                        control={control}
                      errors={errors}
                      register={register}
                      />
                    )
                  }
                  return null
                })}
              </div>
              {requireRecaptcha && <div className={`px-4 pt-2 pb-4 flex justify-center`}>
                <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ``} ref={recaptcha} className={`overflow-hidden w-[300px] h-[76px] rounded-sm border border-emerald-950`} />

              </div>}
              <SubmitButton loading={isLoading} text={submitButtonLabel!} form={formID} />

            </form>
          )}
        </FormProvider>
      </div>
    </section>
  )



}