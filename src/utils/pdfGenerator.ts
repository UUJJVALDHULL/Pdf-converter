import { jsPDF } from 'jspdf';
import { ImageFile } from '../components/ImageToPdfConverter';

export const generatePDF = async (images: ImageFile[], filename: string = 'document'): Promise<void> => {
  if (images.length === 0) {
    throw new Error('No images to generate PDF');
  }

  // Sanitize filename
  const sanitizedFilename = filename.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'document';
  
  // Create a new PDF document
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
  });

  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    
    // If not the first page, add a new page
    if (i > 0) {
      pdf.addPage();
    }
    
    try {
      // Load image
      const img = await loadImage(image.preview);
      
      // Calculate image dimensions to fit the page
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      const imgProps = pdf.getImageProperties(image.preview);
      const imgWidth = imgProps.width;
      const imgHeight = imgProps.height;
      
      // Calculate the dimensions to fit the page while maintaining aspect ratio
      let finalWidth = pageWidth;
      let finalHeight = (imgHeight * pageWidth) / imgWidth;
      
      // If height exceeds page height, scale down
      if (finalHeight > pageHeight) {
        finalHeight = pageHeight;
        finalWidth = (imgWidth * pageHeight) / imgHeight;
      }
      
      // Calculate positions to center the image
      const x = (pageWidth - finalWidth) / 2;
      const y = (pageHeight - finalHeight) / 2;
      
      // Add image to PDF
      pdf.addImage(image.preview, 'JPEG', x, y, finalWidth, finalHeight);
      
    } catch (error) {
      console.error(`Error processing image ${i}:`, error);
      // Continue with next image
    }
  }
  
  // Save and download the PDF
  pdf.save(`${sanitizedFilename}.pdf`);
};

// Helper function to load an image and return a promise
const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};