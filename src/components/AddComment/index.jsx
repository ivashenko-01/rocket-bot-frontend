import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth'

export const Index = () => {

  const isAuth = useSelector(selectIsAuth)

  if(!isAuth) {
    return;
  }

  const onSubmit = async () => {
    try {
      alert('На данный момент не получится отправить комментарий');
    } catch (error) {
      console.warn(error);
      alert('Ошибка при отправке комментария');
    }
  }


  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src="https://mui.com/static/images/avatar/5.jpg"
        />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          <Button onClick={onSubmit} variant="contained">Отправить</Button>
        </div>
      </div>
    </>
  );
};
