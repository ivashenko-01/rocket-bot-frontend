import React from "react";
import { useParams } from "react-router-dom";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";
import ReactMarkdown from "react-markdown";

export const FullPost = () => {

  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(()=>{
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false)
      }).catch(err => {
        console.warn(err);
        alert('Ошибка при получении статьи')
      })
  }, [])

  if(isLoading) {
    return <Post isLoading={isLoading} isFullPost/>
  }

  return (
    <>
      <Post
              id= {data._id}
              title= {data.title}
              imageUrl= {data.imageUrl ? `${process.env.REACT_APP_API_URL}${data.imageUrl}` : ''}
              user= {data.user}
              dateTime={data.dateTime}
              viewsCount={data.viewsCount}
              commentsCount={2}
              tags={data.tags}
        isFullPost
      >
      <ReactMarkdown children= {data.text} />
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Quiet Rabbit",
              avatarUrl: "https://ibb.co/yfNwMNX",
            },
            text: "В будущем к каждому посту можно будет прикреплять комментарии.",
          },
          {
            user: {
              fullName: "Rocket Bot",
              avatarUrl: "https://ibb.co/sVD8Q6f",
            },
            text: "На данный момент Вы не сможете их отправлять.",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
