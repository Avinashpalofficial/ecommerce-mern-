import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, ArrowRight } from "lucide-react";
import Footer from "../component/layout/Footer";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setLoading(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["123 Clover Street", "Mumbai, India 400001"],
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 98765 43210", "+91 12345 67890"],
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["support@clover.com", "info@clover.com"],
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Mon - Sat: 9 AM - 7 PM", "Sunday: Closed"],
    },
  ];

  return (
    <div className="min-h-screen bg-[hsl(45,30%,97%)]">
      {/* Hero Section */}
      <section className="relative bg-[hsl(20,10%,15%)] py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(12,76%,55%)]/10 to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[hsl(12,76%,55%)]/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-[hsl(12,76%,55%)] uppercase tracking-widest text-sm font-medium mb-4">
              Get in Touch
            </p>
            <h1 className="font-serif text-4xl md:text-6xl font-semibold text-white mb-6">
              {"We'd Love to Hear"}
              <br />
              From You
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Have questions about our products or need assistance? Our team is here to help you with anything you need.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-[hsl(20,10%,88%)]"
            >
              <div className="w-12 h-12 bg-[hsl(12,40%,92%)] rounded-xl flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-[hsl(12,76%,55%)]" />
              </div>
              <h3 className="font-semibold text-[hsl(20,15%,10%)] mb-2">{item.title}</h3>
              {item.details.map((detail, i) => (
                <p key={i} className="text-[hsl(20,10%,40%)] text-sm">
                  {detail}
                </p>
              ))}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-[hsl(12,76%,55%)] uppercase tracking-widest text-sm font-medium mb-4">
              Contact Form
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[hsl(20,15%,10%)] mb-6">
              Send Us a Message
            </h2>
            <p className="text-[hsl(20,10%,40%)] leading-relaxed mb-8">
              Fill out the form and our team will get back to you within 24 hours. We value your feedback and are committed to providing excellent customer service.
            </p>

            {/* FAQ Quick Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-[hsl(20,15%,10%)]">Quick Help</h4>
              {["Track your order", "Return policy", "Shipping information", "Payment methods"].map((item, i) => (
                <button
                  key={i}
                  className="flex items-center gap-3 text-[hsl(20,10%,40%)] hover:text-[hsl(12,76%,55%)] transition-colors group"
                >
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  {item}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg border border-[hsl(20,10%,88%)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-[hsl(20,15%,10%)] mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full bg-[hsl(45,30%,97%)] border border-[hsl(20,10%,88%)] rounded-lg px-4 py-3 text-[hsl(20,15%,10%)] placeholder:text-[hsl(20,10%,60%)] focus:outline-none focus:ring-2 focus:ring-[hsl(12,76%,55%)] focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[hsl(20,15%,10%)] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full bg-[hsl(45,30%,97%)] border border-[hsl(20,10%,88%)] rounded-lg px-4 py-3 text-[hsl(20,15%,10%)] placeholder:text-[hsl(20,10%,60%)] focus:outline-none focus:ring-2 focus:ring-[hsl(12,76%,55%)] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className="block text-sm font-medium text-[hsl(20,15%,10%)] mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  required
                  className="w-full bg-[hsl(45,30%,97%)] border border-[hsl(20,10%,88%)] rounded-lg px-4 py-3 text-[hsl(20,15%,10%)] placeholder:text-[hsl(20,10%,60%)] focus:outline-none focus:ring-2 focus:ring-[hsl(12,76%,55%)] focus:border-transparent transition-all"
                />
              </div>

              <div className="mt-5">
                <label className="block text-sm font-medium text-[hsl(20,15%,10%)] mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your inquiry..."
                  rows={5}
                  required
                  className="w-full bg-[hsl(45,30%,97%)] border border-[hsl(20,10%,88%)] rounded-lg px-4 py-3 text-[hsl(20,15%,10%)] placeholder:text-[hsl(20,10%,60%)] focus:outline-none focus:ring-2 focus:ring-[hsl(12,76%,55%)] focus:border-transparent transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full bg-[hsl(20,10%,15%)] hover:bg-[hsl(20,10%,20%)] text-white py-4 rounded-lg font-medium transition-all disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
