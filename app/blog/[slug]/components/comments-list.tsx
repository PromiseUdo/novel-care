"use client";

import React, { useEffect } from "react";
import Comment from "./comment";
import { useCommentContext } from "@/context/comment-context";

interface CommentType {
  id: string;
  author: string;
  comment: string;
  timestamp: string;
}

interface CommentsListProps {
  postId: string;
}

const CommentsList: React.FC<CommentsListProps> = ({ postId }) => {
  const { comments, fetchComments } = useCommentContext();

  useEffect(() => {
    fetchComments(postId);
  }, [postId, fetchComments]);

  return (
    <div className="w-full flex flex-col gap-[16px]">
      <p className="text-[24px] font-medium">Comments</p>
      {comments.length === 0 ? (
        <p className="text-[#4E4D4D]">
          No comments yet. Be the first to comment!
        </p>
      ) : (
        comments.map((comment) => (
          <Comment
            key={comment.id}
            author={comment.author}
            comment={comment.comment}
            timestamp={comment.timestamp}
          />
        ))
      )}
    </div>
  );
};

export default CommentsList;
