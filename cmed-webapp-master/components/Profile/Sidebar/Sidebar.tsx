import {
  AccountBalanceOutlined,
  BusinessCenterOutlined,
  CalendarMonthOutlined,
  CollectionsBookmarkOutlined,
  EmailOutlined,
  FactCheckOutlined,
  FeedOutlined,
  GroupOutlined,
  GroupsOutlined,
  MenuBookOutlined,
  PersonOutlineOutlined,
  PollOutlined,
} from '@mui/icons-material';
import { Divider, ListItemIcon, ListItemText, MenuList, Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useTranslation } from 'next-i18next';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { FC, useCallback, useEffect } from 'react';
import { useSidebarItems } from '../../../utilities/hooks/useSidebarItems';
import { AccountTypeEnum } from '../../Auth/SignUp';
import { SkeletonCollection } from '../../SkeletonCollection';
import ActivityProgram from '../ActivityProgram';
import Analysis from '../Analysis';
import Consultations from '../Consultations';
import FavoriteArticles from '../FavoriteArticles';
import FavoriteDoctors from '../FavoriteDoctors';
import MedicalAssistants from '../MedicalAssistants';
import MedicalRecord from '../MedicalRecord';
import Message from '../Message';
import MyArticles from '../MyArticles';
import { PersonalInformation } from '../personal-information';
import { ProfessionalInformation } from '../professional-information';
import { SidebarItem, SidebarWrapper } from '../styled';
import Wallet from '../Wallet';
import { SidebarSkeleton } from './SidebarSkeleton';

export const menuItems = [
  {
    id: 1,
    items: [
      {
        id: 1,
        translationKey: 'personalInfo',
        value: 'personal-information',
        title: 'Personal Info',
        icon: PersonOutlineOutlined,
        component: <PersonalInformation />,
        keys: [
          AccountTypeEnum.DOCTOR,
          AccountTypeEnum.RESIDENT,
          AccountTypeEnum.PATIENT,
        ],
      },
      {
        id: 2,
        translationKey: 'medicalRecord',
        value: 'medical-record',
        title: 'Medical record',
        icon: MenuBookOutlined,
        component: <MedicalRecord />,
        keys: [AccountTypeEnum.PATIENT],
      },
      {
        id: 3,
        translationKey: 'professionalInfo',
        value: 'professional-information',
        title: 'Professional info',
        icon: BusinessCenterOutlined,
        component: <ProfessionalInformation />,
        keys: [AccountTypeEnum.DOCTOR, AccountTypeEnum.RESIDENT],
      },
      {
        id: 4,
        translationKey: 'wallet',
        value: 'wallet',
        title: 'Wallet',
        component: <Wallet />,
        icon: AccountBalanceOutlined,
        keys: [
          AccountTypeEnum.DOCTOR,
          AccountTypeEnum.RESIDENT,
          AccountTypeEnum.PATIENT,
        ],
      },
    ],
  },
  {
    id: 2,
    items: [
      {
        id: 5,
        translationKey: 'messages',
        value: 'messages',
        title: 'Messages',
        component: <Message />,
        icon: EmailOutlined,
        keys: [
          AccountTypeEnum.DOCTOR,
          AccountTypeEnum.RESIDENT,
          AccountTypeEnum.PATIENT,
        ],
      },
      {
        id: 6,
        translationKey: 'activityProgram',
        value: 'activity-program',
        title: 'Activity program',
        component: <ActivityProgram />,
        icon: CalendarMonthOutlined,
        keys: [AccountTypeEnum.DOCTOR, AccountTypeEnum.RESIDENT],
      },
      {
        id: 7,
        translationKey: 'consultations',
        value: 'consultations',
        title: 'Consultations',
        component: <Consultations />,
        icon: FactCheckOutlined,
        keys: [AccountTypeEnum.PATIENT, AccountTypeEnum.DOCTOR],
      },
      {
        id: 8,
        translationKey: 'analysis',
        value: 'analysis',
        title: 'Analysis',
        component: <Analysis />,
        icon: PollOutlined,
        keys: [AccountTypeEnum.DOCTOR, AccountTypeEnum.RESIDENT],
      },
      {
        id: 9,
        translationKey: 'medicalAssistants',
        value: 'medical-assistants',
        title: 'Medical assistants',
        component: <MedicalAssistants />,
        icon: GroupsOutlined,
        keys: [AccountTypeEnum.DOCTOR],
      },
    ],
  },
  {
    id: 3,
    items: [
      {
        id: 10,
        translationKey: 'favoriteDoctors',
        value: 'favorite-doctors',
        title: 'Favorite doctors',
        component: <FavoriteDoctors />,
        icon: GroupOutlined,
        keys: [AccountTypeEnum.PATIENT],
      },
      {
        id: 11,
        translationKey: 'favoriteArticles',
        value: 'favorite-articles',
        title: 'Favorite articles',
        component: <FavoriteArticles />,
        icon: CollectionsBookmarkOutlined,
        keys: [AccountTypeEnum.PATIENT],
      },
      {
        id: 12,
        translationKey: 'myArticles',
        value: 'my-articles',
        title: 'My Articles',
        component: <MyArticles />,
        icon: FeedOutlined,
        keys: [AccountTypeEnum.DOCTOR],
      },
    ],
  },
];
// export const menuItems2 = [
//   {
//     id: 1,
//     items: {
//       'personal-information': {
//         id: 1,
//         translationKey: 'personalInfo',
//         value: 'personal-information',
//         title: 'Personal Info',
//         icon: PersonOutlineOutlined,
//         component: <PersonalInformation />,
//         keys: [
//           AccountTypeEnum.DOCTOR,
//           AccountTypeEnum.RESIDENT,
//           AccountTypeEnum.PATIENT,
//         ],
//       },
//       'medical-record': {
//         id: 2,
//         translationKey: 'medicalRecord',
//         value: 'medical-record',
//         title: 'Medical record',
//         icon: MenuBookOutlined,
//         component: <MedicalRecord />,
//         keys: [AccountTypeEnum.PATIENT],
//       },
//       'professional-information': {
//         id: 3,
//         translationKey: 'professionalInfo',
//         value: 'professional-information',
//         title: 'Professional info',
//         icon: BusinessCenterOutlined,
//         component: <ProfessionalInformation />,
//         keys: [AccountTypeEnum.DOCTOR, AccountTypeEnum.RESIDENT],
//       },
//       wallet: {
//         id: 4,
//         translationKey: 'wallet',
//         value: 'wallet',
//         title: 'Wallet',
//         component: <Wallet />,
//         icon: AccountBalanceOutlined,
//         keys: [
//           AccountTypeEnum.DOCTOR,
//           AccountTypeEnum.RESIDENT,
//           AccountTypeEnum.PATIENT,
//         ],
//       },
//     },
//   },
//   {
//     id: 2,
//     items: {
//       messages: {
//         id: 5,
//         translationKey: 'messages',
//         value: 'messages',
//         title: 'Messages',
//         component: <Message />,
//         icon: EmailOutlined,
//         keys: [
//           AccountTypeEnum.DOCTOR,
//           AccountTypeEnum.RESIDENT,
//           AccountTypeEnum.PATIENT,
//         ],
//       },
//       'activity-program': {
//         id: 6,
//         translationKey: 'activityProgram',
//         value: 'activity-program',
//         title: 'Activity program',
//         component: <ActivityProgram />,
//         icon: CalendarMonthOutlined,
//         keys: [AccountTypeEnum.DOCTOR, AccountTypeEnum.RESIDENT],
//       },
//       consultations: {
//         id: 7,
//         translationKey: 'consultations',
//         value: 'consultations',
//         title: 'Consultations',
//         component: <Consultations />,
//         icon: FactCheckOutlined,
//         keys: [AccountTypeEnum.PATIENT],
//       },
//       analysis: {
//         id: 8,
//         translationKey: 'analysis',
//         value: 'analysis',
//         title: 'Analysis',
//         component: <Analysis />,
//         icon: PollOutlined,
//         keys: [AccountTypeEnum.DOCTOR, AccountTypeEnum.RESIDENT],
//       },
//       'medical-assistants': {
//         id: 9,
//         translationKey: 'medicalAssistants',
//         value: 'medical-assistants',
//         title: 'Medical assistants',
//         component: <MedicalAssistants />,
//         icon: GroupsOutlined,
//         keys: [AccountTypeEnum.DOCTOR],
//       },
//     },
//   },
//   {
//     id: 3,
//     items: {
//       'favorite-doctors': {
//         id: 10,
//         translationKey: 'favoriteDoctors',
//         value: 'favorite-doctors',
//         title: 'Favorite doctors',
//         component: <FavoriteDoctors />,
//         icon: GroupOutlined,
//         keys: [AccountTypeEnum.PATIENT],
//       },
//       'favorite-articles': {
//         id: 11,
//         translationKey: 'favoriteArticles',
//         value: 'favorite-articles',
//         title: 'Favorite articles',
//         component: <FavoriteArticles />,
//         icon: CollectionsBookmarkOutlined,
//         keys: [AccountTypeEnum.PATIENT],
//       },
//     },
//   },
// ];

