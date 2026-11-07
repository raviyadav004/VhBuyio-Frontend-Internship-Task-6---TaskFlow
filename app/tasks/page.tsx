import { TasksPageClient } from "@/components/TasksPageClient";

type TasksPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function TasksPage({
  searchParams,
}: TasksPageProps) {
  const { q = "" } = await searchParams;
  return <TasksPageClient searchQuery={q.trim()} />;
}