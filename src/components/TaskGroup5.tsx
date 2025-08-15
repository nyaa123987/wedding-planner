import TaskGroup, { Task } from './TaskGroup';
import { useState } from 'react';

interface Props {
  activeGroup: string | null;
  setActiveGroup: (groupName: string) => void;
}

export default function TaskGroup5({ activeGroup, setActiveGroup }: Props) {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Beauty', completed: false },
    { id: 2, text: 'Make-up and hair', completed: false },
    { id: 3, text: 'Pick up the rings and make sure they fit', completed: false },
    { id: 4, text: 'Bridal wear', completed: false },
    { id: 5, text: 'Plan reception layout', completed: false },
    { id: 6, text: 'Finalise your place card settings', completed: false },
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
                <p>Schedule your beauty and body treatments.</p>
                <a href='/beauty'>Tips and tricks</a>
            </>
        )
    }
    if (task.id === 2) {
        return (
            <>
                <p>Have a make-up and hair trial and book your appointment for the day.</p>
                <a href='/make-up'>Beauty tips</a>
                <a href='/vendors/beauticians'>Find a beautician.</a>
            </>
        )
    }
    if (task.id === 4) {
        return (
            <>
                <p>Finalise your dress and have fittings for you and your bridesmaids.</p>
            </>
        )
    }
    if (task.id === 5) {
        return (
            <>
                <p>Co-ordinate and plan your reception layout, as well as speeches etc.</p>
            </>
        )
    }
    return null;
  };

  return (
    <TaskGroup
      title="A month before the wedding"
      groupName="TaskGroup5"
      tasks={tasks}
      onTaskToggle={toggleTask}
      activeGroup={activeGroup}
      setActiveGroup={setActiveGroup}
      renderExtras={renderExtras}
    />
  );
}
