"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface CommentType {
  id: string;
  author: string;
  comment: string;
  timestamp: string;
}

type CommentAction =
  | { type: "ADD"; comment: CommentType }
  | { type: "UPDATE"; comment: CommentType }
  | { type: "REMOVE"; id: string };

interface CommentContextType {
  comments: CommentType[];
  dispatchComment: (action: CommentAction) => void;
  fetchComments: (postId: string) => Promise<void>;
}

const CommentContext = createContext<CommentContextType | undefined>(undefined);

export const CommentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const fetchComments = useCallback(async (postId: string) => {
    try {
      const response = await fetch(
        `${baseUrl}/api/comments/${encodeURIComponent(postId)}`,
        { cache: "no-store" }
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch comments: ${response.statusText}`);
      }
      const data: CommentType[] = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }, []);

  const dispatchComment = useCallback((action: CommentAction) => {
    setComments((prevComments) => {
      switch (action.type) {
        case "ADD":
          return [action.comment, ...prevComments];
        case "UPDATE":
          return prevComments.map((c) =>
            c.id === action.comment.id ? action.comment : c
          );
        case "REMOVE":
          return prevComments.filter((c) => c.id !== action.id);
        default:
          return prevComments;
      }
    });
  }, []);

  return (
    <CommentContext.Provider
      value={{ comments, dispatchComment, fetchComments }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export const useCommentContext = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error("useCommentContext must be used within a CommentProvider");
  }
  return context;
};
