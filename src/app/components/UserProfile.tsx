'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from 'lucide-react'

interface UserProfileProps {
  onNicknameSet: (newNickname: string) => void;
}

export default function UserProfile({ onNicknameSet }: UserProfileProps) {
  const [newNickname, setNewNickname] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNickname.trim().length < 3) {
      setError('O nickname deve ter pelo menos 3 caracteres.');
      return;
    }
    onNicknameSet(newNickname.trim());
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <Avatar className="w-24 h-24 mx-auto mb-4">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback><User className="w-12 h-12" /></AvatarFallback>
        </Avatar>
        <CardTitle className="text-2xl font-bold">Bem-vindo!</CardTitle>
        <CardDescription>Por favor, escolha um nickname para continuar.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="nickname">Nickname</Label>
              <Input
                id="nickname"
                placeholder="Digite seu nickname"
                value={newNickname}
                onChange={(e) => {
                  setNewNickname(e.target.value);
                  setError('');
                }}
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit">Entrar</Button>
        </CardFooter>
      </form>
    </Card>
  );
}

