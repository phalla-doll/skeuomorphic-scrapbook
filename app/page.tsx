'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, MapPin, Star, Edit3, Image as ImageIcon, Send, Music2 } from 'lucide-react';

/* -------------------------------------
   Component: Washi Tape Element 
-------------------------------------- */
const WashiTape = ({ className, color = "bg-white/40" }: { className?: string, color?: string }) => (
  <div 
    className={`absolute shadow-sm backdrop-blur-sm z-20 ${color} ${className}`}
    style={{ 
      clipPath: 'polygon(2% 0, 98% 3%, 100% 98%, 0 95%)',
      width: '80px',
      height: '24px'
    }} 
  />
);

/* -------------------------------------
   Component: Paper Card (Base layer)
-------------------------------------- */
const PaperCard = ({ children, className = "", rotation = 0 }: any) => {
  return (
    <motion.div
      drag
      dragMomentum={false}
      whileDrag={{ scale: 1.03, rotate: 0, zIndex: 50, cursor: 'grabbing' }}
      whileHover={{ y: -2 }}
      initial={{ rotate: rotation }}
      className={`bg-brand-cream bg-paper-texture border border-brand-beige/30 shadow-paper text-brand-charcoal rounded-xl relative cursor-grab transition-shadow hover:shadow-lifted ${className}`}
    >
      {children}
    </motion.div>
  );
};

/* -------------------------------------
   Component: Sticky Note
-------------------------------------- */
const StickyNote = ({ children, className = "", rotation = 0 }: any) => {
  return (
    <motion.div
      drag
      dragMomentum={false}
      whileDrag={{ scale: 1.05, rotate: 0, zIndex: 60, cursor: 'grabbing', boxShadow: '10px 20px 30px rgba(176, 137, 104, 0.3)' }}
      initial={{ rotate: rotation }}
      className={`bg-brand-yellow shadow-paper text-brand-charcoal p-5 pb-6 relative cursor-grab flex flex-col justify-between ${className}`}
      style={{ borderRadius: '2px 16px 4px 24px' }}
    >
      {/* Small top shadow illusion for peeling off */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-black/5 blur-[4px] rounded-t-full -z-10 transform -translate-y-2" />
      {children}
    </motion.div>
  );
};

/* -------------------------------------
   Component: Photo Frame
-------------------------------------- */
const PhotoFrame = ({ src, alt, caption, rotation = 0, className = "" }: any) => {
  return (
    <motion.div
      drag
      dragMomentum={false}
      whileDrag={{ scale: 1.04, rotate: 0, zIndex: 55, cursor: 'grabbing' }}
      initial={{ rotate: rotation }}
      className={`bg-white p-3 pb-8 shadow-paper relative cursor-grab ${className}`}
      style={{ borderRadius: '4px' }}
    >
      <WashiTape className="top-[-10px] left-1/2 transform -translate-x-1/2 rotate-[-5deg] bg-brand-orange/40" />
      <div className="w-full h-full relative overflow-hidden saturate-100 contrast-[1.05] shadow-inner bg-brand-beige">
         <img src={src} alt={alt} className="w-full h-auto object-cover border border-brand-cream/50 pointer-events-none" />
      </div>
      {caption && (
        <p className="font-hand text-lg mt-3 text-center text-brand-charcoal opacity-90">{caption}</p>
      )}
    </motion.div>
  );
};

/* -------------------------------------
   Component: Skeuomorphic Button
-------------------------------------- */
const ScrapButton = ({ children, onClick, className = "", icon: Icon }: any) => {
  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ 
        y: 2, 
        scale: 0.98, 
        boxShadow: 'inset 2px 2px 4px rgba(176, 137, 104, 0.4), inset -2px -2px 4px rgba(255, 255, 255, 0.4)' 
      }}
      className={`flex items-center gap-2 px-5 py-2.5 bg-brand-cream text-brand-charcoal font-medium rounded-full shadow-bevel border-t border-l border-white/60 transition-colors hover:bg-white ${className}`}
      onClick={onClick}
    >
      {Icon && <Icon size={18} className="text-brand-orange" />}
      {children}
    </motion.button>
  );
};

