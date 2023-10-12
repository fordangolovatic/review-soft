import { hookstate } from '@hookstate/core';
import {
  SetFilterOption,
  SortOptions,
} from '../../components/FiltersCollection/components/CollapseMenu';

export type AppState = {
  isLoggedIn: boolean;
  authMethod: {
    open: boolean;
    type: 'sign-in' | 'sign-up';
    redirect?: string;
  };
  selectedFilters: SetFilterOption;
  filters: SetFilterOption;
  sort?: SortOptions;
};

export const appState = hookstate<AppState>({
  isLoggedIn: false,
  authMethod: {
    open: false,
    type: 'sign-in',
  },
  selectedFilters: {
    specialities: [],
    languages: [],
    countries: [],
    periods: [],
  },
  filters: {
    specialities: [],
    languages: [],
    countries: [],
    periods: [],
  },
  sort: SortOptions.FAVORITE,
});
