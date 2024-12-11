import React from 'react';
import { Users, Building, Award, Clock } from 'lucide-react';

export default function StatisticsSection() {
  const stats = [
    {
      icon: Users,
      number: "10,000+",
      label: "Students Trained",
      description: "Successfully prepared for interviews"
    },
    {
      icon: Building,
      number: "100+",
      label: "Partner Companies",
      description: "Trust our platform for hiring"
    },
    {
      icon: Award,
      number: "95%",
      label: "Success Rate",
      description: "Of users improve their skills"
    },
    {
      icon: Clock,
      number: "24/7",
      label: "Available",
      description: "Practice anytime, anywhere"
    }
  ];

  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 flex">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-24">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white">{stat.number}</h3>
              <p className="text-xl font-semibold text-blue-100">{stat.label}</p>
              <p className="mt-1 text-blue-200">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}