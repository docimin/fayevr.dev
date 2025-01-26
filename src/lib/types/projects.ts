import { Models } from 'node-appwrite'

export interface ProjectsType {
  total: number
  documents: ProjectsDocumentsType[]
}

export interface ProjectsDocumentsType extends Models.Document {
  name: string
  gitRepo: string
  branch: string
  customUrl: string
  imageId: string
  private: boolean
  status:
    | 'Completed'
    | 'Online'
    | 'Ongoing'
    | 'Maintenance'
    | 'Pending'
    | 'Error'
    | 'Paused'
    | 'Archived'
}
