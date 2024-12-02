import {useState, useEffect} from 'react';
import "devextreme/dist/css/dx.light.css";
import { Scheduler } from "devextreme-react/scheduler";
import { useQuery } from '@apollo/client';

const Schedule = () => {
  const [schedules, setSchedules] = useState([]);
  