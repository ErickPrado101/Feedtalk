'use client'

import { useState, useEffect } from 'react'
import Header from './components/Header'
import FeedbackForm from './components/FeedbackForm'
import FeedbackList from './components/FeedbackList'
import PopularComments from './components/PopularComments'
import UserProfile from './components/UserProfile'

// Tipos
interface Feedback {
  id: number
  content: string
  author: string
  likes: number
  comments: { id: number; content: string; author: string }[]
}

// Dados simulados iniciais
const initialFeedbacks: Feedback[] = [
  {
    id: 1,
    content: 'Ótimo serviço! Recomendo a todos.',
    author: 'João Silva',
    likes: 15,
    comments: [
      { id: 1, content: 'Concordo plenamente!', author: 'Maria Souza' },
      { id: 2, content: 'Também tive uma ótima experiência.', author: 'Pedro Santos' }
    ]
  },
  {
    id: 2,
    content: 'Poderia melhorar o atendimento ao cliente.',
    author: 'Ana Oliveira',
    likes: 8,
    comments: [
      { id: 3, content: 'Tive problemas similares.', author: 'Carlos Ferreira' }
    ]
  }
]

const popularComments = [
  { id: 1, content: 'Excelente plataforma!', author: 'Luísa Mendes', likes: 50 },
  { id: 2, content: 'Precisa de mais recursos.', author: 'Rafael Costa', likes: 35 },
  { id: 3, content: 'Ótimo custo-benefício.', author: 'Fernanda Lima', likes: 28 }
]

export default function Home() {
  const [nickname, setNickname] = useState('')
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(initialFeedbacks)

  useEffect(() => {
    const storedNickname = localStorage.getItem('nickname')
    if (storedNickname) {
      setNickname(storedNickname)
    }
  }, [])

  const handleNicknameSet = (newNickname: string) => {
    setNickname(newNickname)
    localStorage.setItem('nickname', newNickname)
  }

  const handleFeedbackSubmit = (content: string, isAnonymous: boolean) => {
    const newFeedback: Feedback = {
      id: Date.now(),
      content,
      author: isAnonymous ? 'Anônimo' : nickname,
      likes: 0,
      comments: []
    }
    setFeedbacks(prevFeedbacks => [newFeedback, ...prevFeedbacks])
  }

  const handleLike = (id: number) => {
    setFeedbacks(prevFeedbacks =>
      prevFeedbacks.map(feedback =>
        feedback.id === id ? { ...feedback, likes: feedback.likes + 1 } : feedback
      )
    )
  }

  const handleComment = (feedbackId: number, comment: string) => {
    setFeedbacks(prevFeedbacks =>
      prevFeedbacks.map(feedback =>
        feedback.id === feedbackId
          ? {
              ...feedback,
              comments: [
                ...feedback.comments,
                { id: Date.now(), content: comment, author: nickname }
              ]
            }
          : feedback
      )
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <Header />
      <main className="container mx-auto px-6 py-12">
        {!nickname ? (
          <UserProfile onNicknameSet={handleNicknameSet} />
        ) : (
          <>
            <h1 className="text-3xl font-semibold mb-8 text-center text-gray-100">Bem-vindo, {nickname}!</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-8 bg-gray-800 shadow-xl rounded-2xl p-8 transition-all hover:shadow-2xl">
                <FeedbackForm onSubmit={handleFeedbackSubmit} />
                <FeedbackList 
                  feedbacks={feedbacks}
                  onLike={handleLike}
                  onComment={handleComment}
                />
              </div>
              <div className="bg-gray-800 shadow-xl rounded-2xl p-8 transition-all hover:shadow-2xl">
                <PopularComments comments={popularComments} />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
