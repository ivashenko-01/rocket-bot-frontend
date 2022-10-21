import React from "react";
import { useParams } from "react-router-dom";
import { Post } from "../../components/Post";
import { Index } from "../../components/AddComment";
import { CommentsBlock } from "../../components/CommentsBlock";
import axios from '../../axios';
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import { useNavigate, Navigate, useParams } from "react-router-dom";

export const Office = () => {

    
  const isAuth = useSelector(selectIsAuth) // --- Проверка на авторизированность

  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();

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
        В разработке
      </Typography>
    </Paper>
  );
};
