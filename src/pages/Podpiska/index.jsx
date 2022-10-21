import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";

import styles from "./Podpiska.module.scss";
import { fetchPodpiska, selectIsAuth } from '../../redux/slices/auth'

export const Podpiska = () => {

  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch();
  const {register, handleSubmit, setError, formState: { errors,   isValid}} = useForm({
    defaultValues: {
      email: '',
      password: '',
    }, 
    mode: 'onChange',
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchPodpiska(values));
    console.log(data);

    if(!data.payload){
      return alert('Не удалось авторизоваться');
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
        Регистрация подписки
      </Typography>
    <form onSubmit={handleSubmit(onSubmit)}>

      <TextField
        className={styles.field}
        label="ID пользователя"
        error = {Boolean(errors.id?.message)}
        helperText= {errors.id?.message}
        {...register('id', {required: 'Укажите: ID пользователя'})}
        fullWidth
      />

      <TextField 
        className={styles.field} 
        label="Имя пользователя" 
        error = {Boolean(errors.username?.message)}
        helperText= {errors.username?.message}
        {...register('username', {required: 'Укажите: Имя пользователя'})}
        fullWidth 
      />

      <TextField 
        className={styles.field} 
        label="ID гильдии" 
        error = {Boolean(errors.guildgrope?.message)}
        helperText= {errors.guildgrope?.message}
        {...register('guildgrope', {required: 'Укажите: ID гильдии'})}
        fullWidth 
      />

      <TextField 
        className={styles.field} 
        label="Уровень подписки" 
        error = {Boolean(errors.lvl?.message)}
        helperText= {errors.lvl?.message}
        {...register('lvl', {required: 'Укажите: Уровень подписки'})}
        fullWidth 
      />

      <TextField 
        className={styles.field} 
        label="Дата выдачи" 
        error = {Boolean(errors.date?.message)}
        helperText= {errors.date?.message}
        {...register('date', {required: 'Укажите: Дата выдачи'})}
        fullWidth 
      />

      <TextField 
        className={styles.field} 
        label="Наличие подписки" 
        error = {Boolean(errors.availability?.message)}
        helperText= {errors.availability?.message}
        {...register('availability', {required: 'Укажите: Наличие подписки'})}
        fullWidth 
      />

      <TextField 
        className={styles.field} 
        label="Срок действия" 
        error = {Boolean(errors.term?.message)}
        helperText= {errors.term?.message}
        {...register('term', {required: 'Укажите: Срок действия'})}
        fullWidth 
      />
      

      <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
        Зарегистрировать
      </Button>

    </form>
    </Paper>
  );
};
