import TaskGroup, { Task } from './TaskGroup';
import { useState } from 'react';

interface Props {
  activeGroup: string | null;
  setActiveGroup: (groupName: string) => void;
}

export default function TaskGroup3({ activeGroup, setActiveGroup }: Props) {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Work on your guest list', completed: false },
    { id: 2, text: 'Start planning your honeymoon', completed: false },
    { id: 3, text: 'Choose your invitations', completed: false },
    { id: 4, text: 'Bridal wear (gowns and dresses)', completed: false },
    { id: 5, text: 'Groom\'s suits', completed: false },
    { id: 6, text: 'Shoes (ladies)', completed: false },
    { id: 7, text: 'Shoes (groom)', completed: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const renderExtras = (task: Task) => {
    if (task.id === 3) {
        return (
            <>
                <p>If you are going to make your own invitations, then choose your paper and start making them, as this will take longer than ordering them through a printer.</p>
                <a href='/invitations'>See invitation card designs</a>
                <a href='/invitation-card-vendors'>See invitation card vendors</a>
            </>
        )
    }
    if (task.id === 4) {
        return (
            <>
                <p>For the bride: Find a reautable dressmaker or store to design or buy your dress, as well as your bridesmaids' dresses.</p>
                <a href='/dresses'>See beautiful designs</a>
                <a href='/dressmakers'>Need a dressmaker vendor?</a>
            </>
        )
    }
    if (task.id === 5) {
        return (
            <>
                <p>For the groom: Find a reputable dressmaker or store to design or buy your suit.</p>
                <a href='/suits'>See designs</a>
                <a href='/dressmakers'>Need a dressmaker vendor?</a>
            </>
        )
    }
    if (task.id === 6) {
        return (
            <>
                <p>For the bride: Be smart when choosing your shoes and make sure you get comfortable ones and break them in, the last thing you need are blisters on your wedding day.</p>
                <a href='/shoes'>See beautiful designs</a>
                <a href='/dressmakers'>Need a dressmaker vendor?</a>
            </>
        )
    }
    if (task.id === 7) {
        return (
            <>
                <a href='/shoes'>See designs</a>
                <a href='/dressmakers'>Need a dressmaker vendor?</a>
            </>
        )
    }
    return null;
  };

  return (
    <TaskGroup
      title="Five months before the wedding"
      groupName="TaskGroup3"
      tasks={tasks}
      onTaskToggle={toggleTask}
      activeGroup={activeGroup}
      setActiveGroup={setActiveGroup}
      renderExtras={renderExtras}
    />
  );
}
