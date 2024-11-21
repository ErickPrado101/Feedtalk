'use client'

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThumbsUp, MessageSquare } from 'lucide-react'

interface Feedback {
  id: number
  content: string
  author: string
  likes: number
  comments: { id: number; content: string; author: string }[]
}

interface FeedbackListProps {
  feedbacks: Feedback[]
  onLike: (id: number) => void
  onComment: (feedbackId: number, comment: string) => void
}

export default function FeedbackList({ feedbacks, onLike, onComment }: FeedbackListProps) {
  return (
    <div className="space-y-6">
      {feedbacks.map(feedback => (
        <Card key={feedback.id} className="shadow-lg rounded-xl border border-gray-700 bg-gray-800 hover:shadow-2xl transition-all duration-300 ease-in-out">
          <CardHeader className="flex items-center space-x-4 p-4">
            <Avatar>
              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${feedback.author}`} />
              <AvatarFallback>{feedback.author.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-semibold text-gray-100">{feedback.author}</p>
              <p className="text-sm text-gray-400">Feedback</p>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-gray-200">{feedback.content}</p>
            <div className="flex items-center mt-4 space-x-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onLike(feedback.id)}
                className="flex items-center space-x-2 text-gray-300 hover:text-blue-500 transition-all duration-200"
              >
                <ThumbsUp className="w-5 h-5" />
                <span>Curtir ({feedback.likes})</span>
              </Button>
              <span className="flex items-center text-sm text-gray-400">
                <MessageSquare className="w-5 h-5 mr-2" />
                {feedback.comments.length} comentários
              </span>
            </div>
          </CardContent>
          <CardFooter className="p-4 flex flex-col items-start space-y-3">
            <div className="w-full space-y-3">
              {feedback.comments.map(comment => (
                <div key={comment.id} className="bg-gray-700 p-3 rounded-lg shadow-sm">
                  <p className="text-sm font-medium text-gray-200">{comment.author}</p>
                  <p className="text-sm text-gray-400">{comment.content}</p>
                </div>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const target = e.target as typeof e.target & {
                  comment: { value: string }
                }
                onComment(feedback.id, target.comment.value)
                target.comment.value = ''
              }}
              className="w-full mt-6"
            >
              <Input
                type="text"
                name="comment"
                placeholder="Adicione um comentário..."
                className="w-full p-3 border border-gray-600 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-200"
              />
            </form>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
