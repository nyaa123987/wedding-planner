import TaskGroup, { Task } from './TaskGroup';
import { useState } from 'react';

interface Props {
  activeGroup: string | null;
  setActiveGroup: (groupName: string) => void;
}

export default function TaskGroup2({ activeGroup, setActiveGroup }: Props) {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Choose wedding theme/colours', completed: false },
    { id: 2, text: 'Honeymoon', completed: false },
    { id: 3, text: 'Photographer and videographer', completed: false },
    { id: 4, text: 'Decide on your bridal retinue.', completed: false },
    { id: 5, text: 'Catering', completed: false },
    { id: 6, text: 'Cake', completed: false },
    { id: 7, text: 'Choose your florist and decorator', completed: false },
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
        <div className='flex flex-col'>
            <p>Decide on your colour scheme. When choosing your colours, you should consider the following:</p>
            <ul className="list-none space-y-2 flex flex-col self-center">
                <li className="flex items-start pt-[2vh]"><span className="text-black mx-2 mt-0.5">➤</span><span className="italic">Consider the colours in the reception venue such as the carpet, curtains, wall colours. If you are draping the venue, then the colours of the above mentioned items will not really matter.</span></li>
                <li className="flex items-start"><span className="text-black mx-2 mt-0.5">➤</span><span className="italic">Ask the venue what colour napkins they provide, so they will not clash with your colour scheme.</span></li>
            </ul>
            <a className='text-[blue] hover:underline pt-[2vh]' href='/color-schemes'>Need some inspiration?</a>
        </div>
      )
    }
    if (task.id === 2) {
      return (
        <div className='flex flex-col'>
            <p>Discuss your honeymoon with your fiance and start getting quotations on destinations that you are interested in.</p>
            <a className='text-[blue] hover:underline pt-[2vh]' href='/honeymoon'>Honeymoon destinations</a>
        </div>
      )
    }
    if (task.id === 3) {
        return (
            <div className='flex flex-col'>
                <p>Choose and book your photographer and videographer, but remember to see their portfolios - they are only as good as the work they produce.</p>
                <a className='text-[blue] hover:underline pt-[2vh]' href='/photographers'>See photographer vendors</a>
                <a className='text-[blue] hover:underline pt-[2vh]' href='/videographers'>See videographer vendors</a>
            </div>
        )
    }
    if (task.id === 5) {
        return (
            <div className='flex flex-col'>
                <p>If the venue you hire does not do the catering, make sure you select and book one.</p>
                <a className='text-[blue] hover:underline pt-[2vh]' href='/caterers'>See catering vendors</a>
                <a className='text-[blue] hover:underline pt-[2vh]' href='/menu'>Need help planning the menu?</a>
            </div>
        )
    }
    if (task.id === 6) {
        return (
            <div className='flex flex-col'>
                <p>Choose and order your wedding cake, and your baker. Here are a few tips on how to choose the perfect cake maker for you:</p>
                <ul className="list-none space-y-2 flex flex-col self-center">
                    <li className="flex items-start pt-[2vh]"><span className="text-black mx-2 mt-0.5">➤</span><span className="italic">Decide on the type of cake you and your partner would like.</span></li>
                    <li className="flex items-start"><span className="text-black mx-2 mt-0.5">➤</span><span className="italic">Inform your baker of the colour scheme of your wedding so that the cake ties in with the theme.</span></li>
                    <li className="flex items-start"><span className="text-black mx-2 mt-0.5">➤</span><span className="italic">Make sure to check if your baker delivers - if not, organise for a friend or family member to collect the cake on the day of the wedding.</span></li>
                </ul>
                <a className='text-[blue] hover:underline pt-[2vh]' href='/cake-vendor'>Find a cake vendor</a>
                <a className='text-[blue] hover:underline pt-[2vh]' href='/cakes'>Browse cake designs</a>
            </div>
        )
    }
    if (task.id === 7) {
        return (
            <div className='flex flex-col'>
                <a className='text-[blue] hover:underline pt-[2vh]' href='/florists'>See florist vendors</a>
                <a className='text-[blue] hover:underline pt-[2vh]' href='/decorators'>See decorator vendors</a>
                <a className='text-[blue] hover:underline pt-[2vh]' href='/decorations'>Need some inspiration?</a>
            </div>
        )
    }
    return null;
  };

  return (
    <TaskGroup
      title="Seven months before the wedding"
      groupName="TaskGroup2"
      tasks={tasks}
      onTaskToggle={toggleTask}
      activeGroup={activeGroup}
      setActiveGroup={setActiveGroup}
      renderExtras={renderExtras}
    />
  );
}
