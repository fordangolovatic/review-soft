import { lowerCase } from 'lodash';
import { useCallback } from 'react';
import { useMetadataQuery } from '../../api/hooks/metadata';

export const useSidebarItems = () => {
  const { data: metadata, isLoading } = useMetadataQuery();

  const isAdmin = useCallback((accountType: string) => {
    return accountType === 'Admin';
  }, []);

  const shouldDisplaySidebarItem = (userCategories: string[]) => {
    if (!metadata || !metadata.accountType || isLoading) {
      return false;
    }

    const { accountType } = metadata;

    if (isAdmin(accountType)) {
      return true;
    }

    return userCategories.some(
      (userCategory) => lowerCase(userCategory) === accountType,
    );
  };

  return { shouldDisplaySidebarItem, isLoading };
};
