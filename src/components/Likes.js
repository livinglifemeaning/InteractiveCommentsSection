import PlusIcon from "./Icons/PlusIcon";
import MinusIcon from "./Icons/MinusIcon";
import classes from "../styles/Likes.module.scss";
const Likes = ({ likes, id, parentId, fetchCommentsData }) => {
  const increaseByOne = () => {
    let newLikes = likes + 1;
    if (parentId) {
      fetch(
        `https://frontend-mentor-projects-19f70-default-rtdb.firebaseio.com/interactiveCommentsData/${parentId}/replies/${id}/likes.json`,
        {
          method: "PUT",
          body: JSON.stringify(newLikes),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTimeout(() => {
        fetchCommentsData();
      }, 500);
    } else {
      fetch(
        `https://frontend-mentor-projects-19f70-default-rtdb.firebaseio.com/interactiveCommentsData/${id}/likes.json`,
        {
          method: "PUT",
          body: JSON.stringify(newLikes),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTimeout(() => {
        fetchCommentsData();
      }, 500);
    }
  };
  const decreaseByOne = () => {
    let newLikes = likes - 1;
    if (parentId) {
      fetch(
        `https://frontend-mentor-projects-19f70-default-rtdb.firebaseio.com/interactiveCommentsData/${parentId}/replies/${id}/likes.json`,
        {
          method: "PUT",
          body: JSON.stringify(newLikes),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTimeout(() => {
        fetchCommentsData();
      }, 500);
    } else {
      fetch(
        `https://frontend-mentor-projects-19f70-default-rtdb.firebaseio.com/interactiveCommentsData/${id}/likes.json`,
        {
          method: "PUT",
          body: JSON.stringify(newLikes),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTimeout(() => {
        fetchCommentsData();
      }, 500);
    }
  };
  const likeCommentHandler = () => {
    const likedStatus = JSON.parse(localStorage.getItem(`${id}`));
    if (!likedStatus) {
      localStorage.setItem(
        id,
        '{"hasBeenLiked" : true, "hasBeenDisliked" : false}'
      );
      increaseByOne();
    } else if (!likedStatus.hasBeenLiked && !likedStatus.hasBeenDisliked) {
      localStorage.setItem(
        id,
        '{"hasBeenLiked" : true, "hasBeenDisliked" : false}'
      );
      increaseByOne();
    } else if (likedStatus.hasBeenDisliked) {
      localStorage.setItem(
        id,
        '{"hasBeenLiked" : false, "hasBeenDisliked" : false}'
      );
      increaseByOne();
    }
  };
  const dislikeCommentHandler = () => {
    const likedStatus = JSON.parse(localStorage.getItem(`${id}`));
    if (!likedStatus) {
      localStorage.setItem(
        id,
        '{"hasBeenLiked" : false, "hasBeenDisliked" : true}'
      );
      decreaseByOne();
    } else if (!likedStatus.hasBeenLiked && !likedStatus.hasBeenDisliked) {
      localStorage.setItem(
        id,
        '{"hasBeenLiked" : false, "hasBeenDisliked" : true}'
      );
      decreaseByOne();
    } else if (likedStatus.hasBeenLiked) {
      localStorage.setItem(
        id,
        '{"hasBeenLiked" : false, "hasBeenDisliked" : false}'
      );
      decreaseByOne();
    }
  };

  return (
    <div className={classes.likesBar}>
      <span className={classes.like} onClick={likeCommentHandler}>
        <PlusIcon id={id} />
      </span>
      <span className={classes.amountOfLikes}>{likes}</span>
      <span className={classes.dislike} onClick={dislikeCommentHandler}>
        <MinusIcon id={id} />
      </span>
    </div>
  );
};

export default Likes;
