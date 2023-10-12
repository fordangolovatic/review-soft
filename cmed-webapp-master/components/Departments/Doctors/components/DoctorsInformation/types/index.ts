interface IDoctorData {
  img: string;
  title: string;
  text: string;
}
interface IFind {
  title: string;
  text: string;
}
interface ICard {
  id: number;
  title: string;
  text: string;
  textTranslate: string;
}
export interface ICardProps {
  data: ICard;
}
export interface IDoctorProps {
  data: IDoctorData;
}

export interface IFindProps {
  data: IFind;
}
