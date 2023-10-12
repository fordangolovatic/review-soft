import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { IconButton } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';


import useLogin from '../../services/hooks/useLogin';
import useProfile from '../../services/hooks/useProfile';
import style from './TopBar.module.css';

const TopBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

// eslint-disable-next-line no-unused-vars
const { data, error, loaded } = useProfile();
  const { logOut } = useLogin();


  const redirectTo = (path) => {
    navigate(path);
  };
  const returnTitle = () =>
    location.pathname
      .split('/')
      .join(' ')
      .trim()
      .split(' ')
      .join(': ')
      .split('-')
      .join(' ')
      .toLowerCase()
      .replace(/\b(\w)/g, (s) => s.toUpperCase());

  return (
    <div>
      <div className={style.container}>
        <div className={style.navBar}>
          <IconButton
            title="home"
            aria-label="delete"
            size="large"
            onClick={() => redirectTo('/')}
          >
            <HomeTwoToneIcon style={{ color: 'whitesmoke' }} />
          </IconButton>
          <div className={style.locationNav}>{returnTitle()}
            {
              !loaded ? (
                  <div>
                    Loading...
                  </div>
              ):(
                  <div>
                    Welcome {data.firstName} { data.lastName}
                  </div>
              )
            }

          </div>
          <div>
            <IconButton
                title="Account"
                aria-label="delete"
                size="large"
                style={{ color: 'whitesmoke' }}
                onClick={()=>{redirectTo('/profile')}}
            >
              <SentimentSatisfiedAltIcon />
            </IconButton>

            <IconButton
                title="logout"
                aria-label="delete"
                size="large"
                style={{ color: 'whitesmoke' }}
                onClick={logOut}
            >
              <LogoutTwoToneIcon />
            </IconButton>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TopBar;
