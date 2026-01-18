import React, { useState } from "react";
import { Typography, Button, Input, Textarea, Card } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl grid md:grid-cols-2 shadow-2xl rounded-2xl overflow-hidden"
      >
        {/* Left Section */}
        <div className="p-10 bg-blue-700 text-white flex flex-col justify-center gap-8">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold tracking-wide"
          >
            Get in Touch
          </motion.h1>

          <p className="text-lg opacity-90">
            We're here to help! Contact us anytime and we'll get back to you as soon as possible.
          </p>

          <div className="space-y-5 text-lg">
            <div className="flex items-start gap-3">
              <MapPin className="w-6 h-6" />
              <p>123 Clover Street, Mumbai, India</p>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-6 h-6" />
              <p>+91 98765 43210</p>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-6 h-6" />
              <p>support@clover.com</p>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-6 h-6" />
              <p>Mon - Sat: 9 AM to 7 PM</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="p-10 bg-white">
          <Typography variant="h3" className="text-center font-bold mb-6 text-blue-700">
            Contact Form
          </Typography>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <Input
              size="lg"
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="focus:!border-blue-600"
              required
            />

            <Input
              size="lg"
              type="email"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="focus:!border-blue-600"
              required
            />

            <Textarea
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="focus:!border-blue-600"
              required
            />

            <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-blue-700 hover:bg-blue-800 rounded-lg py-3 text-lg shadow-md"
              >
                Send Message
              </Button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