/* -------------------------------------
   Component: Inset Input
-------------------------------------- */
const ScrapInput = ({ placeholder, className = "" }: any) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={`bg-brand-cream/40 shadow-inset-paper border border-transparent rounded-lg px-4 py-3 text-brand-charcoal placeholder:text-brand-brown/70 focus:outline-none focus:border-brand-brown/30 focus:bg-brand-cream/80 transition-all ${className}`}
    />
  );
};

/* -------------------------------------
   Component: Sticker
-------------------------------------- */
const Sticker = ({ icon: Icon, colorClass, rotation = 0, className = "", label }: any) => {
  return (
    <motion.div
      whileHover={{ scale: 1.15, rotate: rotation + 10 }}
      whileDrag={{ scale: 1.2, zIndex: 70 }}
      initial={{ rotate: rotation }}
      drag
      dragMomentum={false}
      className={`absolute inline-flex flex-col items-center justify-center cursor-grab ${className}`}
    >
      <div className={`p-3 rounded-full shadow-paper border-2 border-white bg-white`}>
        <div className={`p-2 rounded-full ${colorClass} text-white shadow-inner`}>
          <Icon size={20} strokeWidth={2.5} />
        </div>
      </div>
      {label && (
         <span className="font-hand mt-1 py-0.5 px-2 bg-white/80 backdrop-blur-sm rounded text-xs text-brand-charcoal font-bold shadow-sm whitespace-nowrap rotate-[-3deg]">
           {label}
         </span>
      )}
    </motion.div>
  );
};

