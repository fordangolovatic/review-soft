import AccessibilityIcon from '@mui/icons-material/Accessibility';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FeedIcon from '@mui/icons-material/Feed';
import ForumIcon from '@mui/icons-material/Forum';
import GamesIcon from '@mui/icons-material/Games';
import GroupIcon from '@mui/icons-material/Group';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MedicationIcon from '@mui/icons-material/Medication';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import PermDataSettingIcon from '@mui/icons-material/PermDataSetting';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './LeftBar.module.css';

const LeftBar = () => {
  // const [openMenu, setOpenMenu] = useState(false);
  const [openManagers, setOpenManagers] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);
  const [openPosts, setOpenPosts] = useState(false);
  const [dataSetting, setDataSetting] = useState(false);

  const navigate = useNavigate();
  const redirectTo = (path) => {
    navigate(path);
  };
  // const openMenuList = () => {
  //   setOpenMenu(!openMenu);
  //   setOpenUsers(false);
  //   setOpenPosts(false);
  //   setOpenManagers(false);
  // };

  const openUsersList = () => {
    setOpenUsers(!openUsers);
    // setOpenMenu(true);
  };
  // const openPostsList = () => {
  //   setOpenPosts(!openPosts);
  //   // setOpenMenu(true);
  // };
  const openManagersList = () => {
    setOpenManagers(!openManagers);
    // setOpenMenu(true);
  };
  const openDataSetting = () => {
    setDataSetting(!dataSetting);
    // setOpenMenu(true);
  };

  return (
    <div
      // onMouseEnter={openMenuList}
      // onMouseLeave={openMenuList}
      className={style.sideBar}
    >
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: '#eceff1' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {/* Users */}

        <ListItemButton onClick={openUsersList}>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
          <div>{openUsers ? <ExpandLess /> : <ExpandMore />}</div>
        </ListItemButton>

        <Collapse in={openUsers} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => redirectTo('/users/doctors')}
            >
              <ListItemIcon>
                <MedicationIcon />
              </ListItemIcon>
              <ListItemText primary="Doctors" />
            </ListItemButton>

            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => redirectTo('/users/patients')}
            >
              <ListItemIcon>
                <AccessibilityIcon />
              </ListItemIcon>
              <ListItemText primary="Patients" />
            </ListItemButton>

            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => redirectTo('/users/translaters')}
            >
              <ListItemIcon>
                <GTranslateIcon />
              </ListItemIcon>
              <ListItemText primary="Translaters" />
            </ListItemButton>

            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => redirectTo('users/residents')}
            >
              <ListItemIcon>
                <TransferWithinAStationIcon />
              </ListItemIcon>
              <ListItemText primary="Residents" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Posts */}
        <ListItemButton
          onClick={() => {
            setOpenPosts(!openPosts);
          }}
        >
          <ListItemIcon>
            <AllInboxIcon />
          </ListItemIcon>
          <ListItemText primary="Posts" />
          <div>{openPosts ? <ExpandLess /> : <ExpandMore />}</div>
        </ListItemButton>
        <Collapse in={openPosts} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => redirectTo('/posts/articles')}
            >
              <ListItemIcon>
                <FeedIcon />
              </ListItemIcon>
              <ListItemText primary="Articles" />
            </ListItemButton>

            {/* <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => redirectTo('/posts/news')}
            >
              <ListItemIcon>
                <NewspaperIcon />
              </ListItemIcon>
              <ListItemText primary="News" />
            </ListItemButton> */}

            {/* <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => redirectTo('/posts/medical-journal')}
            >
              <ListItemIcon>
                <ReceiptLongIcon />
              </ListItemIcon>
              <ListItemText primary="Medical Journal" />
            </ListItemButton> */}
          </List>
        </Collapse>

        {/* Forum */}

        <ListItemButton onClick={() => redirectTo('/forum')}>
          <ListItemIcon>
            <ForumIcon />
          </ListItemIcon>
          <ListItemText primary="Forum" />
        </ListItemButton>

        {/* Data Setting */}

        <ListItemButton onClick={openDataSetting}>
          <ListItemIcon>
            <PermDataSettingIcon />
          </ListItemIcon>
          <ListItemText primary="Data Setting" />
          <div>{dataSetting ? <ExpandLess /> : <ExpandMore />}</div>
        </ListItemButton>

        <Collapse in={dataSetting} timeout="auto" unmountOnExit>

          <List component="div" disablePadding>

            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => redirectTo('/settings/roles')}
            >
              <ListItemIcon>
                <GamesIcon />
              </ListItemIcon>
              <ListItemText primary="Roles" />
            </ListItemButton>






          </List>
        </Collapse>
        {/* Reports */}


        <ListItemButton onClick={() => redirectTo('/reports')}>
          <ListItemIcon>
            <ReportGmailerrorredIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItemButton>

        {/* Managers */}

        <ListItemButton onClick={openManagersList}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Managers" />
          <div>{openManagers ? <ExpandLess /> : <ExpandMore />}</div>
        </ListItemButton>
        <Collapse in={openManagers} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => redirectTo('/managers/super-admin')}
            >
              <ListItemIcon>
                <AdminPanelSettingsIcon />
              </ListItemIcon>
              <ListItemText primary="SuperAdmin" />
            </ListItemButton>

            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => redirectTo('/managers/admin')}
            >
              <ListItemIcon>
                <ContactMailIcon />
              </ListItemIcon>
              <ListItemText primary="Admin" />
            </ListItemButton>

            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => redirectTo('/managers/managers')}
            >
              <ListItemIcon>
                <ManageAccountsIcon />
              </ListItemIcon>
              <ListItemText primary="Managers" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </div>
  );
};

export default LeftBar;
