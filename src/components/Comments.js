
import PostedComment from "./PostedComment";
import NewComment from "./NewComment";

import classes from "../styles/Comments.module.scss";


const Comments = ({commentData, isLoading, submitNewComment, submitNewReply, updateEditedComment, openModal, fetchCommentsData}) => {
 
  return (
    <div className={classes.comments}>
        {isLoading && <p>Loading comments..</p>}
      {!isLoading &&
        commentData.length > 0 &&
        commentData.map((comment) => {
          return (
            <PostedComment
              key={comment.id}
              id={comment.id}
              handle={comment.handle}
              timestamp={comment.timestamp}
              comment={comment.comment}
              likes={comment.likes}
              replies={comment.replies}
              isUser={comment.isUser}
              submitNewReply={submitNewReply}
              updateEditedComment={updateEditedComment}
              openModal={openModal}
              fetchCommentsData={fetchCommentsData}
            />
          );
        })}

      <NewComment submitNewComment={submitNewComment}/>
    </div>
  );
};

export default Comments;