/* -------------------------------------
   Main Layout Container
-------------------------------------- */
export default function ScrapbookWorkspace() {
  return (
    <div className="min-h-screen bg-brand-cream bg-paper-texture p-6 sm:p-12 overflow-hidden relative selection:bg-brand-yellow/50">
       
       <div className="max-w-6xl mx-auto w-full relative min-h-[85vh]">
          {/* Header Title (Draggable) */}
          <motion.div 
            drag dragMomentum={false} 
            initial={{ rotate: -2 }}
            className="inline-block mb-12 relative cursor-grab z-30"
          >
             <h1 className="font-hand text-5xl md:text-6xl text-brand-charcoal drop-shadow-sm font-bold relative pr-8">
                My Scrapbook Workspace
                <Sparkles size={24} className="absolute -top-3 -right-6 text-brand-yellow fill-brand-yellow" />
             </h1>
             <WashiTape className="top-[-12px] left-[-20px] bg-brand-beige/50 rotate-[4deg]" />
          </motion.div>

          {/* Grid/Flex Layout for initial positions, but absolute freedom after */}
          <div className="flex flex-col md:flex-row flex-wrap gap-8 md:gap-14 relative w-full items-start justify-center">

             {/* First Sticky Note */}
             <StickyNote rotation={3} className="w-full max-w-[280px] z-20 mt-4">
                 <WashiTape className="top-[-10px] left-[50%] transform -translate-x-1/2 rotate-[2deg] bg-red-200/40" />
                 <h3 className="font-hand text-2xl font-bold mb-4 flex items-center gap-2">
                   <Edit3 size={20} className="text-brand-orange" />
                   To-Do List
                 </h3>
                 <ul className="space-y-3 font-sans text-sm text-brand-charcoal/90">
                    <li className="flex items-start gap-2">
                       <span className="w-4 h-4 rounded-sm border border-brand-brown/50 mt-0.5 shadow-inset-paper bg-brand-cream/50 flex-shrink-0" />
                       Find travel inspiration
                    </li>
                    <li className="flex items-start gap-2">
                       <span className="w-4 h-4 rounded-sm border border-brand-brown/50 mt-0.5 shadow-inset-paper bg-brand-cream/50 flex-shrink-0" />
                       Book flights to Kyoto
                    </li>
                    <li className="flex items-start gap-2">
                       <span className="w-4 h-4 rounded-sm border border-brand-orange bg-brand-orange flex items-center justify-center text-white mt-0.5 flex-shrink-0">
                         ✓
                       </span>
                       <span className="line-through opacity-60">Design the scrapbook UI</span>
                    </li>
                 </ul>
                 <p className="mt-8 font-hand text-xs text-brand-brown w-full text-right opacity-80">Don't forget!</p>
             </StickyNote>

             {/* Main Project Card */}
             <PaperCard rotation={-1} className="w-full max-w-[420px] z-10 p-8 pt-10">
                <WashiTape className="top-[-10px] left-[10px] bg-brand-yellow/60 rotate-[-12deg]" />
                <WashiTape className="top-[-8px] right-[20px] bg-brand-yellow/60 rotate-[8deg]" />
                
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 font-hand">
                  Project: Sunburst
                </h2>
                <p className="text-brand-text mb-6 leading-relaxed">
                  Exploring a tactile, warm interface design. The goal is to make digital tools feel physical and welcoming again. No more sterile dashboards!
                </p>

                <div className="flex flex-col gap-4">
                   <ScrapInput placeholder="Add a new thought..." />
                   <div className="flex justify-end gap-3 mt-2 flex-wrap">
                      <ScrapButton icon={ImageIcon}>Add Media</ScrapButton>
                      <ScrapButton icon={Send} className="bg-brand-yellow/80 border-none">Publish</ScrapButton>
                   </div>
                </div>
             </PaperCard>

             {/* Photo Frame */}
             <div className="relative mt-8 md:mt-0 z-20">
               <PhotoFrame 
                 src="https://picsum.photos/id/1018/400/300" 
                 alt="Nature landscape"
                 caption="Golden Hour Vibesss ✨"
                 rotation={4}
                 className="w-full max-w-[320px]"
               />
               
               <Sticker 
                 icon={Star} 
                 colorClass="bg-brand-orange" 
                 label="Favorite" 
                 rotation={-15} 
                 className="-right-4 -bottom-4 z-40" 
               />
             </div>

          </div>

          {/* Bottom Row */}
          <div className="flex flex-col md:flex-row flex-wrap gap-12 mt-16 md:mt-24 relative w-full items-start justify-center">
             
             {/* Music Player Card */}
             <PaperCard rotation={-2} className="w-full max-w-[340px] z-30 p-6 flex flex-row items-center gap-5">
                 <div className="w-16 h-16 rounded-full bg-brand-charcoal shadow-inner border-[4px] border-brand-cream flex items-center justify-center relative overflow-hidden group flex-shrink-0">
                   <div className="w-4 h-4 rounded-full bg-brand-cream z-10 border border-brand-brown/20" />
                   <div className="absolute inset-0 bg-[repeating-radial-gradient(circle_at_center,transparent_0,transparent_3px,rgba(255,255,255,0.05)_3px,rgba(255,255,255,0.05)_4px)]" />
                 </div>
                 <div className="flex-1">
                    <h4 className="font-bold text-sm">Currently playing</h4>
                    <p className="text-brand-brown text-xs font-hand mt-1">Lofi Chill Beats</p>
                    <div className="w-full h-1.5 bg-brand-beige/50 mt-3 rounded-full overflow-hidden shadow-inset-paper">
                       <div className="h-full bg-brand-orange w-2/3" />
                    </div>
                 </div>
                 <Sticker 
                   icon={Music2} 
                   colorClass="bg-red-400" 
                   rotation={10} 
                   className="-top-8 -right-4 z-40" 
                 />
             </PaperCard>

             {/* Small Insight Card */}
             <PaperCard rotation={5} className="w-full max-w-[320px] z-10 flex flex-col justify-center items-center text-center p-8 bg-brand-beige/20 backdrop-blur-sm border-dashed border-2 border-brand-beige/80">
                <MapPin size={32} className="text-brand-brown mb-3 opacity-60" />
                <p className="font-hand text-xl text-brand-brown leading-relaxed">"Let's get out there and explore the world."</p>
             </PaperCard>
          </div>

       </div>

       {/* Floating Background Doodles / Textures */}
       <div className="absolute top-[20%] left-[5%] opacity-[0.08] pointer-events-none">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
       </div>
    </div>
  );
}
