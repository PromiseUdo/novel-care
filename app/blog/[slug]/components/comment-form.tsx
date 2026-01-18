'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useCommentContext } from '@/context/comment-context';
import { CommentSchema, CommentSchemaType } from '@/types/comment-schema';

export default function CommentForm({ postId }: { postId: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { dispatchComment } = useCommentContext();

  const form = useForm<CommentSchemaType>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      id: undefined,
      name: '',
      email: '',
      comment: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: CommentSchemaType) => {
    setIsSubmitting(true);
    const tempId = `temp-${Date.now()}`;
    const clientTimestamp = new Date().toISOString();
    const tempComment = {
      id: tempId,
      author: data.name,
      comment: data.comment,
      timestamp: clientTimestamp,
    };

    dispatchComment({ type: 'ADD', comment: tempComment });
    // toast.info("Submitting your comment...");

    try {
      const response = await fetch('/api/submit-comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          comment: data.comment,
          postId,
          timestamp: clientTimestamp,
        }),
      });

      if (response.ok) {
        const { comment } = await response.json();
        // console.log("API response comment:", comment);
        dispatchComment({
          type: 'UPDATE',
          comment: {
            id: tempId,
            author: comment.author,
            comment: comment.comment,
            timestamp: comment.timestamp,
          },
        });
        // toast.success("Comment submitted successfully!");
        form.reset();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to submit comment');
        dispatchComment({ type: 'REMOVE', id: tempId });
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast.error('An unexpected error occurred');
      dispatchComment({ type: 'REMOVE', id: tempId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <p className="text-[24px] font-medium">Share your thoughts</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Email (Optional)</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Comment"
                      className="resize-none h-[144px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex items-center justify-start">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-[300px] font-semibold h-[52px] text-black bg-[#E67817] rounded-[64px]"
            >
              {isSubmitting ? 'Posting...' : 'Post'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
