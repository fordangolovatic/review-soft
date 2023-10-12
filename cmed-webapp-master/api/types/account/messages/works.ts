export interface Specialty {
  id: number;
  label: string;
  value: string;
}
export interface WorksSteps {
  id: number;
  title: string;
  step: string;
  text: string;
  img: string;
  overlay: string;
  hoverOverlay: string;
}
export interface WorksCards {
  id: number;
  title: string;
  steps: WorksSteps[];
}
export interface EcosystemCards {
  id: number;
  title: string;
  // introduction: string;
  // conclusion: string;
  list: string[];
}
export interface KeepCard {
  id: number;
  title: string;
  body: string;
  img: string;
  url: string;
}
export interface NavLink {
  id: number;
  title: string;
  href: string;
  submenu?: NavLink[];
  translationKey: string;
}
