"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, QrCode, Smartphone, ExternalLink, MessageCircle, ThumbsUp } from "lucide-react";
import QRCode from "qrcode";

interface GoogleReviewSectionProps {
  googleReviewUrl?: string;
}

export default function GoogleReviewSection({ 
  // TODO: Replace this with your actual Google Business Profile review URL
  // Get it by going to Google Maps > Your Business > Write a review > Copy URL
  googleReviewUrl = "https://www.google.com/maps/place/Snack+Corner/@13.104147,77.571690,17z/reviews/" 
}: GoogleReviewSectionProps) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);
  const qrCodeRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    generateQRCode();
  }, [googleReviewUrl]);

  const generateQRCode = async () => {
    setIsGeneratingQR(true);
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(googleReviewUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: '#D97706', // amber-600
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'M'
      });
      setQrCodeDataUrl(qrCodeDataUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
      // Fallback: create a simple text-based QR placeholder
      setQrCodeDataUrl('');
    } finally {
      setIsGeneratingQR(false);
    }
  };

  const handleOpenGoogleReview = () => {
    window.open(googleReviewUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadQR = () => {
    if (qrCodeDataUrl) {
      const link = document.createElement('a');
      link.download = 'snack-corner-google-review-qr.png';
      link.href = qrCodeDataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <section id="reviews" className="py-24 px-4 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-yellow-200/15 to-amber-200/15 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 hover:from-amber-200 hover:to-orange-200 border border-amber-200 shadow-sm mb-6">
            <Star className="h-3 w-3 mr-1" />
            Share Your Experience
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Leave a Google Review
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium leading-relaxed">
            Help others discover Snack Corner by sharing your experience. Your feedback means the world to us!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* QR Code Section */}
          <div className="space-y-8">
            <Card className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-amber-100">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-center">
                  <QrCode className="h-6 w-6 mr-2 text-amber-600" />
                  Scan to Review
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Use your phone camera to scan this QR code and leave a review
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="flex justify-center">
                  {isGeneratingQR ? (
                    <div className="w-48 h-48 bg-gray-100 rounded-2xl flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
                    </div>
                  ) : qrCodeDataUrl ? (
                    <div className="relative">
                      <img 
                        src={qrCodeDataUrl} 
                        alt="Google Review QR Code" 
                        className="w-48 h-48 rounded-2xl shadow-lg border-4 border-white"
                      />
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full p-2 shadow-lg">
                        <QrCode className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  ) : (
                    <div className="w-48 h-48 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-amber-300">
                      <QrCode className="h-12 w-12 text-amber-500 mb-2" />
                      <p className="text-xs text-amber-600 font-medium text-center px-2">QR Code</p>
                      <p className="text-xs text-amber-500 text-center px-2">Click button below</p>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <Smartphone className="h-4 w-4" />
                    <span>Point your camera at the QR code</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      onClick={handleOpenGoogleReview}
                      className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open Review Link
                    </Button>
                    <Button 
                      onClick={handleDownloadQR}
                      variant="outline"
                      className="border-amber-500 text-amber-600 hover:bg-amber-50"
                      disabled={!qrCodeDataUrl}
                    >
                      <QrCode className="h-4 w-4 mr-2" />
                      Download QR
                    </Button>
                    <Button 
                      onClick={generateQRCode}
                      variant="outline"
                      className="border-gray-300 text-gray-600 hover:bg-gray-50"
                      disabled={isGeneratingQR}
                    >
                      {isGeneratingQR ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                      ) : (
                        <QrCode className="h-4 w-4 mr-2" />
                      )}
                      Regenerate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <MessageCircle className="h-5 w-5 mr-2 text-amber-600" />
                How to Leave a Review
              </h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start space-x-3">
                  <div className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                  <span>Scan the QR code with your phone camera</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                  <span>You'll be taken to our Google Business profile</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                  <span>Click "Write a review" and share your experience</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                  <span>Rate us and tell others about your visit!</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Benefits and Info Section */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Why Your Review Matters
              </h3>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Your honest feedback helps other customers to discover Snack Corner. 
                It also helps us improve our service and continue serving fresh snacks and beverages.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-amber-100">
                <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-full p-3 flex-shrink-0">
                  <ThumbsUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Help Others Discover Us</h4>
                  <p className="text-gray-600">Your review helps other offices find quality snack services in the area.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-amber-100">
                <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-full p-3 flex-shrink-0">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Improve Our Service</h4>
                  <p className="text-gray-600">Your feedback helps us understand what you love and what we can improve.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-amber-100">
                <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-full p-3 flex-shrink-0">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Share Your Experience</h4>
                  <p className="text-gray-600">Tell others about your favorite snacks, our service, and what makes us special.</p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-8 text-white text-center">
              <h4 className="text-2xl font-bold mb-4">Ready to Share Your Experience?</h4>
              <p className="text-lg mb-6 opacity-90">
                Scan the QR code or click the button below to leave your review on Google.
              </p>
              <Button 
                onClick={handleOpenGoogleReview}
                size="lg"
                className="bg-white text-amber-600 hover:bg-gray-50 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Star className="h-5 w-5 mr-2" />
                Leave a Review Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
