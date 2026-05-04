import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Calendar, MapPin, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { upcomingAppearances } from '@/data/appearances';
import { aboutEventGallery } from '@/data/aboutEventGallery';

const ContactPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side Validation
    let isValid = true;
    const newErrors = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'This field is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'This field is required';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'This field is required';
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xzdjokgd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      toast({
        title: "Success",
        description: "Thank you! Your message has been sent successfully.",
      });

      // Clear form on success
      setFormData({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
      });
      setErrors({ name: '', email: '', message: '' });

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return <>
      <Helmet>
        <title>Contact | Volcano Drip</title>
        <meta name="description" content="Get in touch with the team and see where we'll be next." />
      </Helmet>
      
      <div className="min-h-screen bg-stone-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">Make Contact</h1>
              <p className="text-stone-500 text-lg">Questions about your order? Want to talk roast profiles? We're listening.</p>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Info Side */}
              <div className="space-y-8">
                 <div className="bg-white p-8 border border-stone-200">
                    <h3 className="text-xl font-bold text-stone-900 mb-6">Reach Out</h3>
                    <div className="space-y-6">
                       <div className="flex items-center gap-4">
                          <Mail className="text-amber-700" />
                          <span className="text-stone-600">hello@volcanodrip.com</span>
                       </div>
                    </div>
                 </div>

                 {/* Events Section */}
                 <div className="bg-stone-900 text-white p-8 border border-stone-900">
                    <div className="flex items-center gap-3 mb-6">
                       <Calendar className="text-amber-500 h-6 w-6" />
                       <h3 className="text-xl font-bold">Upcoming Appearances</h3>
                    </div>
                    
                    <div className="space-y-6">
                       {upcomingAppearances.map((ev) => (
                         <div
                           key={ev.id}
                           className={`border-l-2 pl-4 ${ev.highlight ? 'border-amber-500' : 'border-stone-700'}`}
                         >
                           <span
                             className={`text-xs font-bold uppercase tracking-wider block mb-1 ${
                               ev.highlight ? 'text-amber-500' : 'text-stone-400'
                             }`}
                           >
                             {ev.dateLabel}
                           </span>
                           <h4 className="font-bold text-lg">{ev.title}</h4>
                           <div className="flex items-center gap-2 text-stone-400 text-sm mt-1">
                             <MapPin className="h-3 w-3 shrink-0" aria-hidden />
                             <span>{ev.location}</span>
                           </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>

              {/* Form Side */}
              <div className="bg-white p-8 md:p-12 border border-stone-200 h-fit transition-all duration-300 hover:shadow-lg">
                 <h3 className="text-2xl font-bold text-stone-900 mb-6">Contact Us</h3>
                 <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-bold uppercase text-stone-500 tracking-wide">
                            Name <span className="text-amber-600">*</span>
                          </Label>
                          <Input 
                            type="text" 
                            id="name" 
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full p-3 border focus-visible:ring-stone-900 bg-stone-50 transition-colors ${errors.name ? 'border-red-500 focus-visible:ring-red-500' : 'border-stone-200'}`} 
                            placeholder="Jane Doe" 
                          />
                          {errors.name && <p className="text-red-500 text-sm mt-1 font-medium">{errors.name}</p>}
                       </div>
                       <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-bold uppercase text-stone-500 tracking-wide">
                            Email <span className="text-amber-600">*</span>
                          </Label>
                          <Input 
                            type="email" 
                            id="email" 
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full p-3 border focus-visible:ring-stone-900 bg-stone-50 transition-colors ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : 'border-stone-200'}`} 
                            placeholder="jane@example.com" 
                          />
                          {errors.email && <p className="text-red-500 text-sm mt-1 font-medium">{errors.email}</p>}
                       </div>
                    </div>
                    
                    <div className="space-y-2">
                       <Label htmlFor="subject" className="text-sm font-bold uppercase text-stone-500 tracking-wide">Subject</Label>
                       <select 
                         id="subject" 
                         value={formData.subject}
                         onChange={handleChange}
                         className="w-full p-3 border border-stone-200 focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 bg-stone-50 rounded-md transition-colors"
                       >
                          <option>General Inquiry</option>
                          <option>Orders Support</option>
                          <option>Other</option>
                       </select>
                    </div>

                    <div className="space-y-2">
                       <Label htmlFor="message" className="text-sm font-bold uppercase text-stone-500 tracking-wide">
                         Message <span className="text-amber-600">*</span>
                       </Label>
                       <Textarea 
                         id="message" 
                         value={formData.message}
                         onChange={handleChange}
                         rows={5} 
                         className={`w-full p-3 border focus-visible:ring-stone-900 bg-stone-50 transition-colors resize-y ${errors.message ? 'border-red-500 focus-visible:ring-red-500' : 'border-stone-200'}`} 
                         placeholder="How can we help?"
                       />
                       {errors.message && <p className="text-red-500 text-sm mt-1 font-medium">{errors.message}</p>}
                    </div>

                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold h-12 rounded-none disabled:opacity-70 flex items-center justify-center gap-2 transition-all duration-300"
                    >
                       {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : "Send Message"}
                    </Button>
                 </form>
              </div>
           </div>

           <section className="mt-16 md:mt-20 max-w-5xl mx-auto">
             <motion.div
               initial={{ opacity: 0, y: 12 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.4 }}
               className="text-center mb-10"
             >
               <h2 className="text-2xl md:text-3xl font-black text-stone-900 tracking-tight mb-2">
                 Pop-ups &amp; events
               </h2>
               <p className="text-stone-600 max-w-2xl mx-auto leading-relaxed">
                 Photos from our outdoor setups—mobile truck, tasting crates, and the crew behind the bar.
               </p>
             </motion.div>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
               {aboutEventGallery.map((item, index) => (
                 <motion.div
                   key={item.src}
                   initial={{ opacity: 0, y: 8 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.24) }}
                   className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm"
                 >
                   <img
                     src={item.src}
                     alt={item.alt}
                     loading="lazy"
                     decoding="async"
                     className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                     width={800}
                     height={1067}
                   />
                 </motion.div>
               ))}
             </div>
           </section>
        </div>
      </div>
    </>;
};
export default ContactPage;