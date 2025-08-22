import TaskGroup, { Task } from './TaskGroup';
import { useState } from 'react';
import Link from 'next/link';

interface Props {
  activeGroup: string | null;
  setActiveGroup: (groupName: string) => void;
}

export default function TaskGroup4({ activeGroup, setActiveGroup }: Props) {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Rings and ring cushion', completed: false },
    { id: 2, text: 'Address your invitations', completed: false },
    { id: 3, text: 'Transportation', completed: false },
    { id: 4, text: 'Mail or deliver your invitations', completed: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const renderExtras = (task: Task) => {
    if (task.id === 1) {
        return (
            <>
                <p>Purchase your ring cushion if you are going to have ring bearer.</p>
                <Link href='/vendors/jewelry'>Discover jewelry vendors.</Link>
            </>
        )
    }
    if (task.id === 3) {
        return (
            <>
                <p>Arrange your transportation to and from the ceremony.</p>
                <Link href='/transportation'>Transportation tips</Link>
            </>
        )
    }
    if (task.id === 4) {
        return (
            <>
                <Link href='/invitation-mailing'>Did you know?</Link>
            </>
        )
    }
    return null;
  };

  return (
    <TaskGroup
      title="Two months before the wedding"
      groupName="TaskGroup4"
      tasks={tasks}
      onTaskToggle={toggleTask}
      activeGroup={activeGroup}
      setActiveGroup={setActiveGroup}
      renderExtras={renderExtras}
    />
  );
}
