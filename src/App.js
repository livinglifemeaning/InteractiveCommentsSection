import { useState, useEffect } from "react";
import DeleteModal from "./components/DeleteModal";
import Comments from "./components/Comments";

function App() {
  const [commentData, setCommentData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [commentToBeDeleted, setCommentToBeDeleted] = useState([]);

  useEffect(() => {
    fetchCommentsData();
  }, []);

  const fetchCommentsData = async () => {
    setIsLoading(true);
    let response = await fetch(
      "https://frontend-mentor-projects-19f70-default-rtdb.firebaseio.com/interactiveCommentsData.json"
    );
    let data = await response.json();

    const loadedComments = [];

    for (const key in data) {
      const replies = data[key].replies;
      const commentReplies = [];
      if (replies) {
        for (const key in replies) {
          commentReplies.push({
            id: key,
            handle: replies[key].handle,
            timestamp: replies[key].timestamp,
            comment: replies[key].comment,
            likes: replies[key].likes,
            isUser: replies[key].isCurrentUser,
            replyto: replies[key].replyto,
            date: replies[key].date,
          });
        }
      }
      let sortedReplies = commentReplies.sort((a, b) =>
        a.date.localeCompare(b.date)
      );
      loadedComments.push({
        id: key,
        handle: data[key].handle,
        timestamp: data[key].timestamp,
        comment: data[key].comment,
        likes: data[key].likes,
        replies: replies ? sortedReplies : [],
        isUser: data[key].isCurrentUser,
        date: data[key].date,
      });
    }
    let sortedComments = loadedComments.sort((a, b) =>
      a.date.localeCompare(b.date)
    );
    console.log(sortedComments);
    setIsLoading(false);
    setCommentData(sortedComments);
  };

  const submitNewComment = (newComment) => {
    fetch(
      "https://frontend-mentor-projects-19f70-default-rtdb.firebaseio.com/interactiveCommentsData.json",
      {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setTimeout(() => {
      fetchCommentsData();
    }, 500);
  };
  const submitNewReply = (newReply, commentRepliedToId) => {
    fetch(
      `https://frontend-mentor-projects-19f70-default-rtdb.firebaseio.com/interactiveCommentsData/${commentRepliedToId}/replies.json`,
      {
        method: "POST",
        body: JSON.stringify(newReply),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setTimeout(() => {
      fetchCommentsData();
    }, 500);
  };
  const updateEditedComment = (updatedComment, commentId, parentCommentId) => {
    if (parentCommentId) {
      fetch(
        `https://frontend-mentor-projects-19f70-default-rtdb.firebaseio.com/interactiveCommentsData/${parentCommentId}/replies/${commentId}/comment.json`,
        {
          method: "PUT",
          body: JSON.stringify(updatedComment),
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
        `https://frontend-mentor-projects-19f70-default-rtdb.firebaseio.com/interactiveCommentsData/${commentId}/comment.json`,
        {
          method: "PUT",
          body: JSON.stringify(updatedComment),
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
  const deleteComment = () => {
    let id = commentToBeDeleted[0];
    let parentId = commentToBeDeleted[1];
    console.log(id, parentId);
    if (parentId) {
      fetch(
        `https://frontend-mentor-projects-19f70-default-rtdb.firebaseio.com/interactiveCommentsData/${parentId}/replies/${id}.json`,
        {
          method: "DELETE",
        }
      );
      setTimeout(() => {
        fetchCommentsData();
        closeModal();
        setCommentToBeDeleted([]);
      }, 500);
    } else {
      fetch(
        `https://frontend-mentor-projects-19f70-default-rtdb.firebaseio.com/interactiveCommentsData/${id}.json`,
        {
          method: "DELETE",
        }
      );
      setTimeout(() => {
        fetchCommentsData();
        closeModal();
        setCommentToBeDeleted([]);
      }, 500);
    }
  };
  const openModal = (id, parentId) => {
    setModalOpen(true);
    setCommentToBeDeleted([id, parentId]);
  };
  const closeModal = () => {
    setModalOpen(false);
    setCommentToBeDeleted([]);
  };

  return (
    <main>
      {modalOpen && (
        <DeleteModal closeModal={closeModal} deleteComment={deleteComment} />
      )}
      <Comments
        commentData={commentData}
        isLoading={isLoading}
        submitNewComment={submitNewComment}
        submitNewReply={submitNewReply}
        updateEditedComment={updateEditedComment}
        openModal={openModal}
        fetchCommentsData={fetchCommentsData}
      />
    </main>
  );
}

export default App;
