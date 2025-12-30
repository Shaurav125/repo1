import React, { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Award, Send, Star, User, MessageSquare } from 'lucide-react';

// --- CONFIGURATION ---
const CONTACT_DETAILS = {
  name: "Dr. Mithilesh Kumar",
  title: "MBBS, DNB, PGDHHM, FIPM",
  subtitle: "Consultant Pain & Palliative Care",
  address: "Sir Ganga Ram Hospital, Rajinder Nagar, New Delhi, Delhi 110060",
  addressShort: "Sir Ganga Ram Hospital,\nRajinder Nagar, New Delhi",
  hours: "Monday – Saturday: 6:00 PM – 8:00 PM",
  phone: "+91 98910 69190",
  phoneClean: "09891069190",
  emailTarget: "dr.mithilesh.kumar@gmail.com"
};

const DoctorInfo: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    rating: '5'
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return; // Basic validation
    
    setStatus('sending');

    // Simulate network delay for better UX
    setTimeout(() => {
        // Construct mailto link
        const subject = `New Patient Feedback from ${formData.name}`;
        const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0ARating: ${formData.rating} Stars%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
        
        // Trigger default email client
        window.location.href = `mailto:${CONTACT_DETAILS.emailTarget}?subject=${subject}&body=${body}`;
        
        setStatus('success');
        
        // Reset after a moment
        setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 bg-accent">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">We value your feedback and are here to assist with your pain management journey.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Column: Contact & Profile */}
            <div className="space-y-8">
                {/* Profile Card */}
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex items-center gap-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shrink-0 shadow-lg">
                        <Award className="text-white" size={32} />
                    </div>
                    <div>
                        <h4 className="font-serif text-2xl font-bold text-gray-900">{CONTACT_DETAILS.name}</h4>
                        <p className="text-primary font-medium text-sm">{CONTACT_DETAILS.title}</p>
                        <p className="text-gray-500 text-sm mt-1">{CONTACT_DETAILS.subtitle}</p>
                    </div>
                </div>

                {/* Contact Details */}
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 space-y-8">
                    <div className="flex items-start gap-5">
                        <div className="p-3 bg-blue-50 rounded-xl text-primary">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <h5 className="font-bold text-gray-900 mb-1">Visit Us</h5>
                            <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-line">{CONTACT_DETAILS.addressShort}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-5">
                        <div className="p-3 bg-blue-50 rounded-xl text-primary">
                            <Clock size={24} />
                        </div>
                        <div>
                            <h5 className="font-bold text-gray-900 mb-1">Opening Hours</h5>
                            <p className="text-gray-600 text-sm">{CONTACT_DETAILS.hours}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-5">
                        <div className="p-3 bg-blue-50 rounded-xl text-primary">
                            <Phone size={24} />
                        </div>
                        <div>
                            <h5 className="font-bold text-gray-900 mb-1">Call Us</h5>
                            <a href={`tel:${CONTACT_DETAILS.phoneClean}`} className="text-gray-600 hover:text-primary transition-colors font-medium text-lg">
                                {CONTACT_DETAILS.phone}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Feedback Form */}
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                <div className="bg-gray-900 p-8 text-white">
                    <h3 className="font-serif text-2xl font-bold mb-2 flex items-center gap-3">
                        <MessageSquare size={24} className="text-action-amber" /> 
                        Send Feedback
                    </h3>
                    <p className="text-gray-400 text-sm">Share your experience or ask a question. We will respond via email.</p>
                </div>
                
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <User size={18} />
                            </div>
                            <input 
                                type="text" 
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                placeholder="John Doe"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <Mail size={18} />
                            </div>
                            <input 
                                type="email" 
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                        <div className="flex gap-4">
                            {[5, 4, 3, 2, 1].map((star) => (
                                <label key={star} className="cursor-pointer group">
                                    <input 
                                        type="radio" 
                                        name="rating" 
                                        value={star} 
                                        checked={formData.rating === star.toString()}
                                        onChange={(e) => setFormData({...formData, rating: e.target.value})}
                                        className="hidden" 
                                    />
                                    <Star 
                                        size={24} 
                                        className={`transition-colors ${
                                            parseInt(formData.rating) >= star 
                                            ? 'fill-action-amber text-action-amber' 
                                            : 'text-gray-300 group-hover:text-action-amber/50'
                                        }`} 
                                    />
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                        <textarea 
                            required
                            rows={4}
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none"
                            placeholder="How can we help you today?"
                        ></textarea>
                    </div>

                    <button 
                        type="submit" 
                        disabled={status === 'sending' || status === 'success'}
                        className={`w-full py-4 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 ${
                            status === 'success' 
                            ? 'bg-green-600 hover:bg-green-700' 
                            : 'bg-primary hover:bg-secondary'
                        }`}
                    >
                        {status === 'idle' && (
                            <>Send Feedback <Send size={18} /></>
                        )}
                        {status === 'sending' && (
                            <>Sending... <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div></>
                        )}
                        {status === 'success' && (
                            <>Sent! Opening Mail Client...</>
                        )}
                    </button>
                    
                    <p className="text-center text-xs text-gray-400 mt-4">
                        Clicking send will open your default email client with your message pre-filled.
                    </p>
                </form>
            </div>

        </div>
      </div>
    </section>
  );
};

export default DoctorInfo;