export const Sidebar: FC = () => {
  const { t } = useTranslation('profile');
  const { shouldDisplaySidebarItem, isLoading } = useSidebarItems();
  const pathname = usePathname();
  const router = useRouter();

  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    if (!searchParams.get('tab') && !router.asPath.includes('?tab=')) {
      router.push(pathname + '?' + createQueryString('tab', 'personal-information'));
    }
  }, [createQueryString, pathname, router, searchParams]);

  const isTabSelected = useCallback(
    (tabName: string) => tabName === searchParams.get('tab'),
    [searchParams],
  );

  return (
    <SidebarWrapper
      sx={{
        width: 200,
        minHeight: 860,
        height: 'inherit',
      }}
    >
      <SkeletonCollection skeleton={<SidebarSkeleton />} isLoading={isLoading}>
        <MenuList>
          <Stack spacing={'11px'}>
            {menuItems.map((block) => (
              <Stack key={block.id} spacing={'3px'}>
                {block.items.map(
                  (item) =>
                    shouldDisplaySidebarItem(item.keys) && (
                      <SidebarItem
                        key={item.id}
                        onClick={() => {
                          router.push(
                            pathname + '?' + createQueryString('tab', item.value),
                          );
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            color: isTabSelected(item.value) ? '#00A04A' : grey[600],
                          }}
                        >
                          {<item.icon />}
                        </ListItemIcon>
                        <ListItemText
                          sx={{
                            color: isTabSelected(item.value) ? '#00A04A' : grey[600],
                          }}
                        >
                          {t(`s-${item.translationKey}`)}
                        </ListItemText>
                      </SidebarItem>
                    ),
                )}
                {block.id !== menuItems[menuItems.length - 1].id && <Divider />}
              </Stack>
            ))}
          </Stack>
        </MenuList>
      </SkeletonCollection>
    </SidebarWrapper>
  );
};
