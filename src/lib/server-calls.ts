import { databases } from "@/app/appwrite-server";
import { ProjectsType } from "@/lib/types/projects";

export async function getProjects() {
  const data: ProjectsType = await databases.listDocuments("main", "projects");
  return data.documents;
}
