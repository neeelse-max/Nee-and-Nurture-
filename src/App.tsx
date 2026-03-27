/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Users, 
  MessageCircle, 
  Heart, 
  CheckCircle2, 
  ArrowRight, 
  Menu, 
  X,
  Instagram,
  Facebook,
  Mail,
  Phone,
  Clock,
  MapPin,
  Leaf,
  Lock,
  CreditCard,
  Wallet,
  Building2
} from 'lucide-react';
import { format, isSameDay, isMonday, addDays, startOfToday } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { cn } from './lib/utils';
import { MONDAY_CLUB_CAPACITY, MONDAY_DATES, PRIVATE_SLOTS, BookingData } from './types';

// --- Components ---

const Navbar = ({ activePage, setActivePage }: { activePage: string, setActivePage: (p: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'monday-club', label: 'The Monday Club' },
    { id: 'private', label: 'Private 1:1s' },
    { id: 'booking', label: 'Book Now' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
      isScrolled ? "bg-beige/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div 
          className="cursor-pointer group flex flex-col items-center"
          onClick={() => setActivePage('home')}
        >
          <h1 className="text-3xl md:text-4xl font-script text-burgundy leading-none mb-1">
            Née & Nurture
          </h1>
          <div className="flex items-center gap-3 w-full">
            <div className="h-[1px] flex-1 bg-burgundy/20" />
            <p className="text-[7px] md:text-[8px] uppercase tracking-[0.4em] text-burgundy font-bold whitespace-nowrap">
              The Birth & Baby Co.
            </p>
            <div className="h-[1px] flex-1 bg-burgundy/20" />
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={cn(
                  "text-[10px] uppercase tracking-[0.15em] font-bold transition-all hover:text-burgundy",
                  activePage === item.id ? "text-burgundy" : "text-ink/30"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setActivePage('booking')}
            className="bg-burgundy text-white px-6 py-2.5 rounded-full text-[9px] uppercase tracking-[0.15em] font-bold hover:bg-burgundy-light transition-all active:scale-95 shadow-lg shadow-burgundy/5 whitespace-nowrap"
          >
            Book Your Journey
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-ink" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl p-8 flex flex-col gap-6 md:hidden"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={cn(
                  "text-lg font-medium text-left",
                  activePage === item.id ? "text-burgundy" : "text-ink/70"
                )}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Pages ---

const HomePage = ({ setActivePage }: { setActivePage: (p: string) => void }) => {
  return (
    <div className="pt-32">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1555252333-9f8e92e65ee9?q=80&w=2070&auto=format&fit=crop" 
            alt="Expectant couple" 
            className="w-full h-full object-cover opacity-40 scale-105 grayscale-[20%]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-beige/80 via-transparent to-beige" />
        </div>

        <div className="max-w-5xl mx-auto w-full relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block text-[10px] font-bold tracking-[0.4em] uppercase text-burgundy/30 mb-8">
              Antenatal • Postnatal • Community
            </span>
            <h1 className="text-7xl md:text-[10rem] font-script text-burgundy mb-8 leading-none">
              Coming Soon
            </h1>
            <div className="flex items-center gap-4 justify-center mb-12">
              <div className="h-[1px] w-8 bg-burgundy/20" />
              <p className="text-[10px] md:text-xs font-display font-medium tracking-[0.5em] uppercase text-burgundy/60">
                Antenatal and Postnatal Education Sessions
              </p>
              <div className="h-[1px] w-8 bg-burgundy/20" />
            </div>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <button 
                onClick={() => setActivePage('booking')} 
                className="bg-burgundy text-white px-10 py-4 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-burgundy-light transition-all hover:shadow-xl hover:shadow-burgundy/10 active:scale-95 whitespace-nowrap"
              >
                Book Your Journey
              </button>
              <button 
                onClick={() => setActivePage('monday-club')} 
                className="text-[10px] uppercase tracking-[0.2em] font-bold text-burgundy/40 hover:text-burgundy transition-all border-b border-burgundy/10 pb-1"
              >
                The Monday Club
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-6 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-5xl md:text-7xl font-serif mb-12 leading-tight">
              Evidence-based education, <br />
              <span className="font-script text-burgundy text-6xl md:text-9xl">delivered with heart.</span>
            </h2>
            <div className="editorial-line mb-12" />
            <p className="text-xl text-ink/70 leading-relaxed font-light mb-16">
              Née & Nurture was born from a simple belief: that every expectant parent 
              deserves more than just clinical checklists. You deserve a community that 
              supports you, experts who empower you, and a space that nurtures you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 px-6 bg-beige/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-16">
            {[
              {
                icon: <Users className="text-burgundy/40" size={48} strokeWidth={1} />,
                title: "Intimate Groups",
                description: "Capped at 8 couples to ensure every voice is heard and real connections are made."
              },
              {
                icon: <MessageCircle className="text-burgundy/40" size={48} strokeWidth={1} />,
                title: "Midwife in Your Pocket",
                description: "Direct WhatsApp support throughout your journey. Expert advice is just a message away."
              },
              {
                icon: <Heart className="text-burgundy/40" size={48} strokeWidth={1} />,
                title: "Evidence-Based",
                description: "No fluff. Just the latest research delivered with empathy and professional expertise."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                className="group"
              >
                <div className="mb-8 transform group-hover:-translate-y-2 transition-transform duration-500">{feature.icon}</div>
                <h3 className="text-3xl font-serif mb-6">{feature.title}</h3>
                <div className="editorial-line mb-6 w-12 group-hover:w-full transition-all duration-700" />
                <p className="text-ink/60 leading-relaxed font-light">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Your Midwife */}
      <section className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1974&auto=format&fit=crop" 
                  alt="Midwife" 
                  className="w-full h-full object-cover grayscale-[30%]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-burgundy/5 rounded-full -z-10" />
              <div className="absolute top-12 -left-12 w-48 h-48 border border-burgundy/10 rounded-[2rem] -z-10" />
            </div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-burgundy/60 mb-6 block">
                Meet Your Founder
              </span>
              <h2 className="text-6xl font-serif mb-8">Hi, I'm <span className="font-display italic text-burgundy text-7xl">Née.</span></h2>
              <p className="text-xl text-ink/70 leading-relaxed font-light mb-8">
                With over a decade of experience as a midwife and a passion for holistic wellness, 
                I created Née & Nurture to bridge the gap between clinical care and the 
                nurturing support parents truly need.
              </p>
              <p className="text-lg text-ink/60 leading-relaxed font-light mb-12 italic">
                "My mission is to help you feel calm, confident, and completely prepared 
                for the most transformative journey of your life."
              </p>
              <button onClick={() => setActivePage('private')} className="btn-secondary">
                Learn More About My Approach
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 bg-beige/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-serif mb-4 italic text-burgundy">Kind Words</h2>
            <div className="editorial-line max-w-xs mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <p className="text-3xl md:text-4xl font-serif mb-12 leading-tight italic text-ink/80">
                "The best investment we made for our birth. Née didn't just give us facts; 
                she gave us confidence."
              </p>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-burgundy/10 flex items-center justify-center font-serif text-burgundy text-2xl">S</div>
                <div>
                  <p className="text-lg font-serif">Sarah & James</p>
                  <p className="text-xs uppercase tracking-widest text-ink/40">Bolton Parents</p>
                </div>
              </div>
            </motion.div>
            <div className="relative">
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1531983412531-1f49a365ffed?q=80&w=2070&auto=format&fit=crop" 
                  alt="Happy parents" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 glass-card p-10 rounded-3xl max-w-xs">
                <p className="text-burgundy font-serif text-5xl mb-2">100%</p>
                <p className="text-[10px] text-ink/60 font-semibold uppercase tracking-[0.2em]">Client Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const MondayClubPage = ({ setActivePage }: { setActivePage: (p: string) => void }) => {
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-burgundy/60 mb-6 block">
              The Signature Course
            </span>
            <h1 className="text-6xl md:text-8xl font-script text-burgundy mb-8">The Monday Club</h1>
            <div className="editorial-line mb-8" />
            <p className="text-xl text-ink/70 font-light leading-relaxed mb-12">
              Our signature group antenatal course. Held every Monday evening in Bolton, 
              designed to build your knowledge and your community.
            </p>
            
            <div className="space-y-8 mb-16">
              {[
                "4 weeks of expert-led sessions",
                "Capped at 8 couples for intimacy",
                "Full course workbook & resources",
                "Post-birth reunion session",
                "Goody bag with local Bolton treats"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="w-2 h-2 rounded-full bg-burgundy/20 group-hover:bg-burgundy transition-colors" />
                  <span className="text-lg text-ink/80 font-light">{item}</span>
                </div>
              ))}
            </div>

            <button onClick={() => setActivePage('booking')} className="btn-primary">
              Reserve Your Spot — £250
            </button>
          </motion.div>

          <div className="relative">
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop" 
                alt="Group session" 
                className="w-full h-full object-cover grayscale-[10%]"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -top-12 -right-12 bg-burgundy text-white p-12 rounded-full w-48 h-48 flex flex-col items-center justify-center text-center shadow-2xl border-8 border-beige">
              <p className="text-5xl font-serif">8</p>
              <p className="text-[10px] uppercase tracking-[0.2em] font-semibold">Couples Max</p>
            </div>
          </div>
        </div>

        <div className="bg-white/40 backdrop-blur-sm rounded-[4rem] p-16 md:p-24 border border-burgundy/5">
          <h2 className="text-4xl md:text-5xl font-serif mb-20 text-center italic text-burgundy">The Curriculum</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16">
            {[
              { title: "Birth Prep", desc: "Understanding the stages of labor and pain relief options." },
              { title: "Partner Role", desc: "Practical tools for birth partners to feel useful and confident." },
              { title: "Feeding", desc: "Evidence-based support for breastfeeding and bottle feeding." },
              { title: "Newborn Care", desc: "Sleep, bathing, and the first 48 hours at home." }
            ].map((item, i) => (
              <div key={i} className="group">
                <div className="text-burgundy font-serif text-4xl mb-6 opacity-20 group-hover:opacity-100 transition-opacity duration-700">0{i+1}</div>
                <h3 className="text-2xl font-serif mb-4">{item.title}</h3>
                <div className="editorial-line mb-6 w-8 group-hover:w-full transition-all duration-700" />
                <p className="text-ink/60 text-sm leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const PrivateSessionsPage = ({ setActivePage }: { setActivePage: (p: string) => void }) => {
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-32">
          <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-burgundy/60 mb-6 block">
            Bespoke Education
          </span>
          <h1 className="text-6xl md:text-8xl font-script text-burgundy mb-8">Private 1:1 Support</h1>
          <div className="editorial-line max-w-xs mb-8" />
          <p className="text-xl text-ink/70 font-light max-w-3xl leading-relaxed">
            Tailored entirely to your needs, your home, and your schedule. 
            The ultimate premium preparation for your growing family.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 mb-32">
          <div className="lg:col-span-2 bg-white/60 backdrop-blur-sm rounded-[4rem] overflow-hidden border border-burgundy/5 flex flex-col md:flex-row">
            <div className="p-16 md:w-1/2">
              <h2 className="text-4xl font-serif mb-8">Midwife in Your Pocket</h2>
              <p className="text-ink/70 mb-10 leading-relaxed font-light">
                The most loved feature of our private sessions. From the moment you book 
                until 2 weeks post-birth, you have direct WhatsApp access to your educator.
              </p>
              <ul className="space-y-6 mb-12">
                <li className="flex items-center gap-4 text-sm font-medium"><div className="w-1.5 h-1.5 rounded-full bg-burgundy" /> Instant reassurance</li>
                <li className="flex items-center gap-4 text-sm font-medium"><div className="w-1.5 h-1.5 rounded-full bg-burgundy" /> Evidence-based answers</li>
                <li className="flex items-center gap-4 text-sm font-medium"><div className="w-1.5 h-1.5 rounded-full bg-burgundy" /> No Dr. Google anxiety</li>
              </ul>
              <button onClick={() => setActivePage('booking')} className="btn-primary w-full">Book Private Session</button>
            </div>
            <div className="md:w-1/2 bg-burgundy/5 flex items-center justify-center p-16">
              <div className="relative">
                <div className="glass-card p-8 rounded-[2.5rem] shadow-2xl max-w-[300px] relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-burgundy/10" />
                    <div>
                      <p className="text-sm font-bold">Née</p>
                      <p className="text-[10px] text-burgundy uppercase tracking-widest">Active Now</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-beige/80 p-4 rounded-2xl rounded-tl-none text-xs leading-relaxed">
                      "Is it normal to feel this pressure at 34 weeks?"
                    </div>
                    <div className="bg-burgundy text-white p-4 rounded-2xl rounded-tr-none text-xs leading-relaxed ml-8">
                      "Absolutely! It's likely baby engaging. Let's chat through some comfort measures..."
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-burgundy/10 rounded-full blur-3xl" />
              </div>
            </div>
          </div>

          <div className="bg-burgundy text-white rounded-[4rem] p-16 flex flex-col justify-between shadow-2xl">
            <div>
              <h3 className="text-3xl font-serif mb-10 italic">What's Included?</h3>
              <ul className="space-y-10">
                <li className="flex gap-6">
                  <Clock className="text-white/40 shrink-0" strokeWidth={1} />
                  <div>
                    <p className="font-serif text-xl">2 x 3hr Sessions</p>
                    <p className="text-sm text-white/50 font-light mt-1">In the comfort of your home.</p>
                  </div>
                </li>
                <li className="flex gap-6">
                  <MapPin className="text-white/40 shrink-0" strokeWidth={1} />
                  <div>
                    <p className="font-serif text-xl">Bolton & Surrounding</p>
                    <p className="text-sm text-white/50 font-light mt-1">We come to you.</p>
                  </div>
                </li>
                <li className="flex gap-6">
                  <MessageCircle className="text-white/40 shrink-0" strokeWidth={1} />
                  <div>
                    <p className="font-serif text-xl">WhatsApp Support</p>
                    <p className="text-sm text-white/50 font-light mt-1">Unlimited until 2 weeks postpartum.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="mt-20">
              <div className="editorial-line bg-white/20 mb-8" />
              <p className="text-5xl font-serif mb-2">£450</p>
              <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-semibold">Full Bespoke Package</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BookingPortal = () => {
  const [step, setStep] = useState(1);
  const [bookingType, setBookingType] = useState<'group' | 'private' | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    dueDate: '',
    partnerName: '',
    birthChoice: '',
    nervousAbout: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [monzoConnected, setMonzoConnected] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'monzo' | 'bank'>('monzo');

  useEffect(() => {
    const checkMonzoStatus = async () => {
      try {
        const response = await fetch('/api/monzo/status');
        const data = await response.json();
        setMonzoConnected(data.connected);
        if (data.connected) setPaymentMethod('monzo');
      } catch (error) {
        console.error("Failed to check Monzo status:", error);
      }
    };
    checkMonzoStatus();

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'MONZO_AUTH_SUCCESS') {
        setMonzoConnected(true);
        setPaymentMethod('monzo');
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleMonzoConnect = async () => {
    try {
      const response = await fetch('/api/auth/monzo/url');
      const { url } = await response.json();
      window.open(url, 'monzo_auth', 'width=600,height=700');
    } catch (error) {
      console.error("Failed to get Monzo auth URL:", error);
    }
  };
  const [isComplete, setIsComplete] = useState(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate Stripe Payment
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
    }, 2000);
  };

  const isDateAvailable = (date: Date) => {
    if (bookingType === 'group') {
      return MONDAY_DATES.some(d => isSameDay(d, date));
    }
    return date >= startOfToday();
  };

  if (isComplete) {
    return (
      <div className="pt-40 pb-24 px-6 flex flex-col items-center text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-40 h-40 bg-burgundy rounded-full flex items-center justify-center text-white mb-12 shadow-2xl"
        >
          <CheckCircle2 size={80} strokeWidth={1} />
        </motion.div>
        <h1 className="text-7xl font-serif mb-8 italic">You're Booked.</h1>
        <p className="text-xl text-ink/60 max-w-lg mb-12 font-light leading-relaxed">
          Check your inbox for "The Bolton Birth Prep Checklist" and your welcome pack. 
          We can't wait to meet you and support your journey.
        </p>
        <div className="glass-card p-16 rounded-[4rem] max-w-md w-full mb-12 border border-burgundy/10">
          <h3 className="font-serif text-3xl mb-10 italic">Your Countdown</h3>
          <div className="flex justify-center gap-12">
            <div className="text-center">
              <p className="text-6xl font-serif text-burgundy mb-2">124</p>
              <p className="text-[10px] uppercase tracking-[0.4em] text-ink/40 font-bold">Days to Due Date</p>
            </div>
          </div>
        </div>
        <button onClick={() => window.location.reload()} className="btn-secondary px-12 py-5">Return Home</button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white/60 backdrop-blur-xl rounded-[4rem] shadow-2xl overflow-hidden border border-burgundy/5">
          {/* Progress Bar */}
          <div className="h-1.5 bg-burgundy/5">
            <motion.div 
              className="h-full bg-burgundy"
              initial={{ width: '0%' }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.8, ease: "circOut" }}
            />
          </div>

          <div className="p-12 md:p-24">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-6xl font-serif mb-16 text-center italic">Choose Your Path</h2>
                <div className="grid md:grid-cols-2 gap-16">
                  <button 
                    onClick={() => { setBookingType('group'); setStep(2); }}
                    className="p-16 rounded-[4rem] border border-burgundy/10 hover:border-burgundy hover:bg-burgundy/[0.02] transition-all text-left group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Users size={120} strokeWidth={1} />
                    </div>
                    <Users className="text-burgundy mb-10 group-hover:scale-110 transition-transform duration-700" size={56} strokeWidth={1} />
                    <h3 className="text-4xl font-serif mb-6">The Monday Club</h3>
                    <p className="text-ink/60 mb-10 font-light leading-relaxed text-lg">Group sessions for couples. Mondays in Bolton. Build your village.</p>
                    <div className="flex items-center justify-between">
                      <p className="text-burgundy font-serif text-3xl italic">£250</p>
                      <span className="text-[10px] uppercase tracking-widest font-bold text-burgundy/40">Select →</span>
                    </div>
                  </button>
                  <button 
                    onClick={() => { setBookingType('private'); setStep(2); }}
                    className="p-16 rounded-[4rem] border border-burgundy/10 hover:border-burgundy hover:bg-burgundy/[0.02] transition-all text-left group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Heart size={120} strokeWidth={1} />
                    </div>
                    <Heart className="text-burgundy mb-10 group-hover:scale-110 transition-transform duration-700" size={56} strokeWidth={1} />
                    <h3 className="text-4xl font-serif mb-6">Private 1:1s</h3>
                    <p className="text-ink/60 mb-10 font-light leading-relaxed text-lg">Bespoke support in your own home. Tailored entirely to you.</p>
                    <div className="flex items-center justify-between">
                      <p className="text-burgundy font-serif text-3xl italic">£450</p>
                      <span className="text-[10px] uppercase tracking-widest font-bold text-burgundy/40">Select →</span>
                    </div>
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-6xl font-serif mb-16 text-center italic">Select Your Date</h2>
                <div className="flex flex-col lg:flex-row gap-24 items-start justify-center">
                  <div className="glass-card p-12 rounded-[4rem] shadow-2xl border border-burgundy/5">
                    <DayPicker
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => !isDateAvailable(date)}
                      modifiers={{
                        available: (date) => isDateAvailable(date)
                      }}
                      modifiersClassNames={{
                        available: "text-burgundy font-bold"
                      }}
                    />
                  </div>
                  <div className="flex-1 w-full">
                    {bookingType === 'group' ? (
                      <div className="bg-burgundy/[0.03] p-16 rounded-[4rem] border border-burgundy/5">
                        <h3 className="font-serif text-3xl mb-8 italic">Group Session Info</h3>
                        <p className="text-ink/70 mb-10 font-light leading-relaxed text-lg">
                          Monday evenings, 7:00 PM - 9:00 PM. <br />
                          Location: The Wellness Studio, Bolton.
                        </p>
                        <div className="flex items-center gap-6 text-burgundy font-serif text-2xl mb-16">
                          <Users size={32} strokeWidth={1} />
                          <span>3 / 8 Couples Booked</span>
                        </div>
                        <button 
                          disabled={!selectedDate}
                          onClick={() => setStep(3)}
                          className="btn-primary w-full py-6 disabled:opacity-30"
                        >
                          Continue to Details
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-8">
                        <h3 className="font-serif text-3xl mb-10 italic">Select a 2-hour window</h3>
                        <div className="grid grid-cols-1 gap-5">
                          {PRIVATE_SLOTS.map((slot) => (
                            <button
                              key={slot}
                              onClick={() => setSelectedTime(slot)}
                              className={cn(
                                "p-8 rounded-3xl border transition-all duration-700 text-base font-medium tracking-wide",
                                selectedTime === slot ? "bg-burgundy text-white border-burgundy shadow-2xl scale-[1.02]" : "bg-white border-burgundy/10 hover:border-burgundy"
                              )}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                        <button 
                          disabled={!selectedDate || !selectedTime}
                          onClick={() => setStep(3)}
                          className="btn-primary w-full mt-16 py-6 disabled:opacity-30"
                        >
                          Continue to Details
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <button onClick={() => setStep(1)} className="mt-16 text-[10px] uppercase tracking-[0.3em] text-ink/30 hover:text-burgundy transition-colors font-bold">← Back to selection</button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-6xl font-serif mb-16 text-center italic">A Little About You</h2>
                <form className="space-y-12 max-w-xl mx-auto">
                  <div className="group">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.4em] text-ink/30 mb-6 group-focus-within:text-burgundy transition-colors">Estimated Due Date</label>
                    <input 
                      type="date" 
                      required
                      className="w-full p-8 rounded-3xl bg-burgundy/[0.03] border border-transparent focus:border-burgundy/20 focus:bg-white transition-all outline-none font-light text-lg"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                    />
                  </div>
                  <div className="group">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.4em] text-ink/30 mb-6 group-focus-within:text-burgundy transition-colors">Birth Partner's Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. James"
                      className="w-full p-8 rounded-3xl bg-burgundy/[0.03] border border-transparent focus:border-burgundy/20 focus:bg-white transition-all outline-none font-light text-lg"
                      value={formData.partnerName}
                      onChange={(e) => setFormData({...formData, partnerName: e.target.value})}
                    />
                  </div>
                  <div className="group">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.4em] text-ink/30 mb-6 group-focus-within:text-burgundy transition-colors">Hospital or Home Choice?</label>
                    <select 
                      className="w-full p-8 rounded-3xl bg-burgundy/[0.03] border border-transparent focus:border-burgundy/20 focus:bg-white transition-all outline-none font-light text-lg appearance-none"
                      value={formData.birthChoice}
                      onChange={(e) => setFormData({...formData, birthChoice: e.target.value})}
                    >
                      <option value="">Select an option</option>
                      <option value="hospital">Hospital</option>
                      <option value="home">Home</option>
                      <option value="undecided">Undecided</option>
                    </select>
                  </div>
                  <div className="group">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.4em] text-ink/30 mb-6 group-focus-within:text-burgundy transition-colors">One thing you're nervous about?</label>
                    <textarea 
                      placeholder="e.g. Pain management, breastfeeding..."
                      className="w-full p-8 rounded-3xl bg-burgundy/[0.03] border border-transparent focus:border-burgundy/20 focus:bg-white transition-all outline-none font-light text-lg min-h-[150px] resize-none"
                      value={formData.nervousAbout}
                      onChange={(e) => setFormData({...formData, nervousAbout: e.target.value})}
                    />
                  </div>
                  <div className="flex flex-col gap-8 pt-8">
                    <button 
                      type="button"
                      onClick={() => setStep(4)}
                      className="btn-primary w-full py-6"
                    >
                      Continue to Secure Checkout
                    </button>
                    <button onClick={() => setStep(2)} className="text-[10px] uppercase tracking-[0.3em] text-ink/30 hover:text-burgundy transition-colors font-bold">← Back to date selection</button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-6xl font-serif mb-16 text-center italic">Secure Checkout</h2>
                <div className="max-xl mx-auto">
                  <div className="bg-burgundy/[0.03] p-16 rounded-[4rem] mb-16 border border-burgundy/5">
                    <div className="flex justify-between items-center mb-10">
                      <p className="font-serif text-3xl">{bookingType === 'group' ? 'The Monday Club' : 'Private 1:1 Session'}</p>
                      <p className="font-serif text-3xl">£{bookingType === 'group' ? '250' : '450'}</p>
                    </div>
                    <div className="editorial-line bg-burgundy/10 mb-10" />
                    <div className="space-y-4 mb-10">
                      <div className="flex justify-between text-sm text-ink/60">
                        <span>Date</span>
                        <span>{selectedDate?.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>
                      {selectedTime && (
                        <div className="flex justify-between text-sm text-ink/60">
                          <span>Time</span>
                          <span>{selectedTime}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between items-center pt-8 border-t border-burgundy/10">
                      <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-ink/40">Total Due Today</p>
                      <p className="text-5xl font-serif text-burgundy">£{bookingType === 'group' ? '250' : '450'}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 mb-12">
                    <button 
                      onClick={() => setPaymentMethod('monzo')}
                      className={cn(
                        "flex-1 p-8 rounded-[2rem] border transition-all flex flex-col items-center gap-4",
                        paymentMethod === 'monzo' ? "bg-burgundy text-white border-burgundy" : "bg-white text-ink/40 border-burgundy/10 hover:border-burgundy/30"
                      )}
                    >
                      <Wallet size={32} />
                      <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Monzo</span>
                    </button>
                    <button 
                      onClick={() => setPaymentMethod('card')}
                      className={cn(
                        "flex-1 p-8 rounded-[2rem] border transition-all flex flex-col items-center gap-4",
                        paymentMethod === 'card' ? "bg-burgundy text-white border-burgundy" : "bg-white text-ink/40 border-burgundy/10 hover:border-burgundy/30"
                      )}
                    >
                      <CreditCard size={32} />
                      <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Card</span>
                    </button>
                    <button 
                      onClick={() => setPaymentMethod('bank')}
                      className={cn(
                        "flex-1 p-8 rounded-[2rem] border transition-all flex flex-col items-center gap-4",
                        paymentMethod === 'bank' ? "bg-burgundy text-white border-burgundy" : "bg-white text-ink/40 border-burgundy/10 hover:border-burgundy/30"
                      )}
                    >
                      <Building2 size={32} />
                      <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Bank</span>
                    </button>
                  </div>

                  <form onSubmit={handleBooking} className="space-y-10">
                    {paymentMethod === 'monzo' && (
                      <div className="bg-burgundy/[0.03] p-12 rounded-[3rem] border border-burgundy/10 text-center">
                        {monzoConnected ? (
                          <div className="space-y-6">
                            <div className="w-20 h-20 bg-burgundy/10 rounded-full flex items-center justify-center mx-auto">
                              <CheckCircle2 className="text-burgundy" size={40} />
                            </div>
                            <p className="font-serif text-2xl italic">Monzo Connected</p>
                            <p className="text-sm text-ink/50">Your payment will be processed via your Monzo app.</p>
                          </div>
                        ) : (
                          <div className="space-y-8">
                            <p className="font-serif text-2xl italic">Connect your Monzo account</p>
                            <p className="text-sm text-ink/50">Skip the card details and pay securely with your Monzo app.</p>
                            <button 
                              type="button"
                              onClick={handleMonzoConnect}
                              className="bg-burgundy text-white px-10 py-4 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-burgundy/90 transition-all"
                            >
                              Connect Monzo
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {paymentMethod === 'card' && (
                      <>
                        <div className="group">
                          <label className="block text-[10px] font-bold uppercase tracking-[0.4em] text-ink/30 mb-6 group-focus-within:text-burgundy transition-colors">Card Details</label>
                          <div className="w-full p-8 rounded-3xl bg-burgundy/[0.03] border border-transparent focus-within:border-burgundy/20 focus-within:bg-white transition-all flex items-center gap-6">
                            <CreditCard className="text-burgundy/30" size={24} />
                            <input 
                              type="text" 
                              placeholder="4242 4242 4242 4242"
                              className="bg-transparent border-none outline-none w-full font-light text-lg"
                              required
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                          <div className="group">
                            <label className="block text-[10px] font-bold uppercase tracking-[0.4em] text-ink/30 mb-6 group-focus-within:text-burgundy transition-colors">Expiry</label>
                            <input 
                              type="text" 
                              placeholder="MM/YY"
                              className="w-full p-8 rounded-3xl bg-burgundy/[0.03] border border-transparent focus:border-burgundy/20 focus:bg-white transition-all outline-none font-light text-lg"
                              required
                            />
                          </div>
                          <div className="group">
                            <label className="block text-[10px] font-bold uppercase tracking-[0.4em] text-ink/30 mb-6 group-focus-within:text-burgundy transition-colors">CVC</label>
                            <input 
                              type="text" 
                              placeholder="123"
                              className="w-full p-8 rounded-3xl bg-burgundy/[0.03] border border-transparent focus:border-burgundy/20 focus:bg-white transition-all outline-none font-light text-lg"
                              required
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {paymentMethod === 'bank' && (
                      <div className="bg-burgundy/[0.03] p-12 rounded-[3rem] border border-burgundy/10">
                        <div className="space-y-8">
                          <div className="text-center mb-8">
                            <p className="font-serif text-2xl italic mb-2">Direct Bank Transfer</p>
                            <p className="text-sm text-ink/50">Please use the details below to complete your booking.</p>
                          </div>
                          <div className="space-y-6">
                            <div className="flex justify-between items-center py-4 border-b border-burgundy/5">
                              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-ink/30">Account Name</span>
                              <span className="font-serif text-lg">Née & Nurture Ltd</span>
                            </div>
                            <div className="flex justify-between items-center py-4 border-b border-burgundy/5">
                              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-ink/30">Sort Code</span>
                              <span className="font-mono text-lg tracking-widest">04-00-04</span>
                            </div>
                            <div className="flex justify-between items-center py-4 border-b border-burgundy/5">
                              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-ink/30">Account Number</span>
                              <span className="font-mono text-lg tracking-widest">12345678</span>
                            </div>
                            <div className="flex justify-between items-center py-4">
                              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-ink/30">Reference</span>
                              <span className="font-mono text-lg tracking-widest uppercase">NEE-{Math.random().toString(36).substring(7).toUpperCase()}</span>
                            </div>
                          </div>
                          <p className="text-[10px] text-center text-ink/30 italic mt-8">Your booking will be confirmed once the transfer is received.</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-col gap-8 pt-8">
                      <button 
                        type="submit"
                        disabled={isProcessing || (paymentMethod === 'monzo' && !monzoConnected)}
                        className="btn-primary w-full py-6 flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isProcessing ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <Lock size={18} />
                            <span>{paymentMethod === 'bank' ? 'I Have Made the Transfer' : `Confirm & Pay £${bookingType === 'group' ? '250' : '450'}`}</span>
                          </>
                        )}
                      </button>
                      <button type="button" onClick={() => setStep(3)} className="text-[10px] uppercase tracking-[0.3em] text-ink/30 hover:text-burgundy transition-colors font-bold">← Back to details</button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-ink text-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16">
          <div className="md:col-span-2">
            <h2 className="text-5xl font-display italic mb-4 text-burgundy">Née <span className="text-burgundy-light">&</span> Nurture</h2>
            <p className="text-[10px] uppercase tracking-[0.4em] text-burgundy-light font-bold mb-8">The Birth & Baby Co.</p>
            <p className="text-white/60 max-w-sm mb-12 leading-relaxed font-light">
              Empowering Bolton parents with evidence-based antenatal education 
              delivered with empathy and professional expertise.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-white/40 hover:text-burgundy transition-colors"><Instagram size={24} strokeWidth={1.5} /></a>
              <a href="#" className="text-white/40 hover:text-burgundy transition-colors"><Facebook size={24} strokeWidth={1.5} /></a>
            </div>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-burgundy mb-8">Contact</h4>
            <ul className="space-y-6 text-sm text-white/50 font-light">
              <li className="flex items-center gap-4"><Mail size={18} strokeWidth={1} /> hello@neeandnurture.co.uk</li>
              <li className="flex items-center gap-4"><Phone size={18} strokeWidth={1} /> 07700 900 123</li>
              <li className="flex items-center gap-4"><MapPin size={18} strokeWidth={1} /> Bolton, Greater Manchester</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-burgundy mb-8">Legal</h4>
            <ul className="space-y-6 text-sm text-white/50 font-light">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 text-center text-[9px] uppercase tracking-[0.5em] text-white/20">
          © 2026 Née & Nurture • The Birth & Baby Co. • Bolton
        </div>
  </footer>
);

export default function App() {
  const [activePage, setActivePage] = useState('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {activePage === 'home' && <HomePage setActivePage={setActivePage} />}
            {activePage === 'monday-club' && <MondayClubPage setActivePage={setActivePage} />}
            {activePage === 'private' && <PrivateSessionsPage setActivePage={setActivePage} />}
            {activePage === 'booking' && <BookingPortal />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
