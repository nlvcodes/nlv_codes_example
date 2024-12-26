import {FieldHook} from 'payload'



export const afterChangeFieldHook: FieldHook = async (
  {
    collection,
    global,
    data,
    operation,
    originalDoc,
    overrideAccess,
    field,
    findMany,
    path,
    previousDoc,
    previousValue,
    value,
    req,
    context,
    previousSiblingDoc,
    schemaPath,
    siblingDocWithLocales
  }
) => {
  if (operation === 'create') {
    // do something
    if (previousValue === value) {
      // do nothing
    } else if (previousValue !== value) {
      // do something else
    }
  } else if (operation === 'update') {
    // do something else
  }
}