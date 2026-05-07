import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import PageHero from '@/components/PageHero';

const ContactPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      toast({
        title: 'Success',
        description: 'Thank you! Your message has been sent successfully.',
      });

      setFormData({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: '',
      });
      setErrors({ name: '', email: '', message: '' });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact | Volcano Drip</title>
        <meta
          name="description"
          content="Get in touch with Volcano Drip for orders, partnerships, and event bookings."
        />
      </Helmet>

      <div className="min-h-screen bg-stone-50">
        <PageHero
          kicker="Contact"
          title={
            <>
              MAKE
              <br />
              CONTACT.
            </>
          }
          imageSrc="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=2000"
          imageAlt="Coffee bar and conversation"
          overlayClassName="pointer-events-none absolute inset-0 z-10 bg-black/60"
          size="compact"
          sectionClassName="py-14 md:py-20"
        >
          <p className="mx-auto max-w-2xl text-lg text-stone-200 md:text-xl">
            Questions about your order, wholesale opportunities, or booking Volcano Drip? We&apos;re listening.
          </p>
        </PageHero>

        <div className="px-4 py-14">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div className="bg-white p-8 border border-stone-200">
                <h2 className="text-xl font-bold text-stone-900 mb-6">Reach Out</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Mail className="text-amber-700" />
                    <a href="mailto:hello@volcanodrip.com" className="text-stone-600 hover:text-stone-900">
                      hello@volcanodrip.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700 mb-2">Looking for events?</p>
                <h3 className="text-2xl font-black text-stone-900 tracking-tight">Visit our new Events page</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-700">
                  See upcoming appearances, photo galleries, and community partnerships in one place.
                </p>
                <Button asChild className="mt-5 bg-stone-900 hover:bg-stone-800 text-white rounded-full px-6">
                  <Link to="/events">Go to Events</Link>
                </Button>
              </div>
            </div>

            <div className="bg-white p-8 md:p-10 border border-stone-200 transition-all duration-300 hover:shadow-lg">
              <h2 className="text-2xl font-bold text-stone-900 mb-6">Contact Us</h2>
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
                      className={`w-full p-3 border focus-visible:ring-stone-900 bg-stone-50 transition-colors ${
                        errors.name ? 'border-red-500 focus-visible:ring-red-500' : 'border-stone-200'
                      }`}
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
                      className={`w-full p-3 border focus-visible:ring-stone-900 bg-stone-50 transition-colors ${
                        errors.email ? 'border-red-500 focus-visible:ring-red-500' : 'border-stone-200'
                      }`}
                      placeholder="jane@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1 font-medium">{errors.email}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm font-bold uppercase text-stone-500 tracking-wide">
                    Subject
                  </Label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-3 border border-stone-200 focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 bg-stone-50 rounded-md transition-colors"
                  >
                    <option>General Inquiry</option>
                    <option>Orders Support</option>
                    <option>Event Booking</option>
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
                    className={`w-full p-3 border focus-visible:ring-stone-900 bg-stone-50 transition-colors resize-y ${
                      errors.message ? 'border-red-500 focus-visible:ring-red-500' : 'border-stone-200'
                    }`}
                    placeholder="How can we help?"
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1 font-medium">{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold h-12 rounded-none disabled:opacity-70 flex items-center justify-center gap-2 transition-all duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
