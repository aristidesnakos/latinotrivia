'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About CreateQuiz.Video</h1>
      <div className="space-y-4 text-md mb-12">
        <p>
          CreateQuiz.Video is the result of automating the process of creating mobile-formatted quizzes for <a className="text-blue-500 font-bold" href="https://www.llanai.com" target="_blank" rel="noopener noreferrer">Llanai</a>. After testing the waters on <a className="text-blue-500 font-bold" href="https://www.tiktok.com/@llanai_speaks" target="_blank" rel="noopener noreferrer">TikTok</a> and <a className="text-blue-500 font-bold" href="https://www.youtube.com/@latinotrivia" target="_blank" rel="noopener noreferrer">YouTube</a>, I noticed that there is a demand for simple quizzes. 
        </p>
        <p>
          Goal is to make quizzes easy to create and post on social media. Currently, you can <a className="text-blue-500 font-bold" href="https://youtu.be/6g_mn1dBn3I" target="_blank" rel="noopener noreferrer">make and post a quiz on YouTube in less than 2 minutes</a>.
        </p>
        <p className="mb-8">
          Get started by <a className="text-blue-500 font-bold" href="/create">creating your first quiz</a>.
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-6">Specialized Quiz Solutions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/for-teachers">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>For Teachers</CardTitle>
              <CardDescription>Create engaging classroom assessments</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Perfect for classroom engagement, homework assignments, and interactive learning. Create educational quizzes that make learning fun and effective.</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/for-students">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>For Students</CardTitle>
              <CardDescription>Self-paced learning tools</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Enhance your study sessions with interactive quizzes. Perfect for exam preparation, self-assessment, and active learning.</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/for-marketers">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>For Marketers</CardTitle>
              <CardDescription>Boost engagement and leads</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Create interactive content that engages your audience and generates leads. Perfect for social media marketing and audience interaction.</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/for-christmas">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>Holiday Quizzes</CardTitle>
              <CardDescription>Festive and fun content</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Create seasonal quizzes perfect for holiday gatherings, office parties, and family fun. Spread joy with interactive Christmas-themed content.</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
