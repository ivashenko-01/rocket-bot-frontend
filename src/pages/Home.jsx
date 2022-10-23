import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';


import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags } from '../redux/slices/posts';

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.data);
  const { posts, tags } = useSelector(state => state.posts);

  const isPostLoading = posts.status === "loading"
  const isTagsLoading = tags.status === "loading"

  React.useEffect(()=>{
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, [])

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostLoading ? [...Array(5)] : posts.items).map((obj, index) => 
          isPostLoading ? (
            <Post key={index}  isLoading={true}/>
          ) : (             
          <Post
              id= {obj._id}
              title= {obj.title}
              imageUrl= {obj.imageUrl ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}` : ''}
              user= {obj.user}
              dateTime={obj.dateTime}
              viewsCount={obj.viewsCount}
              commentsCount={2}
              tags={obj.tags}
              isEditable = {userData?._id === obj.user._id}
            />
          ), 
        )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Quiet Rabbit',
                  avatarUrl: 'https://ibb.co/yfNwMNX',
                },
                text: 'В будущем к каждому посту можно будет прикреплять комментарии.',
              },
              {
                user: {
                  fullName: 'Rocket Bot',
                  avatarUrl: 'https://ibb.co/sVD8Q6f',
                },
                text: 'На данный момент Вы не сможете их отправлять.',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
