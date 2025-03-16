import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client with Groq API base
const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

export async function POST(request) {
  try {
    const { messages } = await request.json();

    // Validate request
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Add system message if not present
    if (messages[0]?.role !== 'system') {
      messages.unshift({
        role: 'system',
        content: 'You are a helpful assistant for people reading Ryan J Richards portfolio website. Ryan is an Enterprise Sales Engineer at Datadog. Help answer questions about cloud observability, monitoring, and Ryan\'s professional background.'
      });
    }

    // Call Groq API through OpenAI SDK
    const response = await openai.chat.completions.create({
      model: 'qwen-2.5-coder-32b',
      messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    // Return the response
    return NextResponse.json({
      message: response.choices[0].message.content,
      role: response.choices[0].message.role,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Something went wrong with the Groq request' },
      { status: 500 }
    );
  }
}