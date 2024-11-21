'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface FeedbackFormProps {
  onSubmit: (feedback: string, isAnonymous: boolean) => void
}

export default function FeedbackForm({ onSubmit }: FeedbackFormProps) {
  const [feedback, setFeedback] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (feedback.trim()) {
      onSubmit(feedback, isAnonymous)
      setFeedback('')
    }
  }

  return (
    <Card className="max-w-md mx-auto my-8 bg-gray-800 text-white p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl">
      <CardHeader className="border-b border-gray-700 pb-4 mb-4">
        <CardTitle className="text-2xl font-semibold text-gray-100">Compartilhe seu feedback</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="O que você está pensando?"
            className="min-h-[120px] p-4 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
          />
          <div className="flex items-center space-x-3 mt-4">
            <Switch
              id="anonymous-mode"
              checked={isAnonymous}
              onCheckedChange={setIsAnonymous}
              className="focus:ring-2 focus:ring-blue-500"
            />
            <Label htmlFor="anonymous-mode" className="text-sm text-gray-400">Modo anônimo</Label>
          </div>
        </CardContent>
        <CardFooter className="mt-6">
          <Button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-all duration-200">
            Enviar Feedback
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
