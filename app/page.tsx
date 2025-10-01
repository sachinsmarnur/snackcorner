  "use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import jsPDF from 'jspdf';
import { 
  ShoppingCart, 
  Star, 
  Truck, 
  Shield, 
  Clock, 
  Users,
  Mail,
  Phone,
  MapPin,
  Coffee,
  Award,
  Utensils,
  ChevronDown,
  ChevronUp,
  ArrowUp,
  Menu,
  X,
  Store
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import SplashScreen from "@/components/SplashScreen";

export default function Home() {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProductsDialogOpen, setIsProductsDialogOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isGeneratingCatalog, setIsGeneratingCatalog] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
    
    // Check if user has seen splash screen before
    try {
      const hasSeenSplash = localStorage.getItem('snack-corner-splash-seen');
      if (!hasSeenSplash) {
        setShowSplash(true);
      }
    } catch (error) {
      // If localStorage is not available, show splash screen
      setShowSplash(true);
    }
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      setShowScrollTop(scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock page scroll when mobile sidebar is open
  useEffect(() => {
    if (!isClient) return;
    const { style } = document.body;
    const previousOverflow = style.overflow;
    if (isMobileMenuOpen) {
      style.overflow = 'hidden';
    } else {
      style.overflow = previousOverflow || '';
    }
    return () => {
      style.overflow = previousOverflow || '';
    };
  }, [isMobileMenuOpen, isClient]);

  const toggleCategory = (categoryId: number) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    setIsProductsDialogOpen(true);
  };

  const scrollToProducts = () => {
    if (typeof window !== 'undefined') {
      const productsSection = document.getElementById('products');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleRequestCatalog = () => {
    if (typeof window !== 'undefined') {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        // Focus on the first input field after scrolling
        setTimeout(() => {
          const firstInput = contactSection.querySelector('input');
          if (firstInput) {
            firstInput.focus();
          }
        }, 500);
      }
    }
  };

  const handleVisitStore = () => {
    if (typeof window !== 'undefined') {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleMobileNavClick = (action: () => void) => {
    action();
    closeMobileMenu();
  };

  const handleSplashComplete = () => {
    setShowSplash(false);
    // Mark that user has seen the splash screen
    try {
      localStorage.setItem('snack-corner-splash-seen', 'true');
    } catch (error) {
      // If localStorage is not available, silently continue
      console.warn('localStorage not available');
    }
  };

  // Utility function to reset splash screen (for testing purposes)
  const resetSplashScreen = () => {
    try {
      localStorage.removeItem('snack-corner-splash-seen');
      setShowSplash(true);
    } catch (error) {
      console.warn('localStorage not available');
    }
  };

  // Make reset function available globally for testing
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).resetSplashScreen = resetSplashScreen;
    }
  }, []);

  const generateCatalogPDF = () => {
    if (typeof window === 'undefined') return;
    
    setIsGeneratingCatalog(true);
    
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      let yPosition = 20;

      // Helper function to add text with line breaks
      const addText = (text: string, x: number, y: number, options: any = {}) => {
        const lines = doc.splitTextToSize(text, pageWidth - 40);
        doc.text(lines, x, y);
        return y + (lines.length * 6) + 5;
      };

      // Header
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 140, 0); // Amber color
      doc.text('Snack Corner', 20, yPosition);
      
      yPosition += 10;
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text('Fresh Snacks & Beverages for Your Office', 20, yPosition);
      
      yPosition += 15;
      doc.setFontSize(10);
      doc.text('Premium Quality Since 2018 | Serving 200+ Offices Daily', 20, yPosition);
      
      yPosition += 20;

      // Contact Information
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('Contact Information', 20, yPosition);
      yPosition += 10;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('Phone: +91 98765 43210', 20, yPosition);
      yPosition += 6;
      doc.text('Email: orders@snackcorner.com', 20, yPosition);
      yPosition += 6;
      doc.text('Location: Bengaluru, Karnataka, India', 20, yPosition);
      
      yPosition += 15;

      // Menu Categories
      productCategories.forEach((category, categoryIndex) => {
        // Check if we need a new page
        if (yPosition > pageHeight - 60) {
          doc.addPage();
          yPosition = 20;
        }

        // Category Header
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(255, 140, 0);
        doc.text(category.name, 20, yPosition);
        
        yPosition += 8;
        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(100, 100, 100);
        doc.text(category.description, 20, yPosition);
        
        yPosition += 10;

        // Products in this category
        category.products.forEach((product, productIndex) => {
          if (yPosition > pageHeight - 30) {
            doc.addPage();
            yPosition = 20;
          }

          doc.setFontSize(11);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(0, 0, 0);
          doc.text(product.name, 25, yPosition);
          
          doc.setFontSize(10);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(100, 100, 100);
          doc.text(product.description, 25, yPosition + 5);
          
          doc.setFontSize(12);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(255, 140, 0);
          // Replace ₹ symbol with Rs. for proper PDF display
          const priceText = product.price.replace('₹', 'Rs. ');
          doc.text(priceText, pageWidth - 30, yPosition, { align: 'right' });
          
          yPosition += 15;
        });

        yPosition += 10;
      });

      // Benefits Section
      if (yPosition > pageHeight - 80) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('Why Choose Snack Corner?', 20, yPosition);
      yPosition += 10;

      benefits.forEach((benefit, index) => {
        if (yPosition > pageHeight - 30) {
          doc.addPage();
          yPosition = 20;
        }

        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0);
        
        // Format as numbered list with inline description
        const benefitText = `${index + 1}. ${benefit.title}: ${benefit.description}`;
        doc.text(benefitText, 25, yPosition);
        
        yPosition += 12;
      });

      // Footer
      if (yPosition > pageHeight - 40) {
        doc.addPage();
        yPosition = 20;
      }

      yPosition += 20;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text('Thank you for choosing Snack Corner!', 20, yPosition);
      yPosition += 6;
      doc.text('Fresh snacks and hot beverages to keep you energized', 20, yPosition);
      yPosition += 6;
      doc.text('© 2025 Snack Corner. All rights reserved.', 20, yPosition);

      // Save the PDF with dynamic year
      const currentYear = new Date().getFullYear();
      doc.save(`Snack-Corner-Catalog-${currentYear}.pdf`);
      
      setIsGeneratingCatalog(false);
      
      // Show success toast notification
      toast({
        title: "Catalog Downloaded Successfully!",
        description: "Your Snack Corner catalog has been downloaded to your device.",
        duration: 4000,
      });
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      setIsGeneratingCatalog(false);
      toast({
        title: "Error Generating Catalog",
        description: "There was an error generating the catalog. Please try again.",
        variant: "destructive",
        duration: 4000,
      });
    }
  };

  const productCategories = [
    {
      id: 1,
      name: "Hot Beverages",
      description: "Fresh tea, coffee, and specialty hot drinks",
      image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800",
      badge: "Bestseller",
      products: [
        { name: "Masala Chai", price: "₹15", description: "Traditional spiced tea with milk" },
        { name: "Filter Coffee", price: "₹10", description: "South Indian style filter coffee" },
        { name: "Black Tea", price: "₹12", description: "Fresh brewed black tea" },
        { name: "Green Tea", price: "₹20", description: "Healthy green tea with antioxidants" },
        { name: "Ginger Tea", price: "₹15", description: "Refreshing ginger-infused tea" },
        { name: "Lemon Tea", price: "₹15", description: "Zesty lemon tea for freshness" }
      ]
    },
    {
      id: 2,
      name: "Fresh Bakery",
      description: "Soft buns, bread, and freshly baked items",
      image: "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800",
      badge: "New",
      products: [
        { name: "Pav Buns", price: "₹15", description: "Soft and fluffy pav buns" },
        { name: "Sandwich Bread", price: "₹30", description: "Fresh white bread loaf" },
        { name: "Dinner Rolls", price: "₹15", description: "Small soft dinner rolls" },
        { name: "Garlic Bread", price: "₹45", description: "Toasted bread with garlic butter" },
        { name: "Brown Bread", price: "₹40", description: "Healthy whole wheat bread" },
        { name: "Burger Buns", price: "₹35", description: "Perfect buns for burgers" }
      ]
    },
    {
      id: 3,
      name: "Fried Snacks",
      description: "Crispy samosas, puffs, and savory treats",
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=800",
      badge: "Hot & Fresh",
      products: [
        { name: "Samosa", price: "₹20", description: "Crispy triangular pastry with spiced vegetables" },
        { name: "Egg Puff", price: "₹25", description: "Golden puff pastry with boiled egg filling" },
        { name: "Veg Puff", price: "₹20", description: "Crispy puff with mixed vegetable filling" },
        { name: "Aloo Bonda", price: "₹20", description: "Deep-fried potato fritters" },
        { name: "Onion Pakoda", price: "₹25", description: "Crispy onion fritters with spices" }
      ]
    },
    {
      id: 4,
      name: "Cold Drinks",
      description: "Refreshing beverages and chilled drinks",
      image: "https://images.pexels.com/photos/1304540/pexels-photo-1304540.jpeg?auto=compress&cs=tinysrgb&w=800",
      badge: "Refreshing",
      products: [
        { name: "Fresh Lime Soda", price: "₹30", description: "Refreshing lime soda with mint" },
        { name: "Mango Lassi", price: "₹60", description: "Creamy mango yogurt drink" },
        { name: "Buttermilk", price: "₹30", description: "Spiced yogurt drink with curry leaves" },
        { name: "Iced Tea", price: "₹40", description: "Chilled tea with lemon and mint" },
        { name: "Fresh Fruit Juice", price: "₹80", description: "Seasonal fresh fruit juices" },
        { name: "Cold Coffee", price: "₹50", description: "Iced coffee with milk and sugar" }
      ]
    }
  ];

  const benefits = [
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Quick Service",
      description: "Fast preparation and delivery"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Fresh Daily",
      description: "All items prepared fresh daily with quality ingredients"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Group Orders",
      description: "Special packages for office meetings and events"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Extended Hours",
      description: "Open early to late for your convenience"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "HR Manager",
      company: "TechCorp Solutions",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      text: "Snack Corner has been a game-changer for our office. The fresh tea and samosas keep our team energized throughout the day. Their punctual delivery and consistent quality make them our go-to choice.",
      highlight: "Game-changer for our office"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      role: "Operations Director",
      company: "StartupHub India",
      image: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      text: "We order daily for our 50+ team members. The variety is amazing - from hot beverages to fresh bakery items. The team loves the quality and we love the competitive pricing for bulk orders.",
      highlight: "Amazing variety for 50+ team"
    },
    {
      id: 3,
      name: "Anita Patel",
      role: "Office Manager",
      company: "FinanceFirst Ltd",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      text: "The customer service is exceptional. They remember our preferences and always deliver on time. The fresh lime soda and egg puffs are our team's favorites. Highly recommended!",
      highlight: "Exceptional customer service"
    },
    {
      id: 4,
      name: "Vikram Singh",
      role: "CEO",
      company: "InnovateTech",
      image: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      text: "For our client meetings and team events, Snack Corner provides the perfect catering solution. Professional service, delicious food, and they handle everything seamlessly.",
      highlight: "Perfect for client meetings"
    },
    {
      id: 5,
      name: "Deepika Reddy",
      role: "Admin Head",
      company: "Global Services",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      text: "We've been customers for over 2 years. The consistency in quality and the friendly service keeps us coming back. The masala chai is absolutely the best in the city!",
      highlight: "Best masala chai in the city"
    },
    {
      id: 6,
      name: "Arjun Mehta",
      role: "Team Lead",
      company: "Digital Solutions",
      image: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      text: "The morning coffee and fresh bakery items are perfect for our early morning meetings. They understand our needs and always exceed expectations. Truly reliable partners!",
      highlight: "Perfect for early morning meetings"
    }
  ];

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Navigation */}
      <nav className={`backdrop-blur sticky top-0 z-50 transition-all duration-300 ${
        isClient && isScrolled 
          ? 'bg-white/95 border-amber-200 shadow-lg' 
          : 'bg-white/80 border-amber-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r p-2 rounded-xl">
                <Image 
                  src="/Snack Corner.png" 
                  alt="Snack Corner Logo" 
                  width={32} 
                  height={32} 
                  className="rounded-lg"
                />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Snack Corner
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#products" className="text-gray-700 hover:text-amber-600 transition-all duration-300 font-medium relative group">
                Products
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#about" className="text-gray-700 hover:text-amber-600 transition-all duration-300 font-medium relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#contact" className="text-gray-700 hover:text-amber-600 transition-all duration-300 font-medium relative group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <Button 
                onClick={handleVisitStore}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Store className="h-4 w-4 mr-2" />
                Visit Our Store
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg text-gray-700 hover:text-amber-600 hover:bg-amber-50 transition-all duration-300"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={closeMobileMenu}
        />
        
        {/* Sidebar */}
        <div className={`absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-6 border-b border-amber-100">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r p-2 rounded-xl">
                  <Image 
                    src="/Snack Corner.png" 
                    alt="Snack Corner Logo" 
                    width={32} 
                    height={32} 
                    className="rounded-lg"
                  />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Snack Corner
                </span>
              </div>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-lg text-gray-700 hover:text-amber-600 hover:bg-amber-50 transition-all duration-300"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Sidebar Navigation */}
            <div className="flex-1 p-6 space-y-2">
              <a 
                href="#products" 
                className="block text-gray-700 hover:text-amber-600 hover:bg-amber-50 transition-all duration-300 font-medium py-4 px-4 rounded-xl"
                onClick={() => handleMobileNavClick(scrollToProducts)}
              >
                Products
              </a>
              <a 
                href="#about" 
                className="block text-gray-700 hover:text-amber-600 hover:bg-amber-50 transition-all duration-300 font-medium py-4 px-4 rounded-xl"
                onClick={() => handleMobileNavClick(() => {
                  if (typeof window !== 'undefined') {
                    const aboutSection = document.getElementById('about');
                    if (aboutSection) {
                      aboutSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                })}
              >
                About
              </a>
              <a 
                href="#contact" 
                className="block text-gray-700 hover:text-amber-600 hover:bg-amber-50 transition-all duration-300 font-medium py-4 px-4 rounded-xl"
                onClick={() => handleMobileNavClick(handleRequestCatalog)}
              >
                Contact
              </a>
            </div>

            {/* Sidebar Footer */}
            <div className="p-6 border-t border-amber-100">
              <Button 
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                onClick={() => handleMobileNavClick(handleVisitStore)}
              >
                <Store className="h-4 w-4 mr-2" />
                Visit Our Store
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-yellow-200/20 to-amber-200/20 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 hover:from-amber-200 hover:to-orange-200 border border-amber-200 shadow-sm">
                  <Award className="h-3 w-3 mr-1" />
                  Premium Quality Since 2018
                </Badge>
                <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                  Elevate Your
                  <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent block">Office Breaks</span>
                </h1>
                <p className="text-xl text-gray-700 leading-relaxed max-w-lg font-medium">
                  Delicious snacks, fresh tea & coffee, and tasty treats. 
                  Perfect for meetings, breaks, and keeping yourself energized throughout the day.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-10 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300" 
                  onClick={scrollToProducts}
                >
                  Explore Products
                  <ShoppingCart className="h-5 w-5 ml-2" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-amber-500 text-amber-600 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  onClick={generateCatalogPDF}
                  disabled={isGeneratingCatalog}
                >
                  {isGeneratingCatalog ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-amber-600 mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    'Download Catalog'
                  )}
                </Button>
              </div>
              <div className="flex items-center space-x-8 text-sm text-gray-700 font-medium">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-amber-400 to-orange-400 p-1 rounded-full mr-2">
                    <Star className="h-3 w-3 text-white fill-white" />
                  </div>
                  <span>4.9/5 Rating</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-blue-400 to-blue-500 p-1 rounded-full mr-2">
                    <Users className="h-3 w-3 text-white" />
                  </div>
                  <span>200+ Offices</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-green-400 to-green-500 p-1 rounded-full mr-2">
                    <Utensils className="h-3 w-3 text-white" />
                  </div>
                  <span>Fresh Daily</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
                <img 
                  src="https://images.pexels.com/photos/1833586/pexels-photo-1833586.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Fresh snacks and beverages"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-2xl p-6 border border-amber-100">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-green-400 to-green-500 rounded-full p-3">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-lg text-gray-900">Fresh & Hot</div>
                    <div className="text-sm text-gray-600 font-medium">Made to order</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our Fresh Menu
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium leading-relaxed">
              From hot beverages to crispy snacks, we have everything to keep your team satisfied
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {productCategories.map((category) => (
              <Card key={category.id} className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 shadow-lg hover:-translate-y-3 bg-gradient-to-br from-white to-gray-50">
                  <div className="relative overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg">
                      {category.badge}
                    </Badge>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl font-bold group-hover:text-amber-600 transition-colors duration-300">
                      {category.name}
                    </CardTitle>
                    <CardDescription className="text-gray-600 font-medium">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold"
                      onClick={() => toggleCategory(category.id)}
                    >
                      View Products
                    </Button>
                  </CardContent>
                </Card>
            ))}
            </div>
            
            {/* Products Dialog (all viewports) */}
            <Dialog open={isProductsDialogOpen && !!expandedCategory} onOpenChange={setIsProductsDialogOpen}>
              <DialogContent className="w-[95vw] max-w-[95vw] sm:w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    Available {productCategories.find(cat => cat.id === expandedCategory)?.name}
                  </DialogTitle>
                  <DialogDescription>
                    Choose from our freshly prepared {productCategories.find(cat => cat.id === expandedCategory)?.name?.toLowerCase()}
                  </DialogDescription>
                </DialogHeader>
                <div className="p-2 sm:p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {productCategories.find(cat => cat.id === expandedCategory)?.products.map((product, index) => (
                      <div 
                        key={index} 
                        className="bg-white rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-100 h-full"
                        style={{
                          animation: `fadeInUp 0.6s ease-out ${index * 0.05}s both`
                        }}
                      >
                        <div className="flex flex-col h-full space-y-3 sm:space-y-4">
                          <div className="flex-1">
                            <h4 className="font-bold text-lg text-gray-900 mb-1 sm:mb-2">{product.name}</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
                          </div>
                          <div className="flex items-center mt-auto pt-1">
                            <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                              {product.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="about" className="py-24 px-4 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-yellow-200/15 to-amber-200/15 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 relative z-10">
              Why Choose Snack Corner?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium leading-relaxed relative z-10">
              We understand office hunger and deliver fresh, tasty solutions right to your workplace
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 relative z-10">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="text-center group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3"
                style={{
                  animation: `fadeInUp 0.8s ease-out ${index * 0.2}s both`
                }}
              >
                <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-4 w-20 h-20 mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <div className="text-white flex items-center justify-center">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-amber-100 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Loved by Local Offices
                </h3>
                <p className="text-gray-700 mb-8 font-medium leading-relaxed text-lg">
                  From small startups to large corporations, offices choose Snack Corner for 
                  fresh snacks, hot beverages, and reliable service that keeps you happy and productive.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-green-400 to-green-500 rounded-full p-2">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <span className="text-gray-700 font-medium text-lg">Fresh tea and coffee brewed daily</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-green-400 to-green-500 rounded-full p-2">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <span className="text-gray-700 font-medium text-lg">Hot snacks prepared fresh throughout the day</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-green-400 to-green-500 rounded-full p-2">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <span className="text-gray-700 font-medium text-lg">Special rates for regular office orders</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/1833586/pexels-photo-1833586.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Fresh office snacks and beverages"
                  className="rounded-2xl w-full h-80 object-cover shadow-2xl transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-gray-50 via-white to-amber-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-br from-yellow-200/15 to-amber-200/15 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <Badge className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 hover:from-amber-200 hover:to-orange-200 border border-amber-200 shadow-sm mb-6">
              <Star className="h-3 w-3 mr-1" />
              Customer Reviews
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium leading-relaxed">
              Don't just take our word for it. Here's what office managers and teams across the city have to say about Snack Corner.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-amber-100 flex flex-col h-full"
                style={{
                  animation: `fadeInUp 0.8s ease-out ${index * 0.1}s both`
                }}
              >
                <div className="flex items-center mb-6">
                  <div className="flex space-x-1 mr-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <div className="text-sm font-semibold text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
                    {testimonial.rating}/5
                  </div>
                </div>
                
                <blockquote className="text-gray-700 mb-6 leading-relaxed font-medium">
                  "{testimonial.text}"
                </blockquote>
                
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4 shadow-lg"
                  />
                  <div>
                    <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                    <div className="text-amber-600 font-semibold">{testimonial.role}</div>
                    <div className="text-gray-600 text-sm">{testimonial.company}</div>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <div className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 text-center">
                    <div className="text-sm font-semibold text-amber-800">
                      "{testimonial.highlight}"
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-amber-100">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  200+
                </div>
                <div className="text-gray-700 font-semibold">Happy Offices</div>
                <div className="text-sm text-gray-600">Serving daily</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  4.9/5
                </div>
                <div className="text-gray-700 font-semibold">Average Rating</div>
                <div className="text-sm text-gray-600">Customer satisfaction</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  50+
                </div>
                <div className="text-gray-700 font-semibold">Menu Items</div>
                <div className="text-sm text-gray-600">Fresh daily</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  5+
                </div>
                <div className="text-gray-700 font-semibold">Years Experience</div>
                <div className="text-sm text-gray-600">Trusted service</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-yellow-500/5 to-amber-500/5 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 relative z-10">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-8">
                Visit Our Store Today!
              </h2>
              <p className="text-xl text-gray-300 mb-12 font-medium leading-relaxed">
                Come experience our fresh snacks and hot beverages in person. Perfect for office breaks, meetings, and satisfying your cravings.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center space-x-6 group">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">Phone</div>
                    <div className="text-gray-300 text-lg">+91 98765 43210</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 group">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">Email</div>
                    <div className="text-gray-300 text-lg">orders@snackcorner.com</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 group">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">Location</div>
                    <div className="text-gray-300 text-lg">Bengaluru, Karnataka India</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 group">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">Store Hours</div>
                    <div className="text-gray-300 text-lg">Mon-Sat: 10:00 AM - 6:00 PM</div>
                    <div className="text-gray-300 text-sm">Sunday: 11:00 AM - 5:00 PM</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-amber-100">
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Plan Your Visit</h3>
              <p className="text-gray-600 mb-6 font-medium">Let us know when you're planning to visit or if you have any special requirements.</p>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                    <input 
                      type="text" 
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 font-medium"
                      placeholder="John"
                      suppressHydrationWarning
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 font-medium"
                      placeholder="Doe"
                      suppressHydrationWarning
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Company Email</label>
                  <input 
                    type="email" 
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 font-medium"
                    placeholder="john@company.com"
                    suppressHydrationWarning
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Company Name</label>
                  <input 
                    type="text" 
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 font-medium"
                    placeholder="Your Company"
                    suppressHydrationWarning
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                  <textarea 
                    rows={5} 
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 font-medium resize-none"
                    placeholder="Tell us about your visit plans, office snack needs, or any special requirements..."
                    suppressHydrationWarning
                  ></textarea>
                </div>
                <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-4 text-lg font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-xl">
                  Plan My Visit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-2 rounded-xl">
                <Image 
                  src="/snack-corner-footer.png"
                  alt="Snack Corner Logo" 
                  width={32} 
                  height={32} 
                  className="rounded-lg"
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                Snack Corner
              </span>
            </div>
            <div className="text-gray-400 text-base font-medium">
              © 2025 Snack Corner. Fresh snacks and beverages.
            </div>
          </div>
          <Separator className="my-8 bg-gray-700" />
          <div className="text-center text-gray-400 text-base font-medium">
            Serving fresh snacks and hot beverages to keep you energized
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {isClient && showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 group animate-in slide-in-from-bottom-4 fade-in-0"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-6 w-6 group-hover:animate-bounce" />
        </button>
      )}

      {/* Toast Notifications */}
      <Toaster />
      </div>
    </>
  );
}