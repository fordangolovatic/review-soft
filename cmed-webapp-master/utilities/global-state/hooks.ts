import { ImmutableObject, useHookstate } from '@hookstate/core';
import {
  SetFilterOption,
  SortOptions,
} from '../../components/FiltersCollection/components/CollapseMenu';
import { appState } from './state';

export const useGlobalState = () => {
  const state = useHookstate(appState);

  return {
    authMethod: state.authMethod.get({ noproxy: true }),
    setIsAuthMethod: (value: {
      open: boolean;
      type: 'sign-in' | 'sign-up';
      redirect?: string;
    }) => {
      state.authMethod.set(() => value);
    },
    isLoggedIn: state.isLoggedIn.get({ noproxy: true }),
    setIsLoggedIn: (value: boolean) => {
      state.isLoggedIn.set(() => value);
    },
    selectedFilters: state.selectedFilters.get({ noproxy: true }),
    setSelectedFilters: (
      value: SetFilterOption | ImmutableObject<SetFilterOption>,
    ) => {
      state.selectedFilters.set(() => value);
    },
    filters: state.filters.get({ noproxy: true }),
    setFilters: (value: SetFilterOption | ImmutableObject<SetFilterOption>) => {
      state.filters.set(() => value);
    },
    sort: state.sort.get({ noproxy: true }),
    setSort: (value: SortOptions) => {
      state.sort.set(() => value);
    },
  };
};
