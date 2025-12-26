import React from 'react';

export interface TimelineItem {
  id: number;
  year: string;
  title: string;
  company: string;
  logo?: string;
  description: string;
  skills: string[];
}

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  tags: string[];
  link?: string;
}

export interface Stat {
  label: string;
  value: string;
  icon: React.ElementType;
}

// Tipos para o Cluster de Habilidades (PT e EN para manter compatibilidade com cores)
export type SkillCategory = 
  | 'Engenharia de Dados' | 'Data Science & AI' | 'Analytics & Viz' | 'Estratégia & Soft Skills'
  | 'Data Engineering' | 'Data Science & AI (EN)' | 'Analytics & Viz (EN)' | 'Strategy & Soft Skills';

export interface SkillPoint {
  name: string;
  x: number; 
  y: number;
  z: number;
  category: SkillCategory;
}

export interface EducationItem {
  degree: string;
  school: string;
  year: string;
  status: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  year: string;
}

export type Language = 'pt' | 'en';