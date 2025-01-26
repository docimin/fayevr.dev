import { databases } from '@/app/appwrite-client'
import { ProjectsType } from '@/lib/types/projects'

export async function getProjects() {
  const data: ProjectsType = await databases.listDocuments('main', 'projects')
  return data.documents
}

export async function getBoops() {
  const data = await databases.getDocument('main', 'counters', 'mainBoop')
  return data.boop
}
