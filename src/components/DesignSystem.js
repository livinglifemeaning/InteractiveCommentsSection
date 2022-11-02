import ProfilePic from "../profile-images/image-amyrobson.webp";
import ReplyButton from "./Icons/ReplyButton";
import EditButton from "./Icons/EditButton";
import DeleteButton from "./Icons/DeleteButton";
import PlusIcon from "./Icons/PlusIcon";
import MinusIcon from "./Icons/MinusIcon";
import classes from "../styles/DesignSystem.module.scss";

const DesignSystem = () => {
  return (
    <div className={classes.designSystem}>
      <h1>Design System</h1>
      <div className={classes.commentInfo}>
        <img src={ProfilePic} alt="" className={classes.profilePic} />
        <p className={classes.commentor}>amyrobson</p>
        <p className={classes.timestamp}>1 month ago</p>
      </div>
      <p className={classes.tag}>@maxblagun</p>
      <div className={classes.card}>
        <p className={classes.comment}>
          Impressive! Though it seems the drag feature could be improved. But
          overall it looks incredible. You've nailed the design and the
          responsiveness at various breakpoints works really well.
        </p>
      </div>
      <ReplyButton />
      <EditButton />
      <DeleteButton />
      <button className={classes.button}>Reply</button>
      <div className={classes.likesBar}>
        <span className={classes.like}>
          <PlusIcon />
        </span>
        <span className={classes.amountOfLikes}>4</span>
        <span className={classes.dislike}>
          <MinusIcon/>
        </span>
      </div>
    </div>
  );
};

export default DesignSystem;
