import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth } from '../../redux/slices/auth'
import Button from '@mui/material/Button';
import { useNavigate, Navigate, useParams } from "react-router-dom";
import styles from './Header.module.scss';
import Container from '@mui/material/Container';

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth)
  let isAuthAdmin = window.localStorage.getItem('email');

  if(isAuthAdmin === "ivashenko-01@mail.ru"){
    isAuthAdmin = true;
    
    return (
      <div className={styles.root}>
        <Container maxWidth="lg">
          <div className={styles.inner}>
            <Link className={styles.logo} to="/">
              <div>ROCKET BOT</div>
            </Link>
            <div className={styles.buttons}>
  
              {isAuth ? (
                <>
                  <Link to="/add-post">
                    <Button variant="contained">Написать статью</Button>
                  </Link>
                  <Link to="/office">
                    <Button variant="outlined">Личный кабинет</Button>
                  </Link>
                  <Button onClick={onClickLogout} variant="contained" color="error">
                    Выйти
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outlined">Войти</Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="contained">Создать аккаунт</Button>
                  </Link>
                </>
              )}
  
            </div>
          </div>
        </Container>
      </div>
    );
  } else {
    isAuthAdmin = false;
  }

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>ROCKET BOT</div>
          </Link>
          <div className={styles.buttons}>

            {isAuth ? (
              <>
                <Link to="/office">
                  <Button variant="outlined">Личный кабинет</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}

          </div>
        </div>
      </Container>
    </div>
  );
};
