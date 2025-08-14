import TaskGroup, { Task } from './TaskGroup';
import { useState } from 'react';

interface Props {
  activeGroup: string | null;
  setActiveGroup: (groupName: string) => void;
}

export default function TaskGroup6({ activeGroup, setActiveGroup }: Props) {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Caterer', completed: false },
    { id: 2, text: 'Honeymoon reservations', completed: false },
    { id: 3, text: 'Finalise all minors', completed: false },
    { id: 4, text: 'Wedding rehearsal', completed: false },
    { id: 5, text: 'Suppliers', completed: false },
    { id: 6, text: 'Confirm transportation', completed: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );[]
  };

  const renderExtras = (task: Task) => {
    if (task.id === 1) {
        return (
            <>
                <p>Finalise numbers with your caterer.</p>
            </>
        )
    }
    if (task.id === 2) {
        return (
            <>
                <p>Confirm your honeymoon reservations and pack for your honeymoon.</p>
            </>
        )
    }
    if (task.id === 3) {
        return (
            <>
                <p>Finalise all minor details such as speeches, etc.</p>
            </>
        )
    }
    if (task.id === 4) {
        return (
            <>
                <p>Have your wedding rehearsal.</p>
            </>
        )
    }
    if (task.id === 5) {
        return (
            <>
                <p>Make sure all Suppliers have been paid.</p>
            </>
        )
    }
    if (task.id === 6) {
        return (
            <>
                <p>Confirm your transportation to and from the ceremony, and to the airport for your honeymoon.</p>
            </>
        )
    }
    return null;
  };

  return (
    <TaskGroup
      title="Final week before the wedding"
      groupName="TaskGroup6"
      tasks={tasks}
      onTaskToggle={toggleTask}
      activeGroup={activeGroup}
      setActiveGroup={setActiveGroup}
      renderExtras={renderExtras}
    />
  );
}
