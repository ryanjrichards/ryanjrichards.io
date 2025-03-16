/**
 * This file contains structured data about Ryan's profile
 * to be used by the chatbot for more accurate responses
 */

export const profileInfo = {
    basics: {
      name: "Ryan J Richards",
      role: "Enterprise Sales Engineer",
      company: "Datadog",
      location: "Greater Cleveland, Ohio",
      email: "ryan.richards95@gmail.com",
      summary: "Enterprise Sales Engineer at Datadog specializing in cloud observability and AI solutions, helping businesses unlock the full potential of their cloud environments."
    },
    
    expertise: {
      cloudTechnologies: ["AWS", "Azure", "GCP", "Cloud Infrastructure", "Kubernetes"],
      observability: ["APM", "Log Management", "Infrastructure Monitoring", "RUM", "Synthetic Monitoring"],
      aiMl: ["LLMs", "ML Monitoring", "AI Ops", "Retrieval-Augmented Generation (RAG)"],
      security: ["Cloud Security", "Compliance Monitoring", "Threat Detection"],
      industries: ["Financial Services", "Healthcare", "Manufacturing", "Retail", "Technology"]
    },
    
    experience: [
      {
        title: "Enterprise Sales Engineer",
        company: "Datadog",
        period: "Current",
        description: "Helping enterprise clients across the Ohio River Valley leverage observability, performance monitoring, and AI-driven insights. Bridge the gap between technical and business stakeholders to design scalable solutions for complex challenges."
      },
      {
        title: "Previous Experience",
        description: "Background in AI and machine learning from time in the LLM space, bringing valuable expertise in emerging technologies."
      }
    ],
    
    education: {
      university: "University of Pittsburgh",
      degree: "Bachelor's Degree",
      activities: "Supporter of Pittsburgh Panthers athletics"
    },
    
    internationalExperience: [
      "China (Shanghai)",
      "Malaysia (Kuala Lumpur)",
      "Singapore",
      "United Kingdom (London)"
    ],
    
    personalInterests: [
      "Motorcycling (owns a Kawasaki Ninja 650)",
      "Home improvement projects",
      "Landscaping",
      "Sports (NFL, College Football, Soccer, Rugby)",
      "Travel"
    ],
    
    faqs: [
      {
        question: "What exactly does Ryan do at Datadog?",
        answer: "As an Enterprise Sales Engineer at Datadog, Ryan works with large enterprise clients to demonstrate how Datadog's observability platform can solve their technical challenges. He combines technical expertise with business acumen to design solutions that deliver value across the organization."
      },
      {
        question: "What areas does Ryan specialize in?",
        answer: "Ryan specializes in cloud observability, performance monitoring, security, and AI-driven insights. He has particular expertise in helping organizations implement effective monitoring strategies across complex cloud environments."
      },
      {
        question: "What geographic area does Ryan cover?",
        answer: "Ryan is based in the Greater Cleveland area and covers the Ohio River Valley region, working with enterprise clients across this territory."
      },
      {
        question: "How can I connect with Ryan?",
        answer: "You can reach out to Ryan through the contact form on this website, or connect with him on LinkedIn. He's always open to discussing cloud technologies, observability solutions, and potential collaborations."
      }
    ]
  };
  
  export default profileInfo;