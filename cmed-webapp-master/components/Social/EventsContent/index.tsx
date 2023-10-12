import { FC, useState } from 'react';
import { MyEvents } from './components';
import { EventsLayout } from './components/MyEvents/layout';

export interface EventsSelectedComponent {
  id: number;
  Component: FC;
}
export const EventsContent: FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<EventsSelectedComponent>({
    id: 1,
    Component: MyEvents,
  });
  return (
    <EventsLayout onChangeMenu={setSelectedMenu}>
      <selectedMenu.Component />
    </EventsLayout>
  );
};
