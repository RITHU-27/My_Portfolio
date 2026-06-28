import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import Project from "./models/Project.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://27rithu10_db_user:27rithu@cluster.vqwm1ym.mongodb.net/portfolioDB?retryWrites=true&w=majority&appName=Cluster";

const sampleProjects = [
  {
    title: "Smart Student Hub",
    description:
      "A centralized platform for students to store their academic records, faculty dashboard to monitor attendance and activity of students and an admin dashboard.",
    techStack: ["React", "Node.js", "Express", "MongoDB"],
    imageUrl:
      "https://smartinfovision.shop/cdn/shop/files/5_da6dc713-b1c5-4b1f-ae67-eed70b7f01cb.png?v=1760533534&width=1445",
    githubUrl: "https://github.com/RITHU-27/Smart-student-hub_MERN",
    liveUrl: "https://smart-student-hub-mern-git-main-rithanyaa-v-s-projects.vercel.app/",
    featured: true,
    order: 1,
  },
  {
    title: "Echo-verse AI Audiobook",
    description:
      "A platform for creating and listening to AI-generated audiobooks with a user-friendly interface.",
    techStack: ["Python", "Streamlit", "IBM Watson Text-to-Speech", "NLP", "Audio Processing"],
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCC0r5kNP2fX0ihuuigSbhYtsxfyoH_oCVWQh3VDNqOA&s=10",
    githubUrl: "https://github.com/RITHU-27/Echoverse-AI-Audiobook",
    liveUrl: "https://echoverse-ai-audiobook-wgwh3vfdnqvjfjbtuk5pp9.streamlit.app/",
    featured: true,
    order: 2,
  },
  {
    title: "SafeWalk",
    description:
      "A mobile app that uses GPS and real-time data to help users find the safest walking routes in their area, with features like crime heatmaps and emergency alerts.",
    techStack: ["React Native", "Expo", "Firebase", "Google Maps API","JavaScript"],
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr8lCyLHEDTulSBaJyteoNtwoFogIK-xCRbgHKfQaXYA&s=10",
    githubUrl: "https://github.com/RITHU-27/Safe_walk",
    liveUrl: "",
    featured: true,
    order: 3,
  },
  {
    title: "Sentiment Analysis Dashboard",
    description:
      "A responsive dashboard for analyzing sentiment in social media data with interactive charts.",
    techStack: ["Python", "Flask", "HTML", "CSS", "Natural Language Processing"],
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq5ufF-IuQGTMM9z9P90GsW2mxuHOwFj2Poy--xTfdmQ&s=10https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq5ufF-IuQGTMM9z9P90GsW2mxuHOwFj2Poy--xTfdmQ&s=10",
    githubUrl: "https://github.com/RITHU-27/Sentiment_analysis_app",
    liveUrl: "https://sentimentanalysisapp-jmtbgep4aduppwmdeq3b3v.streamlit.app/",
    featured: true,
    order: 4,
  },
  {
    title: "ATM Management System",
    description:
      "A comprehensive system for managing ATM operations, including transaction processing and maintenance scheduling.",
    techStack: ["React", "Node.js", "Express", "MongoDB"],
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv0z9qIZ1KvPuWltir2u2N63Cy1yZV2_KygniPPbZNuA&s=10",
    githubUrl: "https://github.com/RITHU-27/Project-1",
    liveUrl: "https://project-1-dwnq.vercel.app/",
    featured: true,
    order: 5,
  },
  {
    title: "TripMates - Travel Planning App",
    description:
      "A travel planning app that helps users discover and plan trips with friends, including features like trip planning, expense tracking, and itinerary management.",
    techStack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "XAMPP"],
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSvoMShbPz6mnYdlJ5af8hIbzo_gV8ysJYznyHv7gnVA&s=10",
    githubUrl: "https://github.com/RITHU-27/Trip_mates_XAMPP",
    liveUrl: "",
    featured: true,
    order: 6,
  },
];

async function seed() {
  try {
    await connectDB(MONGO_URI);
    await Project.deleteMany({});
    await Project.insertMany(sampleProjects);
    console.log(`Seeded ${sampleProjects.length} projects`);
  } catch (err) {
    console.error("Seed failed:", err.message);
  } finally {
    await mongoose.connection.close();
  }
}

seed();
