// pages/schedule.tsx
import { useState } from 'react';
import TaskGroup1 from '@/components/TaskGroup1';
import TaskGroup2 from '@/components/TaskGroup2';
import TaskGroup3 from '@/components/TaskGroup3';
import TaskGroup4 from '@/components/TaskGroup4';
import TaskGroup5 from '@/components/TaskGroup5';
import TaskGroup6 from '@/components/TaskGroup6';
import H1 from '../components/Heading1';

export default function SchedulePage() {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <H1>My Wedding Plan</H1>
      <TaskGroup1 activeGroup={activeGroup} setActiveGroup={setActiveGroup} />
      <TaskGroup2 activeGroup={activeGroup} setActiveGroup={setActiveGroup} />
      <TaskGroup3 activeGroup={activeGroup} setActiveGroup={setActiveGroup} />
      <TaskGroup4 activeGroup={activeGroup} setActiveGroup={setActiveGroup} />
      <TaskGroup5 activeGroup={activeGroup} setActiveGroup={setActiveGroup} />
      <TaskGroup6 activeGroup={activeGroup} setActiveGroup={setActiveGroup} />
    </main>
  );
}
