import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Award, Users, Globe, Heart } from "lucide-react";
import Footer from "../component/layout/Footer";

const About = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: Award,
      title: "Quality First",
      description: "We curate only the finest products, ensuring every item meets our high standards.",
    },
    {
      icon: Users,
      title: "Customer Focus",
      description: "Your satisfaction is our priority. We listen, adapt, and deliver excellence.",
    },
    {
      icon: Globe,
      title: "Sustainability",
      description: "Committed to eco-friendly practices and responsible sourcing.",
    },
    {
      icon: Heart,
      title: "Passion",
      description: "We love what we do, and it shows in every detail of your experience.",
    },
  ];

  const team = [
    { name: "Hitesh Kumar", role: "Founder & CEO" },
    { name: "Aarav Mehta", role: "Head of Technology" },
    { name: "Riya Sharma", role: "Creative Director" },
    { name: "Dev Patel", role: "Operations Lead" },
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "2,500+", label: "Products" },
    { number: "15+", label: "Countries" },
    { number: "99%", label: "Satisfaction Rate" },
  ];

  return (
    <div className="min-h-screen bg-[hsl(45,30%,97%)]">
      {/* Hero Section */}
      <section className="relative bg-[hsl(20,10%,15%)] py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[hsl(12,76%,55%)]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[hsl(12,76%,55%)]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-[hsl(12,76%,55%)] uppercase tracking-widest text-sm font-medium mb-4">
              Our Story
            </p>
            <h1 className="font-serif text-4xl md:text-6xl font-semibold text-white mb-6 text-balance">
              Crafting Exceptional Shopping Experiences
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              At CLOVER, we believe shopping should be more than just a transaction. 
              {"It's"} about discovering products that inspire, delight, and enhance your everyday life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl border border-[hsl(20,10%,88%)] p-8 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="font-serif text-3xl md:text-4xl font-semibold text-[hsl(12,76%,55%)]">
                {stat.number}
              </p>
              <p className="text-[hsl(20,10%,40%)] text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80"
                alt="Our journey"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-8 -right-8 bg-[hsl(12,76%,55%)] text-white p-6 rounded-2xl shadow-xl">
                <p className="font-serif text-3xl font-semibold">2020</p>
                <p className="text-sm opacity-90">Founded</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-[hsl(12,76%,55%)] uppercase tracking-widest text-sm font-medium mb-4">
              Who We Are
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[hsl(20,15%,10%)] mb-6">
              A Team Passionate About Quality
            </h2>
            <p className="text-[hsl(20,10%,40%)] leading-relaxed mb-6">
              CLOVER started with a simple idea: everyone deserves access to premium products 
              without the premium markup. Our founders, frustrated with the disconnect between 
              quality and accessibility, set out to bridge that gap.
            </p>
            <p className="text-[hsl(20,10%,40%)] leading-relaxed mb-8">
              Today, we work directly with artisans, manufacturers, and designers worldwide 
              to bring you carefully curated collections that combine craftsmanship with value. 
              Every product in our catalog has been personally selected and tested by our team.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="inline-flex items-center gap-2 bg-[hsl(20,10%,15%)] hover:bg-[hsl(20,10%,20%)] text-white px-6 py-3 rounded-lg font-medium transition-all group"
            >
              Explore Our Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-[hsl(45,20%,93%)] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[hsl(12,76%,55%)] uppercase tracking-widest text-sm font-medium mb-4">
              What Drives Us
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[hsl(20,15%,10%)]">
              Our Core Values
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-[hsl(20,10%,88%)] text-center"
              >
                <div className="w-14 h-14 bg-[hsl(12,40%,92%)] rounded-xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-7 h-7 text-[hsl(12,76%,55%)]" />
                </div>
                <h3 className="font-semibold text-[hsl(20,15%,10%)] text-lg mb-3">
                  {value.title}
                </h3>
                <p className="text-[hsl(20,10%,40%)] text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[hsl(12,76%,55%)] uppercase tracking-widest text-sm font-medium mb-4">
            The People Behind CLOVER
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[hsl(20,15%,10%)]">
            Meet Our Team
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl mb-4 bg-[hsl(45,20%,93%)] aspect-square">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=400&background=e8d5c4&color=1a1a1a&bold=true`}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-semibold text-[hsl(20,15%,10%)] text-lg">
                {member.name}
              </h3>
              <p className="text-[hsl(20,10%,40%)] text-sm">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[hsl(20,10%,15%)] py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl md:text-5xl font-semibold text-white mb-6 text-balance">
              Ready to Experience the CLOVER Difference?
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have made CLOVER their go-to destination for quality products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/products")}
                className="inline-flex items-center justify-center gap-2 bg-[hsl(12,76%,55%)] hover:bg-[hsl(12,76%,45%)] text-white px-8 py-4 rounded-lg font-medium transition-all"
              >
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="inline-flex items-center justify-center gap-2 bg-transparent border border-white/20 hover:bg-white/10 text-white px-8 py-4 rounded-lg font-medium transition-all"
              >
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
