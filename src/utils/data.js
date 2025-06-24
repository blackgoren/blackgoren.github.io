// src/utils/data.js
import { 
  FaTwitter, 
  FaInstagram, 
  FaGithub, 
  FaLinkedin, 
  FaYoutube, 
  FaGlobe, 
  FaPen, 
  FaEnvelope, 
  FaGraduationCap, 
  FaHeart, 
  FaGift,
  FaBuilding,
  FaFacebook
} from 'react-icons/fa';

// Sample user data and links
// In a real application, this would likely come from a backend API
export const userData = {
  name: "Jane Smith",
  bio: "Co-Founder @intelbus I Innovating Smart Transportation Systems | Passionate About Urban Mobility & Technology",
  avatar: "/images/avatar.jpg",
  socialLinks: [
    {
      platform: "Twitter",
      url: "https://twitter.com/",
      icon: FaTwitter
    },
    {
      platform: "Instagram",
      url: "https://instagram.com/",
      icon: FaInstagram
    },
    {
      platform: "GitHub",
      url: "https://github.com/",
      icon: FaGithub
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/",
      icon: FaLinkedin
    },
    {
      platform: "YouTube",
      url: "https://youtube.com/",
      icon: FaYoutube
    }
  ]
};

export const links = [
  {
    title: "INTELBUS",
    url: "http://teknobus.com/",
    icon: FaGlobe
  },
  {
    title: "LinkedIn",
    url: "https://www.linkedin.com/in/harun-g%C3%B6ren-b50109254/",
    icon: FaLinkedin
  },
  {
    title: "Instagram",
    url: "https://www.instagram.com/blackgoren/",
    icon: FaInstagram
  },
  {
    title: "Facebook",
    url: "https://facebook.com/61571289511657/",
    icon: FaFacebook
  },
  {
    title: "Twitter",
    url: "https://x.com/intelbustr",
    icon: FaTwitter
  },
  {
    title: "YouTube",
    url: "https://example.com/support",
    icon: FaYoutube
  },
  {
    title: "Crunchbase",
    url: "https://example.com/crunchbase",
    icon: FaBuilding
  }
];