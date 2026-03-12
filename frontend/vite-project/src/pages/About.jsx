import React from "react";
import { Typography, Card, CardBody, Button, Avatar } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50">
      {/* 🔹 Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center bg-gradient-to-r from-indigo-600 to-blue-500 py-28 px-6 text-white overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Typography variant="h2" className="text-4xl md:text-6xl font-extrabold mb-4 tracking-wide drop-shadow-md">
            About <span className="text-yellow-300">Clover</span>
          </Typography>
          <Typography variant="lead" className="max-w-2xl mx-auto opacity-90 text-lg">
            Creating seamless digital solutions that empower education, innovation, and growth.
          </Typography>
        </motion.div>

        {/* Floating Circles Background */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute w-72 h-72 bg-white rounded-full blur-3xl -top-10 -left-20"></div>
          <div className="absolute w-96 h-96 bg-yellow-200 rounded-full blur-3xl bottom-0 right-0"></div>
        </div>
      </section>

      {/* 🔹 About Company Section */}
      <section className="max-w-screen-xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-14 items-center">
        <motion.img
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80"
          alt="About Clover"
          className="rounded-3xl shadow-xl hover:scale-105 transition-transform"
        />

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <Typography variant="h3" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Who We Are
          </Typography>
          <Typography className="text-gray-700 leading-relaxed mb-4 text-lg">
            Clover is a creative team of developers, designers, and innovators dedicated to building impactful digital platforms.
            We integrate technology with real-world needs, empowering students, institutes, and organizations.
          </Typography>
          <Typography className="text-gray-700 text-lg">
            From paperless digital systems to AI-powered tools — we focus on simplicity, performance, and a seamless user experience.
          </Typography>
        </motion.div>
      </section>

      {/* 🔹 Mission & Vision */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-10">
          {[{
            title: "Our Mission",
            text: "Empowering people through innovative technology — making digital access transparent, smart, and universal."
          }, {
            title: "Our Vision",
            text: "A digital ecosystem where opportunities flow freely and innovation inspires the next generation."
          }].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100">
                <CardBody>
                  <Typography variant="h4" className="mb-3 text-indigo-600 font-bold text-2xl">
                    {item.title}
                  </Typography>
                  <Typography className="text-gray-700 text-lg leading-relaxed">
                    {item.text}
                  </Typography>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🔹 Team Section */}
      <section className="max-w-screen-xl mx-auto py-20 px-6 text-center">
        <Typography variant="h3" className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          Meet Our Team
        </Typography>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {[{ name: "Hitesh Kumar", role: "Frontend Developer" }, { name: "Aarav Mehta", role: "Backend Engineer" }, { name: "Riya Sharma", role: "UI/UX Designer" }, { name: "Dev Patel", role: "Project Manager" }].map((member) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 rounded-2xl shadow-lg hover:scale-105 transition-all">
                <Avatar
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`}
                  size="xl"
                  className="mx-auto mb-4 shadow-md"
                />
                <Typography variant="h6" className="font-semibold text-gray-900 text-lg">
                  {member.name}
                </Typography>
                <Typography variant="small" className="text-gray-600">
                  {member.role}
                </Typography>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🔹 CTA */}
      <section className="bg-indigo-600 py-20 text-center text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Typography variant="h4" className="mb-4 font-semibold text-3xl">
            Want to work with us?
          </Typography>
          <Typography variant="lead" className="mb-8 opacity-95 text-lg">
            Let’s create something powerful and innovative together.
          </Typography>
          <Button
            size="lg"
            color="white"
            variant="outlined"
            className="text-indigo-600 bg-white font-semibold rounded-full px-8 shadow-md hover:bg-gray-100"
            onClick={() => navigate("/contact")}
          >
            Contact Us
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default About;