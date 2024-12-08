import "devextreme/dist/css/dx.light.css";
import Scheduler, { Editing } from "devextreme-react/scheduler";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { ADD_MEETING } from "../utils/mutations";
import { useParams } from 'react-router-dom';

const Schedule = () => {

  //orange banner at the top of the page
  const xButton = document.querySelector("svg")?.parentNode as HTMLElement;
  xButton?.click();
  const { userId } = useParams();
  const { data, loading } = useQuery(QUERY_USER, { variables: { id: userId } });
  const scheduleData = data?.user.meetingSchedules || [];
  
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [addMeetingSchedule] = useMutation(ADD_MEETING, {
    refetchQueries: [{ query: QUERY_USER, variables: { id: userId } }],
  });
  const onAppointmentAdding = async (e: any) => {
    
    try {
      await addMeetingSchedule({
        variables: {
          startDate: e.appointmentData.startDate,
          endDate: e.appointmentData.endDate,
          dateId: userId,
          description: e.appointmentData.description,
          text: e.appointmentData.text,
        },
      });
      
    } catch (error) {
      console.error(error);
      e.cancel = true;
      alert("Failed to add meeting schedule");
    }
  };
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
        onAppointmentAdding={onAppointmentAdding}
        dateSerializationFormat="yyyy-MM-ddTHH:mm:ss"
      >
        <Editing allowAdding={!userId ? false : true} />
      </Scheduler>
    </div>
  );
}
export default Schedule;
  
