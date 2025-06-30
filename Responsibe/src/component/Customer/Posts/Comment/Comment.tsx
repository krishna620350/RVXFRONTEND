import React from "react";

export interface CommentData {
  id: number;
  author: string;
  text: string;
}

interface CommentProps {
  comment: CommentData;
}

const Comment: React.FC<CommentProps> = ({ comment }) => (
  <div className="bg-gray-800 rounded-lg p-3 mb-2">
    <div className="font-semibold text-blue-300">{comment.author}</div>
    <div className="text-gray-200">{comment.text}</div>
  </div>
);

export default Comment;
