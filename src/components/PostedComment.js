import { useState } from "react";
import NewComment from "./NewComment";
import DeleteButton from "./Icons/DeleteButton";
import EditButton from "./Icons/EditButton";
import ReplyButton from "./Icons/ReplyButton";

import AmyPNG from "../profile-images/image-amyrobson.png";
import AmyWEBP from "../profile-images/image-amyrobson.webp";
import JuliusPNG from "../profile-images/image-juliusomo.png";
import JuliusWEBP from "../profile-images/image-juliusomo.webp";
import MaxPNG from "../profile-images/image-maxblagun.png";
import MaxWEBP from "../profile-images/image-maxblagun.webp";
import RamsesPNG from "../profile-images/image-ramsesmiron.png";
import RamsesWEBP from "../profile-images/image-ramsesmiron.webp";
import classes from "../styles/PostedComment.module.scss";
import Likes from "./Likes";
import Input from "./UI/Input";
import Button from "./UI/Button";

const PostedComment = ({
  id,
  handle,
  timestamp,
  comment,
  likes,
  replies,
  isUser,
  submitNewReply,
  updateEditedComment,
  openModal,
  fetchCommentsData,
}) => {
  let ProfilePicPNG;
  let ProfilePicWEBP;
  if (handle === "juliusomo") {
    ProfilePicPNG = JuliusPNG;
    ProfilePicWEBP = JuliusWEBP;
  } else if (handle === "amyrobson") {
    ProfilePicPNG = AmyPNG;
    ProfilePicWEBP = AmyWEBP;
  } else if (handle === "maxblagun") {
    ProfilePicPNG = MaxPNG;
    ProfilePicWEBP = MaxWEBP;
  } else if (handle === "ramsesmiron") {
    ProfilePicPNG = RamsesPNG;
    ProfilePicWEBP = RamsesWEBP;
  }

  const [isReplyingToReply, setIsReplyingToReply] = useState(false);
  const [isReplyingToComment, setIsReplyingToComment] = useState(false);
  const [isEditingComment, setIsEditingComment] = useState([false, ""]);
  const [updatedComment, setUpdatedComment] = useState("");

  const replyToCommentHandler = () => {
    setIsReplyingToComment(true);
  };
  const replyToReplyHandler = () => {
    setIsReplyingToReply(true);
  };

  const editCommentHandler = (id) => {
    setIsEditingComment([true, id]);
  };

  const updateCommentHandler = (id, parentId) => {
    if (updatedComment !== "") {
      updateEditedComment(updatedComment, id, parentId);
    }
  };

  return (
    <>
      <div className={classes.commentBox}>
        <div className={classes.commentInfo}>
          <picture className={classes.profilePic}>
            <source srcSet={ProfilePicWEBP} type="image/webp"></source>
            <img src={ProfilePicPNG} alt="" />
          </picture>
          <p className={classes.commentor}>{handle}</p>
          {isUser && <p className={classes.you}>you</p>}
          <p className={classes.timestamp}>{timestamp}</p>
        </div>
        <div className={classes.comment}>
          {isEditingComment[0] && isEditingComment[1] === id ? (
            <Input defaultValue={comment} setCommentValue={setUpdatedComment} />
          ) : (
            <p>{comment}</p>
          )}
        </div>
        {isUser ? (
          <div className={classes.actionsBox}>
            <DeleteButton onClick={openModal} id={id} />
            <EditButton onClick={() => editCommentHandler(id)} />
          </div>
        ) : (
          <div className={classes.actionsBox}>
            <ReplyButton onClick={replyToCommentHandler} />
          </div>
        )}

        <Likes likes={likes} id={id} fetchCommentsData={fetchCommentsData} />
        {isEditingComment[0] && isEditingComment[1] === id && (
          <div className={classes.updateButton}>
            <Button onClick={() => updateCommentHandler(id)}>Update</Button>
          </div>
        )}
      </div>
      {isReplyingToComment && (
        <NewComment
          type="reply"
          replyto={handle}
          commentRepliedToId={id}
          submitNewReply={submitNewReply}
          setIsReplyingToComment={setIsReplyingToComment}
          isReplyingToComment={isReplyingToComment}
        />
      )}

      {/* Replies */}
      {replies &&
        replies.map((reply) => {
          if (reply.handle === "juliusomo") {
            ProfilePicPNG = JuliusPNG;
            ProfilePicWEBP = JuliusWEBP;
          } else if (reply.handle === "amyrobson") {
            ProfilePicPNG = AmyPNG;
            ProfilePicWEBP = AmyWEBP;
          } else if (reply.handle === "maxblagun") {
            ProfilePicPNG = MaxPNG;
            ProfilePicWEBP = MaxWEBP;
          } else if (reply.handle === "ramsesmiron") {
            ProfilePicPNG = RamsesPNG;
            ProfilePicWEBP = RamsesWEBP;
          }
          return (
            <>
              <div
                className={`${classes.commentBox} ${classes.reply}`}
                key={reply.id}
              >
                <div className={classes.commentInfo}>
                  <picture className={classes.profilePic}>
                    <source srcSet={ProfilePicWEBP} type="image/webp"></source>
                    <img src={ProfilePicPNG} alt="" />
                  </picture>
                  <p className={classes.commentor}>{reply.handle}</p>
                  {reply.isCurrentUser && <p className={classes.you}>you</p>}
                  <p className={classes.timestamp}>{reply.timestamp}</p>
                </div>
                <div className={classes.comment}>
                  {isEditingComment[0] && isEditingComment[1] === reply.id ? (
                    <Input
                      defaultValue={reply.comment}
                      setCommentValue={setUpdatedComment}
                    />
                  ) : (
                    <p>
                      <span className={classes.tag}>@{reply.replyto}</span>{" "}
                      {reply.comment}
                    </p>
                  )}
                </div>

                {reply.isUser ? (
                  <div className={classes.actionsBox}>
                    <DeleteButton
                      onClick={openModal}
                      id={reply.id}
                      parentId={id}
                    />
                    <EditButton onClick={() => editCommentHandler(reply.id)} />
                  </div>
                ) : (
                  <div className={classes.actionsBox}>
                    <ReplyButton onClick={replyToReplyHandler} />
                  </div>
                )}
                <Likes
                  likes={reply.likes}
                  id={reply.id}
                  parentId={id}
                  fetchCommentsData={fetchCommentsData}
                />
                {isEditingComment[0] && isEditingComment[1] === reply.id && (
                  <div className={classes.updateButton}>
                    <Button onClick={() => updateCommentHandler(reply.id, id)}>
                      Update
                    </Button>
                  </div>
                )}
              </div>

              {isReplyingToReply && (
                <NewComment
                  type="reply"
                  replyto={reply.handle}
                  commentRepliedToId={id}
                  submitNewReply={submitNewReply}
                  isReplyingToReply={isReplyingToReply}
                  setIsReplyingToReply={setIsReplyingToReply}
                />
              )}
            </>
          );
        })}
    </>
  );
};

export default PostedComment;
