import React from "react";

const values = [
  { title: "Verified Quality", desc: "Every medicine listed is sourced from licensed manufacturers and distributors.", icon: "✅" },
  { title: "Fast Delivery", desc: "Most orders reach you within 24-48 hours, packed with care.", icon: "🚚" },
  { title: "Data Privacy", desc: "Your health information and orders stay confidential, always.", icon: "🔒" },
  { title: "Support that cares", desc: "Our team is on hand to help with orders, refills and questions.", icon: "💬" },
];

const About = () => {
  return (
    <div>
      <section className="bg-primary-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary-700 bg-white px-3 py-1 rounded-full mb-5">
            About MediCart
          </span>
          <h1 className="font-display font-800 text-4xl text-ink mb-4">
            Making healthcare essentials simple to get
          </h1>
          <p className="text-ink/70 text-lg">
            MediCart started with one goal: help people get the medicines they need without the wait, the queues, or the guesswork. We're a small team of pharmacists and technologists building a pharmacy that fits into your day.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <img
            src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=800&auto=format&fit=crop"
            alt="Rows of medicine boxes on a pharmacy shelf"
            className="rounded-2xl h-80 w-full object-cover"
          />
          <div>
            <h2 className="font-display font-bold text-2xl text-ink mb-4">Our story</h2>
            <p className="text-ink/70 leading-relaxed mb-4">
              What began as a single neighbourhood pharmacy counter has grown into an online platform serving households across the city. We kept the parts that mattered — a pharmacist who checks every order — and removed the parts that didn't, like the wait.
            </p>
            <p className="text-ink/70 leading-relaxed">
              Today, MediCart stocks everyday essentials, chronic-care refills, and family health products, all backed by transparent pricing and real customer support.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 border-t border-primary-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display font-bold text-2xl text-ink mb-10 text-center">Why people choose us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-primary-50/60 rounded-2xl p-6 text-center border border-primary-100">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="font-display font-semibold text-ink mb-2">{v.title}</h3>
                <p className="text-sm text-ink/60">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
