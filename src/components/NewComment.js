import { useState } from "react";
import Input from "./UI/Input";
import Button from "./UI/Button";
import ProfilePicPNG from "../profile-images/image-juliusomo.png";
import ProfilePicWEBP from "../profile-images/image-juliusomo.webp";
import classes from "../styles/NewComment.module.scss";

const NewComment = ({
  submitNewComment,
  submitNewReply,
  type,
  replyto,
  commentRepliedToId,
  isReplyingToComment,
  isReplyingToReply,
  setIsReplyingToComment,
  setIsReplyingToReply,
}) => {
  const [commentValue, setCommentValue] = useState("");
  const getTimeStamp = () => {
    let date = new Date();
    let currentTime = 
      date.toLocaleTimeString().replace(/(.*)\D\d+/, '$1')
    .toLowerCase();

    let currentDate =
      date.toLocaleString("default", { month: "short" }) +
      " " +
      date.getDay() +
      ", " +
      date.getFullYear();

    let timestamp = currentDate + ", " + currentTime;

    let dateString = date.toISOString();
    return [timestamp, dateString];
  };
  const addNewCommentHandler = () => {
    let newCommentData;
    if (commentValue !== "") {
      let dateInfo = getTimeStamp();
      newCommentData = {
        comment: commentValue,
        handle: "juliusomo",
        isCurrentUser: true,
        likes: 0,
        timestamp: dateInfo[0],
        date: dateInfo[1],
      };
      submitNewComment(newCommentData);
      setCommentValue("");
    }
  };
  const addNewReplyHandler = () => {
    let newReplyData;
    if (commentValue !== "") {
      let dateInfo = getTimeStamp();
      newReplyData = {
        comment: commentValue,
        handle: "juliusomo",
        isCurrentUser: true,
        likes: 0,
        timestamp: dateInfo[0],
        date: dateInfo[1],
        replyto: replyto,
      };
      if (isReplyingToComment) {
        setIsReplyingToComment(false);
        submitNewReply(newReplyData, commentRepliedToId);
      } else if (isReplyingToReply) {
        setIsReplyingToReply(false);
        submitNewReply(newReplyData, commentRepliedToId);
      }
    }
  };
  return (
    <div
      className={`${classes.newComment} ${type === "reply" && classes.reply}`}
    >
      <picture className={classes.profilePic}>
        <source srcSet={ProfilePicWEBP} type="image/webp"></source>
        <img src={ProfilePicPNG} alt="" />
      </picture>
      <div className={classes.inputBox}>
        <Input defaultValue={commentValue} setCommentValue={setCommentValue} />
      </div>
      <div className={classes.btnBox}>
        <Button
          onClick={type === "reply" ? addNewReplyHandler : addNewCommentHandler}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default NewComment;
