import React from "react";
import { Post } from "../../components/Post";
import { Index } from "../../components/AddComment";
import { CommentsBlock } from "../../components/CommentsBlock";
import axios from '../../axios';
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate, useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import styles from "./Office.module.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { fetchAuth, selectIsAuth } from '../../redux/slices/auth'


export const Office = () => {

    
  const isAuth = useSelector(selectIsAuth) // --- Проверка на авторизированность

  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();

  const {register, handleSubmit, setError, formState: { errors,   isValid}} = useForm({
    defaultValues: {
      email: '',
      password: '',
    }, 
    mode: 'onChange',
  })

  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));
    console.log(data);

    if(!data.payload){
      return alert('Не удалось авторизоваться');
    }

    if('token' in data.payload){
      window.localStorage.setItem('token', data.payload.token)
    }
  }

  React.useEffect(()=>{
    axios
      .get(`/office`)
      .then((res) => {
        setData(res.data);
        setLoading(false)
      }).catch(err => {
        console.warn(err);
        alert('Ошибка при получении данных')
      })
  }, [])

  if(!window.localStorage.getItem('token') && !isAuth) { // --- Если не авторизирован, то выкидывать со страницы добавления статьи
    return <Navigate to="/" />;
  }

  if(isLoading) {
    return <Post isLoading={isLoading} isFullPost/>
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
    <form onSubmit={handleSubmit(onSubmit)}>

      <TextField
        className={styles.field}
        label="E-Mail"
        error = {Boolean(errors.email?.message)}
        helperText= {errors.email?.message}
        type="email"
        {...register('email', {required: 'Укажите почту'})}
        fullWidth
      />

      <TextField className={styles.field} 
        label="Пароль" 
        error = {Boolean(errors.password?.message)}
        helperText= {errors.password?.message}
        {...register('password', {required: 'Укажите пароль'})}
        fullWidth 
      />

      <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
        Войти
      </Button>

    </form>
    </Paper>
  );
};
