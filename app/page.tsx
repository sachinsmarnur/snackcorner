"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  ChevronUp
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function Home() {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProductsDialogOpen, setIsProductsDialogOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleCategory = (categoryId: number) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    setIsProductsDialogOpen(true);
  };

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRequestCatalog = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Navigation */}
      <nav className={`backdrop-blur-md border-b sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 border-amber-200 shadow-lg' 
          : 'bg-white/80 border-amber-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-2 rounded-xl">
                <Coffee className="h-8 w-8 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Snack Corner
              </span>
            </div>
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
              <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Order Now
              </Button>
            </div>
          </div>
        </div>
      </nav>

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
                  onClick={handleRequestCatalog}
                >
                  Request Catalog
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
                Ready to Satisfy Your Office Cravings?
              </h2>
              <p className="text-xl text-gray-300 mb-12 font-medium leading-relaxed">
                Contact us for bulk orders, or to set up a tasting session for your team.
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
              </div>
            </div>
            
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-amber-100">
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Get Started Today</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                    <input 
                      type="text" 
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 font-medium"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 font-medium"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Company Email</label>
                  <input 
                    type="email" 
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 font-medium"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Company Name</label>
                  <input 
                    type="text" 
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 font-medium"
                    placeholder="Your Company"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                  <textarea 
                    rows={5} 
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 font-medium resize-none"
                    placeholder="Tell us about your office snack and beverage needs..."
                  ></textarea>
                </div>
                <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-4 text-lg font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-xl">
                  Send Message
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
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-3 rounded-xl">
                <Coffee className="h-8 w-8 text-white" />
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
    </div>
  );
}