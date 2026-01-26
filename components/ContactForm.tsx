'use client';

import { useState, FormEvent } from 'react';
import Lottie from 'lottie-react';
import contactAnimation from '@/utils/lottie/contact-animation.json';

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    // Validate phone (WhatsApp)
    const phoneRegex = /^[\d\s()+-]+$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!phoneRegex.test(formData.phone) || formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Invalid phone number';
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }

    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus('idle');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: '',
      });
      setErrors({});
    } catch (err) {
      setSubmitStatus('error');
      console.error('Error submitting form:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section id="contact" className="relative min-h-screen bg-black text-white py-20 overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-lemon-950/20 via-transparent to-pink-950/20"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-lemon-500 font-mono text-sm">05. CONTACT</span>
            <div className="h-px flex-1 bg-gradient-to-r from-lemon-500 to-transparent"></div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            LET&apos;S <span className="text-pink-500">CONNECT</span>
          </h2>
          <p className="text-gray-400 max-w-3xl leading-relaxed">
            Have a project in mind or want to collaborate? Send me a message and I&apos;ll get back to you as soon as possible.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Animation */}
          <div className="relative lg:order-1">
            <div className="relative w-full max-w-lg mx-auto">
              {/* Glowing Background Effect */}
              <div className="absolute inset-0 bg-lemon-500/10 blur-3xl rounded-full"></div>
              
              {/* Animation Container */}
              <div className="relative border-2 border-lemon-500/30 p-8 bg-black/50 backdrop-blur-sm">
                <Lottie
                  animationData={contactAnimation}
                  loop={true}
                  autoplay={true}
                  className="w-full h-full"
                />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-lemon-500"></div>
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-pink-500"></div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="order-1 lg:order-2">
            <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-mono text-lemon-500 mb-2 uppercase">
              Name *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`w-full px-4 py-3 bg-black border ${
                errors.name ? 'border-pink-500' : 'border-gray-700'
              } text-white focus:outline-none focus:border-lemon-500 transition-all font-mono`}
              placeholder="Your full name"
            />
            {errors.name && <p className="text-pink-500 text-sm mt-1 font-mono">{errors.name}</p>}
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-mono text-lemon-500 mb-2 uppercase">
              Phone (WhatsApp) *
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={`w-full px-4 py-3 bg-black border ${
                errors.phone ? 'border-pink-500' : 'border-gray-700'
              } text-white focus:outline-none focus:border-lemon-500 transition-all font-mono`}
              placeholder="+55 (00) 00000-0000"
            />
            {errors.phone && <p className="text-pink-500 text-sm mt-1 font-mono">{errors.phone}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-mono text-lemon-500 mb-2 uppercase">
              Email *
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`w-full px-4 py-3 bg-black border ${
                errors.email ? 'border-pink-500' : 'border-gray-700'
              } text-white focus:outline-none focus:border-lemon-500 transition-all font-mono`}
              placeholder="your.email@example.com"
            />
            {errors.email && <p className="text-pink-500 text-sm mt-1 font-mono">{errors.email}</p>}
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-mono text-lemon-500 mb-2 uppercase">
              Message *
            </label>
            <textarea
              id="message"
              rows={6}
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              className={`w-full px-4 py-3 bg-black border ${
                errors.message ? 'border-pink-500' : 'border-gray-700'
              } text-white focus:outline-none focus:border-lemon-500 transition-all resize-none font-mono`}
              placeholder="Write your message here..."
            />
            {errors.message && <p className="text-pink-500 text-sm mt-1 font-mono">{errors.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-8 py-4 bg-lemon-500 text-black font-bold hover:bg-lemon-400 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none uppercase"
          >
            {isSubmitting ? 'SENDING...' : 'SEND MESSAGE >>'}
          </button>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="border-2 border-lemon-500 bg-lemon-500/10 text-lemon-500 px-4 py-3 font-mono text-sm">
              <span className="text-lemon-500">&gt;&gt;</span> MESSAGE SENT SUCCESSFULLY! Thank you for reaching out.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="border-2 border-pink-500 bg-pink-500/10 text-pink-500 px-4 py-3 font-mono text-sm">
              <span className="text-pink-500">&gt;&gt;</span> ERROR: Failed to send message. Please try again.
            </div>
          )}
        </form>
          </div>
        </div>
      </div>
    </section>
  );
}
