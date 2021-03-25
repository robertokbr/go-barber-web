import IUser from './IUser';

export default interface IAppointments {
  id: string;
  provider_id: string;
  user_id: string;
  formatedHour: string;
  date: string;
  created_at: string;
  updated_at: string;
  user_image: string;
  user: IUser;
}
