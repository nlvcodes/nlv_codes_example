import type {
  CollectionBeforeOperationHook,
  CollectionBeforeValidateHook,
  CollectionBeforeChangeHook,
  CollectionAfterChangeHook,
  CollectionBeforeReadHook,
  CollectionAfterReadHook,
  CollectionBeforeDeleteHook,
  CollectionAfterDeleteHook,
  CollectionAfterOperationHook,
  CollectionAfterErrorHook
} from 'payload'

export const afterErrorHook: CollectionAfterErrorHook = async (
  {
    error,
    context,
    graphqlResult,
    req,
    collection,
    result
  }
) => {

}

export const afterOperationHook: CollectionAfterOperationHook = async (
  {
    collection,
    args,
    req,
    operation,
    result
  }
) => {

}

export const afterDeleteHook: CollectionAfterDeleteHook = async (
  {
    collection,
    context,
    doc,
    id,
    req
  }
) => {

}

export const beforeDeleteHook: CollectionBeforeDeleteHook = async (
  {
    collection,
    context,
    id,
    req
  }
) => {

}

export const afterReadHook: CollectionAfterReadHook = async (
  {
    collection,
    context,
    doc,
    query,
    req
  }
) => {

}

export const beforeReadHook: CollectionBeforeReadHook = async (
  {
    collection,
    context,
    doc,
    query,
    req
  }
) => {

}

export const afterChangeHook: CollectionAfterChangeHook = async (
  {
    collection,
    context,
    doc,
    operation,
    previousDoc,
    req
  }
) => {
  const posts = await req.payload.find({
    collection: 'posts'
  })
}

export const beforeChangeHook: CollectionBeforeChangeHook = async (
  {
    collection,
    context,
    data,
    operation,
    originalDoc,
    req
  }
) => {}

export const beforeValidateHook: CollectionBeforeValidateHook = async (
  {
    collection,
    context,
    data,
    operation,
    originalDoc,
    req
  }
) => {}

export const beforeOperationHooks: CollectionBeforeOperationHook = async(
  {
    collection,
    context,
    operation,
    req
  }
) => {

}