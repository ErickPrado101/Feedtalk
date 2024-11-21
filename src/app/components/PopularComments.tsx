import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThumbsUp } from 'lucide-react'

interface Comment {
  id: number
  content: string
  author: string
  likes: number
}

interface PopularCommentsProps {
  comments: Comment[]
}

export default function PopularComments({ comments }: PopularCommentsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Comentários Populares</CardTitle>
      </CardHeader>
      <CardContent>
        {comments.map(comment => (
          <div key={comment.id} className="flex items-start space-x-4 mb-4">
            <Avatar>
              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${comment.author}`} />
              <AvatarFallback>{comment.author.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">{comment.author}</p>
              <p className="text-sm text-gray-400 mt-1">{comment.content}</p>
              <div className="flex items-center mt-2 text-sm text-blue-400">
                <ThumbsUp className="w-4 h-4 mr-1" />
                <span>{comment.likes} curtidas</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
