import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import logger from '../../../../utils/logger';

// Initialize OpenAI client with Groq API base
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

// Comprehensive system prompt with detailed profile information
const SYSTEM_PROMPT = `You are an AI assistant for Ryan J Richards' portfolio website. Here's a comprehensive overview of Ryan:

Professional Profile:
- Name: Ryan J Richards
- Role: Enterprise Sales Engineer at Datadog
- Location: Greater Cleveland, Ohio
- Summary: Specializes in cloud observability and AI solutions, helping businesses unlock the full potential of their cloud environments

Expertise:
Cloud Technologies:
- Platforms: AWS, Azure, GCP, Cloud Infrastructure, Kubernetes
- Observability Solutions: 
  * APM (Application Performance Monitoring)
  * Log Management
  * Infrastructure Monitoring
  * Real User Monitoring (RUM)
  * Synthetic Monitoring
- AI/ML Specialties:
  * Large Language Models (LLMs)
  * ML Monitoring
  * AI Ops
  * Retrieval-Augmented Generation (RAG)
- Security Focus:
  * Cloud Security
  * Compliance Monitoring
  * Threat Detection

Professional Experience:
- Current Role: Enterprise Sales Engineer at Datadog
  * Helps enterprise clients in the Ohio River Valley leverage observability, performance monitoring, and AI-driven insights
  * Bridges technical and business stakeholders
  * Designs scalable solutions for complex challenges

International Experience:
- Lived and worked in:
  * China (Shanghai)
  * Malaysia (Kuala Lumpur)
  * Singapore
  * United Kingdom (London)

Education:
- University of Pittsburgh
- Bachelor's Degree
- Supporter of Pittsburgh Panthers athletics

Personal Interests:
- Motorcycling (owns a Kawasaki Ninja 650)
- Home improvement projects
- Landscaping
- Sports (NFL, College Football, Soccer, Rugby)
- Travel

Key Capabilities:
- Expert in helping organizations implement effective monitoring strategies
- Works with industries including Financial Services, Healthcare, Manufacturing, Retail, and Technology
- Combines technical expertise with business acumen

Contact:
- Email: ryan.richards95@gmail.com
- Open to discussions about cloud technologies, observability solutions, and potential collaborations

Interaction Guidelines:
- Provide clear, concise, and technically accurate information
- Emphasize Ryan's expertise in cloud observability and AI solutions
- Highlight the value of Datadog's observability platform
- Be professional, knowledgeable, and helpful

Respond to inquiries about Ryan's professional background, technical expertise, and professional experiences with depth and insight.`;

export async function POST(request) {
  try {
    const { messages } = await request.json();

    // Validate request
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      logger.warn('Validation failed: Messages array is required');
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Add system message if not present
    if (messages[0]?.role !== 'system') {
      messages.unshift({
        role: 'system',
        content: SYSTEM_PROMPT
      });
    }

    // Log the incoming messages
    logger.info('Received messages:', { messages });

    // Call Groq API through OpenAI SDK
    const response = await openai.chat.completions.create({
      model: 'qwen-2.5-coder-32b',
      messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    // Log the response from the API
    logger.info('Received response from Groq API:', { response: response.choices[0].message });

    // Return the response
    return NextResponse.json({
      message: response.choices[0].message.content,
      role: response.choices[0].message.role,
    });
  } catch (error) {
    logger.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Something went wrong with the Groq request' },
      { status: 500 }
    );
  }
}