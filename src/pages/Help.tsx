import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, MessageCircle, FileText, Mail } from "lucide-react";

export default function Help() {
  const faqs = [
    {
      question: "How do I get started with PatternGenie?",
      answer: "Getting started is easy! First, create an account, then head to the Design Studio where you can start creating your first pattern. We recommend checking out our tutorials section for step-by-step guides.",
    },
    {
      question: "What file formats are supported?",
      answer: "PatternGenie supports PDF, SVG, and DXF file formats for pattern downloads. You can choose your preferred format when exporting your pattern.",
    },
    {
      question: "How do I modify existing patterns?",
      answer: "To modify an existing pattern, open it in the Design Studio, where you'll find tools for adjusting measurements, adding seam allowances, and customizing design elements.",
    },
    {
      question: "Can I sell patterns I create?",
      answer: "Yes! Once you've created a pattern, you can list it in our marketplace. You'll need to verify your account and agree to our seller terms and conditions.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">Help Center</h1>
          
          <div className="flex gap-4 mb-8">
            <Input placeholder="Search help articles..." className="max-w-md" />
            <Button>
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-purple-600" />
                  Live Chat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Get help from our support team in real-time</p>
                <Button variant="secondary" className="w-full">Start Chat</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-600" />
                  Documentation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Browse our detailed documentation</p>
                <Button variant="secondary" className="w-full">View Docs</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-purple-600" />
                  Email Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Send us an email for complex issues</p>
                <Button variant="secondary" className="w-full">Contact Us</Button>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}