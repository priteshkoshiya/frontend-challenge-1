import { TodoList } from "@/components/TodoList";

export default function Page() {
  return (
    <div className="w-full max-w-lg mx-auto p-4 sm:p-6 bg-white rounded-3xl border shadow-sm">
      <TodoList />
    </div>
  );
}
