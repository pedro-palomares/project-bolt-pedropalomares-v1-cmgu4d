import { jsPDF } from 'jspdf';

export const generateGuide = () => {
  const doc = new jsPDF();
  
  // Cover Page
  doc.setFillColor(220, 0, 0); // Primary red color
  doc.rect(0, 0, 210, 297, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text('Descubre cómo la IA puede', 20, 50);
  doc.text('transformar tu negocio', 20, 65);
  
  doc.setFontSize(16);
  doc.text('Automatiza procesos, mejora la eficiencia y', 20, 90);
  doc.text('aumenta tus ventas con herramientas innovadoras', 20, 105);
  
  // Content Pages
  doc.addPage();
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(20);
  doc.text('Introducción', 20, 30);
  
  doc.setFontSize(12);
  doc.text('La Inteligencia Artificial está revolucionando la forma en que hacemos', 20, 50);
  doc.text('negocios. En esta guía, descubrirás cómo aprovechar su potencial...', 20, 60);
  
  // Add more content...
  
  return doc;
};