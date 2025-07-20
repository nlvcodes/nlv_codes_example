import { getCloudinaryFolders } from 'payload-storage-cloudinary'
import { FieldClient } from './field.client'

export async function selectField() {
	const folders = await getCloudinaryFolders()
	return <FieldClient folders={folders} />
}