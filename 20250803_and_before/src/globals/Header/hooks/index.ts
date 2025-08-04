import {
  GlobalBeforeValidateHook,
  GlobalBeforeChangeHook,
  GlobalAfterChangeHook,
  GlobalBeforeReadHook,
  GlobalAfterReadHook,
} from 'payload'


export const afterReadHook: GlobalAfterReadHook = async (
  {req, doc, global, context, query, findMany}
) => {
  console.log(query, findMany, doc)
}

export const beforeReadHook: GlobalBeforeReadHook = async (
  {req, doc, global, context}
) => {
  // console.log(req)
}

export const afterChangeHook: GlobalAfterChangeHook = async (
  {req, global, context, doc, previousDoc}
) => {
  // console.log(doc)
}

export const beforeValidateHook: GlobalBeforeValidateHook = async (
  {global, context, req, data, originalDoc}
) => {
  if (global.slug === 'header') {
    // console.log(global.admin.group)
  }
}

export const beforeChangeHook: GlobalBeforeChangeHook = async ({global, req, originalDoc, data, context}) => {
  // console.log(data)
}