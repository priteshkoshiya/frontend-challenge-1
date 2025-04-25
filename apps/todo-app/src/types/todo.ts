export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export interface TodoEditMode {
  id: string;
  text: string;
}

export interface TodoEditProps {
  todo: Todo;
  onSave: (text: string) => void;
  onCancel: () => void;
}

export interface TodoDisplayProps {
  todo: Todo;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}