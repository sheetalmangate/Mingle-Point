import "devextreme/dist/css/dx.light.css";
import { Scheduler } from "devextreme-react/scheduler";
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

const Schedule = () => {
  const { data, loading } = useQuery(GET_ME);
  const scheduleData = data?.me.meetingSchedules || [];
  console.log(scheduleData);
  // const xButton = document.querySelector("svg")?.parentNode as HTMLElement;
  // console.log(xButton);
  // xButton?.click();

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>Schedule</h1>
      <Scheduler
        dataSource={scheduleData}
        views={["day", "week", "month"]}
        defaultCurrentView="week"
        defaultCurrentDate={new Date()}
        showAllDayPanel={false}
        height={600}
      />
    </div>
  );
}
export default Schedule;
  
