import React from "react";
import { Card, Typography, Button, CardBody, CardFooter } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const cloverBlogs = [
  {
    id: 1,
    title: "Clover Launch Announcement",
    excerpt:
      "Clover is officially live! Experience a powerful platform built to simplify workflow and boost productivity effortlessly.",
    date: "Nov 13, 2025",
  },
  {
    id: 2,
    title: "Top Features of Clover",
    excerpt:
      "Explore Clover’s smartest features — automated workflows, real-time dashboards, advanced tracking, and more.",
    date: "Nov 14, 2025",
  },
  {
    id: 3,
    title: "Clover in Action: Success Stories",
    excerpt:
      "Discover real stories of institutions and students using Clover to simplify scholarship management.",
    date: "Nov 15, 2025",
  },
];

const Blog = () => {
  return (
    <div
      className="min-h-screen py-14 px-4 relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1950&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-4xl md:text-5xl font-extrabold text-white mb-14 drop-shadow-2xl"
        >
          Clover Blog
        </motion.h1>

        {/* Blog Grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {cloverBlogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
            >
              <Card className="bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl hover:shadow-2xl transition overflow-hidden border border-white/40">
                <div className="h-40 bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                  {blog.title.slice(0, 1)}
                </div>
                <CardBody>
                  <Typography variant="h5" className="mb-2 font-bold text-gray-900">
                    {blog.title}
                  </Typography>
                  <Typography variant="paragraph" className="text-gray-700 leading-relaxed">
                    {blog.excerpt}
                  </Typography>
                </CardBody>
                <CardFooter className="flex justify-between items-center">
                  <Typography variant="small" color="gray">
                    {blog.date}
                  </Typography>
                  <Button size="sm" color="indigo" variant="text" className="flex items-center gap-1">
                    Read More <ArrowRight size={16} />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;