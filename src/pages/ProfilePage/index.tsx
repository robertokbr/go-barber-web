import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { FiPower, FiClock } from 'react-icons/fi';
import DayPicker, { DayModifiers } from 'react-day-picker';
import { isToday, format, parseISO, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { Link } from 'react-router-dom';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Calendar,
  NextAppointments,
  Section,
  Appointment,
} from './styles';
import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import 'react-day-picker/lib/style.css';
import api from '../../services/api';

import datesUtils from '../../utils/dates';
import IAppointments from '../../models/IAppointments';
import CustomAvatar from '../../components/CustomAvatar';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

const ProfilePage: React.FC = () => {
  const { signOut, user } = useAuth();

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const [appointments, setAppointments] = useState<IAppointments[]>([]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then(response => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);

  useEffect(() => {
    api
      .get<IAppointments[]>('/appointments/me', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => {
        const appointmentsFormated = response.data.map(appointment => ({
          ...appointment,
          formatedHour: format(parseISO(appointment.date), 'HH:mm'),
        }));

        const sortedAppointments = appointmentsFormated.sort((a, b) =>
          a.formatedHour > b.formatedHour ? 1 : -1,
        );

        setAppointments(sortedAppointments);
      });
  }, [selectedDate]);

  const disabledDays = useMemo(() => {
    const dates = monthAvailability.filter(
      availability => availability.available === false,
    );

    return dates.map(
      date =>
        new Date(currentMonth.getFullYear(), currentMonth.getMonth(), date.day),
    );
  }, [monthAvailability, currentMonth]);

  const { dayLabel, formatedDate, formatedDay } = useMemo(() => {
    return {
      dayLabel: isToday(selectedDate) && 'Hoje',
      formatedDate: format(selectedDate, "'Dia' dd 'de' MMMM", {
        locale: ptBR,
      }),
      formatedDay: format(selectedDate, 'cccc', {
        locale: ptBR,
      }),
    };
  }, [selectedDate]);

  const morningAppointments = useMemo(
    () =>
      [...appointments]
        .reverse()
        .filter(appointment => parseISO(appointment.date).getHours() < 12),
    [appointments],
  );

  const afternoonAppointments = useMemo(
    () =>
      [...appointments]
        .reverse()
        .filter(appointment => parseISO(appointment.date).getHours() > 12),
    [appointments],
  );

  const nextAppointments = useMemo(
    () =>
      appointments.find(appointment =>
        isAfter(parseISO(appointment.date), new Date()),
      ),
    [appointments],
  );

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />
          <Profile>
            <CustomAvatar size="small">
              <img src={user.avatar_url} alt={user.name} />
            </CustomAvatar>
            <div>
              <span>Bem vindo!</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>
          <button type="button" onClick={signOut}>
            <FiPower size={20} />
          </button>
        </HeaderContent>
      </Header>
    </Container>
  );
};

export default ProfilePage;
