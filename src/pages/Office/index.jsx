import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Office.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth, fetchRegister } from '../../redux/slices/auth';
import { useForm } from 'react-hook-form';
import { Navigate } from "react-router-dom";


export const Office = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch();
  const {register, handleSubmit, setError, formState: { errors,   isValid}} = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    }, 
    mode: 'onChange',
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if(!data.payload){
      return alert('Не удалось зарегистрироваться');
    }

    if('token' in data.payload){
      window.localStorage.setItem('token', data.payload.token)
    }
  }

  if(!isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        В разработке
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
  </Paper>
  );
};
