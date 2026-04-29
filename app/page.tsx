'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MapPin, Star, Edit3, Image as ImageIcon, Send, Music2, Plus, Type, CheckSquare, Search, FileText, Settings, X } from 'lucide-react';

/* -------------------------------------
   Component: Washi Tape Element 
-------------------------------------- */
const WashiTape = ({ className, color = "bg-white/40" }: { className?: string, color?: string }) => (
  <div 
    className={`absolute shadow-sm backdrop-blur-sm z-20 pointer-events-none ${color} ${className}`}
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
const PaperCard = ({ children, className = "", rotation = 0, style = {} }: any) => {
  return (
    <motion.div
      drag
      dragMomentum={false}
      whileDrag={{ scale: 1.03, zIndex: 50, cursor: 'grabbing' }}
      whileHover={{ y: -2 }}
      initial={{ rotate: rotation, scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`bg-brand-cream bg-paper-texture border border-brand-beige/30 shadow-paper text-brand-charcoal rounded-xl absolute cursor-grab transition-shadow hover:shadow-lifted ${className}`}
      style={style}
    >
      {children}
    </motion.div>
  );
};

/* -------------------------------------
   Component: Sticky Note
-------------------------------------- */
const StickyNote = ({ children, className = "", rotation = 0, style = {} }: any) => {
  return (
    <motion.div
      drag
      dragMomentum={false}
      whileDrag={{ scale: 1.05, zIndex: 60, cursor: 'grabbing', boxShadow: '10px 20px 30px rgba(176, 137, 104, 0.3)' }}
      initial={{ rotate: rotation, scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`bg-brand-yellow shadow-paper text-brand-charcoal p-5 pb-6 absolute cursor-grab flex flex-col justify-between ${className}`}
      style={{ borderRadius: '2px 16px 4px 24px', ...style }}
    >
      {/* Small top shadow illusion for peeling off */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-black/5 blur-[4px] rounded-t-full -z-10 transform -translate-y-2 pointer-events-none" />
      {children}
    </motion.div>
  );
};

/* -------------------------------------
   Component: Photo Frame
-------------------------------------- */
const PhotoFrame = ({ src, alt, caption, rotation = 0, className = "", style = {} }: any) => {
  return (
    <motion.div
      drag
      dragMomentum={false}
      whileDrag={{ scale: 1.04, zIndex: 55, cursor: 'grabbing' }}
      initial={{ rotate: rotation, scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`bg-white p-3 pb-8 shadow-paper absolute cursor-grab ${className}`}
      style={{ borderRadius: '4px', ...style }}
    >
      <WashiTape className="top-[-10px] left-1/2 transform -translate-x-1/2 rotate-[-5deg] bg-brand-orange/40" />
      <div className="w-full h-full relative overflow-hidden saturate-100 contrast-[1.05] shadow-inner bg-brand-beige pointer-events-none">
         <img src={src} alt={alt} className="w-full h-auto object-cover border border-brand-cream/50 pointer-events-none" />
      </div>
      {caption && (
        <p className="font-hand text-lg mt-3 text-center text-brand-charcoal opacity-90 pointer-events-none">{caption}</p>
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
      onPointerDown={(e) => e.stopPropagation()} // Prevent dragging when typing
    />
  );
};

/* -------------------------------------
   Component: Sticker
-------------------------------------- */
const Sticker = ({ icon: Icon, colorClass, rotation = 0, className = "", label, style = {} }: any) => {
  return (
    <motion.div
      whileHover={{ scale: 1.15, rotate: rotation + 10 }}
      whileDrag={{ scale: 1.2, zIndex: 70 }}
      initial={{ rotate: rotation, scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      drag
      dragMomentum={false}
      className={`absolute inline-flex flex-col items-center justify-center cursor-grab ${className}`}
      style={style}
    >
      <div className={`p-3 rounded-full shadow-paper border-2 border-white bg-white pointer-events-none`}>
        <div className={`p-2 rounded-full ${colorClass} text-white shadow-inner pointer-events-none`}>
          <Icon size={20} strokeWidth={2.5} />
        </div>
      </div>
      {label && (
         <span className="font-hand mt-1 py-0.5 px-2 bg-white/80 backdrop-blur-sm rounded text-xs text-brand-charcoal font-bold shadow-sm whitespace-nowrap rotate-[-3deg] pointer-events-none">
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
  const [elements, setElements] = useState<any[]>([
    {
      id: 'header',
      type: 'header',
      x: 50,
      y: 50,
      rotation: -2,
    },
    {
      id: 'todo',
      type: 'todo',
      x: 100,
      y: 200,
      rotation: 3,
    },
    {
      id: 'project',
      type: 'project',
      x: 420,
      y: 160,
      rotation: -1,
    },
    {
      id: 'photo',
      type: 'photo',
      x: 880,
      y: 240,
      rotation: 4,
    },
    {
      id: 'sticker-fav',
      type: 'sticker',
      icon: Star,
      colorClass: 'bg-brand-orange',
      label: 'Favorite',
      x: 1100,
      y: 480,
      rotation: -15,
    },
    {
      id: 'music',
      type: 'music',
      x: 150,
      y: 550,
      rotation: -2,
    },
    {
      id: 'insight',
      type: 'insight',
      x: 600,
      y: 600,
      rotation: 5,
    }
  ]);

  const addElement = (type: string, props: any = {}) => {
    // Drop it somewhat centrally with a random offset
    const randomX = window.innerWidth / 2 - 150 + (Math.random() * 100 - 50);
    const randomY = window.innerHeight / 2 - 150 + (Math.random() * 100 - 50);
    const randomRot = Math.random() * 8 - 4; // -4 to +4 degrees
    
    setElements([...elements, {
      id: `${type}-${Date.now()}`,
      type,
      x: randomX,
      y: randomY,
      rotation: randomRot,
      ...props
    }]);
  };

  const removeElement = (id: string) => {
    setElements(elements.filter(el => el.id !== id));
  };

  return (
    <div className="h-screen w-full bg-brand-cream bg-paper-texture overflow-hidden relative selection:bg-brand-yellow/50 flex flex-col font-sans">
       
       {/* Top Navigation Bar / Breadcrumbs */}
       <div className="h-14 border-b border-brand-brown/10 bg-brand-cream/80 backdrop-blur flex items-center justify-between px-6 z-40 shadow-sm shrink-0">
          <div className="flex items-center gap-2 text-sm text-brand-text font-medium">
             <span className="w-3 h-3 rounded-full bg-red-400 shadow-inner mr-2"></span>
             <span className="w-3 h-3 rounded-full bg-brand-yellow shadow-inner mr-2"></span>
             <span className="w-3 h-3 rounded-full bg-green-400 shadow-inner mr-4"></span>
             
             <FileText size={16} className="text-brand-brown/70 ml-2" />
             <span>Scrapbook OS</span>
             <span className="text-brand-brown/40">›</span>
             <span className="text-brand-charcoal">Mood Board</span>
          </div>
          <div className="flex items-center gap-4">
             <button className="px-4 py-1.5 bg-white shadow-paper rounded text-xs font-bold text-brand-text hover:bg-brand-cream transition-colors">
               Share
             </button>
             <button className="p-1.5 rounded hover:bg-brand-brown/10 text-brand-text">
               <Settings size={18} />
             </button>
          </div>
       </div>

       {/* Workspace Area */}
       <div className="flex-1 relative w-full h-full">

          <AnimatePresence>
            {elements.map((el) => {
              if (el.type === 'header') {
                return (
                  <motion.div 
                    key={el.id}
                    drag dragMomentum={false} 
                    initial={{ rotate: el.rotation }}
                    className="absolute cursor-grab z-30"
                    style={{ left: el.x, top: el.y }}
                  >
                     <h1 className="font-hand text-5xl md:text-6xl text-brand-charcoal drop-shadow-sm font-bold relative pr-8 pointer-events-none">
                        My Scrapbook Workspace
                        <Sparkles size={24} className="absolute -top-3 -right-6 text-brand-yellow fill-brand-yellow" />
                     </h1>
                     <WashiTape className="top-[-12px] left-[-20px] bg-brand-beige/50 rotate-[4deg]" />
                  </motion.div>
                );
              }
              
              if (el.type === 'todo') {
                 return (
                   <StickyNote key={el.id} rotation={el.rotation} style={{ left: el.x, top: el.y, width: 280 }} className="z-20 group">
                       <button onClick={() => removeElement(el.id)} className="absolute -top-3 -right-3 p-1 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-50 text-brand-brown hover:text-red-500">
                         <X size={14} />
                       </button>
                       <WashiTape className="top-[-10px] left-[50%] transform -translate-x-1/2 rotate-[2deg] bg-red-200/40" />
                       <h3 className="font-hand text-2xl font-bold mb-4 flex items-center gap-2 pointer-events-none">
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
                             <span className="line-through opacity-60">Design the UI</span>
                          </li>
                       </ul>
                   </StickyNote>
                 );
              }

              if (el.type === 'project') {
                 return (
                   <PaperCard key={el.id} rotation={el.rotation} className="z-10 p-8 pt-10 group" style={{ left: el.x, top: el.y, width: 420 }}>
                      <button onClick={() => removeElement(el.id)} className="absolute -top-3 -right-3 p-1 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-50 text-brand-brown hover:text-red-500">
                         <X size={14} />
                       </button>
                      <WashiTape className="top-[-10px] left-[10px] bg-brand-yellow/60 rotate-[-12deg]" />
                      <WashiTape className="top-[-8px] right-[20px] bg-brand-yellow/60 rotate-[8deg]" />
                      <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 font-hand pointer-events-none">
                        Project: Sunburst
                      </h2>
                      <p className="text-brand-text mb-6 leading-relaxed pointer-events-none">
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
                 );
              }

              if (el.type === 'photo') {
                 return (
                   <div key={el.id} className="absolute z-20 group" style={{ left: el.x, top: el.y }}>
                     <button onClick={() => removeElement(el.id)} className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-50 text-brand-brown hover:text-red-500">
                         <X size={14} />
                     </button>
                     <PhotoFrame 
                       src={el.src || "https://picsum.photos/id/1018/400/300"}
                       alt="Landscape"
                       caption={el.caption || "Golden Hour Vibesss ✨"}
                       rotation={el.rotation}
                       style={{ width: 320 }}
                     />
                   </div>
                 );
              }

              if (el.type === 'sticker') {
                 return (
                   <div key={el.id} className="group relative">
                      <Sticker 
                        icon={el.icon || Star} 
                        colorClass={el.colorClass || "bg-brand-orange"} 
                        label={el.label} 
                        rotation={el.rotation} 
                        style={{ left: el.x, top: el.y }}
                      />
                   </div>
                 );
              }

              if (el.type === 'music') {
                 return (
                   <PaperCard key={el.id} rotation={el.rotation} className="z-30 p-6 flex flex-row items-center gap-5 group" style={{ left: el.x, top: el.y, width: 340 }}>
                       <button onClick={() => removeElement(el.id)} className="absolute -top-3 -right-3 p-1 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-50 text-brand-brown hover:text-red-500">
                         <X size={14} />
                       </button>
                       <div className="w-16 h-16 rounded-full bg-brand-charcoal shadow-inner border-[4px] border-brand-cream flex items-center justify-center relative overflow-hidden flex-shrink-0 pointer-events-none">
                         <div className="w-4 h-4 rounded-full bg-brand-cream z-10 border border-brand-brown/20" />
                         <div className="absolute inset-0 bg-[repeating-radial-gradient(circle_at_center,transparent_0,transparent_3px,rgba(255,255,255,0.05)_3px,rgba(255,255,255,0.05)_4px)]" />
                       </div>
                       <div className="flex-1 pointer-events-none">
                          <h4 className="font-bold text-sm">Currently playing</h4>
                          <p className="text-brand-brown text-xs font-hand mt-1">Lofi Chill Beats</p>
                          <div className="w-full h-1.5 bg-brand-beige/50 mt-3 rounded-full overflow-hidden shadow-inset-paper">
                             <div className="h-full bg-brand-orange w-2/3" />
                          </div>
                       </div>
                   </PaperCard>
                 );
              }

              if (el.type === 'insight') {
                 return (
                   <PaperCard key={el.id} rotation={el.rotation} className="z-10 flex flex-col justify-center items-center text-center p-8 bg-brand-beige/20 backdrop-blur-sm border-dashed border-2 border-brand-beige/80 group" style={{ left: el.x, top: el.y, width: 320 }}>
                      <button onClick={() => removeElement(el.id)} className="absolute -top-3 -right-3 p-1 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-50 text-brand-brown hover:text-red-500">
                         <X size={14} />
                       </button>
                      <MapPin size={32} className="text-brand-brown mb-3 opacity-60 pointer-events-none" />
                      <p className="font-hand text-xl text-brand-brown leading-relaxed pointer-events-none">"Let's get out there and explore the world."</p>
                   </PaperCard>
                 );
              }

              // Generic fallback Note
              if (el.type === 'note') {
                return (
                  <StickyNote key={el.id} rotation={el.rotation} style={{ left: el.x, top: el.y, width: 240 }} className="z-30 group bg-yellow-100">
                     <button onClick={() => removeElement(el.id)} className="absolute -top-3 -right-3 p-1 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-50 text-brand-brown hover:text-red-500">
                         <X size={14} />
                     </button>
                     <p className="font-hand text-lg text-brand-charcoal/90 leading-relaxed outline-none" contentEditable suppressContentEditableWarning onPointerDown={(e) => e.stopPropagation()}>
                       Type a new note here...
                     </p>
                  </StickyNote>
                )
              }

              return null;
            })}
          </AnimatePresence>

          {/* Floating Background Doodles / Textures */}
          <div className="absolute top-[20%] left-[5%] opacity-[0.08] pointer-events-none">
             <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
               <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
             </svg>
          </div>
       </div>

       {/* Bottom Control Dock - Garden OS Style */}
       <div className="shrink-0 p-4 pb-6 w-full flex items-end justify-center z-50 pointer-events-none">
          
          <div className="bg-brand-cream/90 backdrop-blur-md rounded-2xl shadow-lifted border border-brand-brown/15 p-2 flex gap-3 max-w-[95vw] pointer-events-auto">
             
             {/* Pane 1: Audit Log / Trace */}
             <div className="hidden lg:flex flex-col bg-brand-cream border border-brand-brown/10 rounded-xl p-3 w-[260px] shadow-paper">
                <div className="flex justify-between items-center mb-2 px-1">
                   <h4 className="text-[10px] font-bold tracking-widest text-brand-text uppercase flex items-center gap-1.5">
                     <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                     Tool Trace
                   </h4>
                   <span className="text-brand-brown/50 text-[10px]">Live</span>
                </div>
                <div className="flex-1 overflow-y-auto space-y-1 pr-1">
                   <div className="text-xs flex items-center justify-between py-1.5 px-2 hover:bg-brand-brown/5 rounded">
                     <span className="text-brand-charcoal flex items-center gap-1.5"><Search size={12} className="text-brand-brown"/> Create Note</span>
                     <span className="text-brand-brown/60 text-[10px]">Now</span>
                   </div>
                   <div className="text-xs flex items-center justify-between py-1.5 px-2 hover:bg-brand-brown/5 rounded">
                     <span className="text-brand-charcoal flex items-center gap-1.5"><ImageIcon size={12} className="text-brand-brown"/> Add Image</span>
                     <span className="text-brand-brown/60 text-[10px]">2m ago</span>
                   </div>
                   <div className="text-xs flex items-center justify-between py-1.5 px-2 hover:bg-brand-brown/5 rounded">
                     <span className="text-brand-charcoal flex items-center gap-1.5"><Edit3 size={12} className="text-brand-brown"/> Render Plan</span>
                     <span className="text-brand-brown/60 text-[10px]">5m ago</span>
                   </div>
                   <div className="text-xs flex items-center justify-between py-1.5 px-2 hover:bg-brand-brown/5 rounded">
                     <span className="text-brand-charcoal flex items-center gap-1.5"><FileText size={12} className="text-brand-brown"/> Read Doc</span>
                     <span className="text-brand-brown/60 text-[10px]">8m ago</span>
                   </div>
                </div>
             </div>

             {/* Pane 2: Elements Browser (The "Themes & Surfaces" equivalent) */}
             <div className="flex flex-col bg-brand-cream border border-brand-brown/10 rounded-xl p-3 flex-1 shadow-paper min-w-[300px]">
                <div className="flex justify-between items-center mb-2 px-1">
                   <h4 className="text-[10px] font-bold tracking-widest text-brand-text uppercase">
                     Scrapbook Elements
                   </h4>
                   <select className="text-[10px] bg-transparent border-none text-brand-brown outline-none cursor-pointer">
                      <option>All Elements</option>
                      <option>Notes</option>
                      <option>Media</option>
                   </select>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar">
                   {/* Add Note */}
                   <button 
                     onClick={() => addElement('note')}
                     className="flex flex-col items-center gap-2 group w-[90px] shrink-0"
                   >
                     <div className="w-[70px] h-[80px] bg-yellow-100 rounded shadow-sm border border-brand-brown/20 flex flex-col pt-2 px-1.5 group-hover:scale-105 group-hover:-translate-y-1 transition-all">
                       <span className="w-full h-1 bg-yellow-200/50 rounded-full mb-1"></span>
                       <span className="w-3/4 h-1 bg-yellow-200/50 rounded-full"></span>
                     </div>
                     <span className="text-[10px] text-brand-text font-medium group-hover:text-brand-charcoal">Sticky Note</span>
                   </button>
                   
                   {/* Add Photo */}
                   <button 
                     onClick={() => addElement('photo', { src: `https://picsum.photos/seed/${Date.now()}/400/300` })}
                     className="flex flex-col items-center gap-2 group w-[90px] shrink-0"
                   >
                     <div className="w-[85px] h-[80px] bg-white p-1 rounded shadow-sm border border-brand-brown/20 flex flex-col group-hover:scale-105 group-hover:-translate-y-1 transition-all">
                       <div className="w-full flex-1 bg-brand-beige/50 flex items-center justify-center text-brand-brown/40">
                         <ImageIcon size={16} />
                       </div>
                       <div className="h-3 w-full"></div>
                     </div>
                     <span className="text-[10px] text-brand-text font-medium group-hover:text-brand-charcoal">Polaroid</span>
                   </button>

                   {/* Add Checklist */}
                   <button 
                     onClick={() => addElement('todo')}
                     className="flex flex-col items-center gap-2 group w-[90px] shrink-0"
                   >
                     <div className="w-[75px] h-[80px] bg-brand-cream/80 rounded-lg shadow-sm border border-brand-brown/20 flex flex-col py-2 px-2 group-hover:scale-105 group-hover:-translate-y-1 transition-all">
                        <div className="flex items-center gap-1 mb-1"><div className="w-2 h-2 rounded-sm border border-brand-brown/30"></div><div className="h-1 w-6 bg-brand-brown/20 rounded-full"></div></div>
                        <div className="flex items-center gap-1 mb-1"><div className="w-2 h-2 rounded-sm border border-brand-brown/30"></div><div className="h-1 w-4 bg-brand-brown/20 rounded-full"></div></div>
                     </div>
                     <span className="text-[10px] text-brand-text font-medium group-hover:text-brand-charcoal">Checklist</span>
                   </button>

                   {/* Add Sticker */}
                   <button 
                     onClick={() => addElement('sticker', { icon: MapPin, colorClass: 'bg-red-400', label: 'Here!' })}
                     className="flex flex-col items-center gap-2 group w-[90px] shrink-0"
                   >
                     <div className="w-[70px] h-[80px] bg-transparent flex items-center justify-center group-hover:scale-105 group-hover:-translate-y-1 transition-all">
                        <div className="p-2 rounded-full shadow-paper border-2 border-white bg-white">
                          <div className="p-2 rounded-full bg-red-400 text-white">
                            <MapPin size={16} />
                          </div>
                        </div>
                     </div>
                     <span className="text-[10px] text-brand-text font-medium group-hover:text-brand-charcoal">Sticker</span>
                   </button>

                   {/* General Add Blank Card */}
                   <button 
                     onClick={() => addElement('insight')}
                     className="flex flex-col items-center gap-2 group w-[90px] shrink-0"
                   >
                     <div className="w-[80px] h-[80px] bg-brand-beige/20 backdrop-blur-sm border-dashed border-2 border-brand-beige/80 rounded-xl flex items-center justify-center group-hover:scale-105 group-hover:-translate-y-1 transition-all group-hover:bg-brand-beige/40">
                         <Plus size={16} className="text-brand-brown/50 group-hover:text-brand-brown" />
                     </div>
                     <span className="text-[10px] text-brand-text font-medium group-hover:text-brand-charcoal">Blank Card</span>
                   </button>

                </div>
             </div>

             {/* Pane 3: Status */}
             <div className="hidden md:flex flex-col bg-brand-cream border border-brand-brown/10 rounded-xl p-3 w-[160px] shadow-paper justify-between">
                <div className="mb-2 px-1">
                   <h4 className="text-[10px] font-bold tracking-widest text-brand-text uppercase">
                     Status
                   </h4>
                </div>
                <div className="space-y-3 pb-1">
                   <div className="flex justify-between items-center px-1">
                      <span className="text-xs text-brand-charcoal font-medium">Elements</span>
                      <span className="text-xs text-brand-brown">{elements.length} / 50</span>
                   </div>
                   <div className="flex justify-between items-center px-1">
                      <span className="text-xs text-brand-charcoal font-medium">Photos</span>
                      <span className="text-xs text-brand-brown flex gap-0.5">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-sm"></div>
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-sm"></div>
                        <div className="w-1.5 h-1.5 bg-brand-beige rounded-sm"></div>
                      </span>
                   </div>
                   <div className="flex justify-between items-center px-1">
                      <span className="text-xs text-brand-charcoal font-medium">Sessions</span>
                      <span className="text-xs text-brand-brown">1</span>
                   </div>
                </div>
             </div>

             {/* Pane 4: Quick Commands */}
             <div className="hidden xl:flex flex-col bg-brand-yellow/80 border border-brand-brown/10 rounded-xl p-3 w-[220px] shadow-paper">
                <div className="mb-2 px-1">
                   <h4 className="text-[10px] font-bold tracking-widest text-brand-text uppercase flex items-center gap-1.5">
                     <Sparkles size={10} className="text-brand-orange" />
                     Quick Commands
                   </h4>
                </div>
                <div className="flex-1 space-y-1.5">
                   <div className="text-[10px] flex gap-2 w-full px-1 py-0.5 hover:bg-black/5 rounded cursor-pointer">
                      <span className="text-brand-charcoal font-mono bg-white/50 px-1 rounded shadow-sm">/new</span>
                      <span className="text-brand-text italic">blank board</span>
                   </div>
                   <div className="text-[10px] flex gap-2 w-full px-1 py-0.5 hover:bg-black/5 rounded cursor-pointer">
                      <span className="text-brand-charcoal font-mono bg-white/50 px-1 rounded shadow-sm">/layout</span>
                      <span className="text-brand-text italic">auto-arrange</span>
                   </div>
                   <div className="text-[10px] flex gap-2 w-full px-1 py-0.5 hover:bg-black/5 rounded cursor-pointer">
                      <span className="text-brand-charcoal font-mono bg-white/50 px-1 rounded shadow-sm">/export</span>
                      <span className="text-brand-text italic">save as image</span>
                   </div>
                </div>
                <div className="mt-2 bg-white/50 rounded px-2 py-1 flex items-center justify-between border border-brand-brown/10 text-xs text-brand-brown">
                   <span className="italic">Type / for more</span>
                   <Send size={10} />
                </div>
             </div>

          </div>
       </div>

    </div>
  );
}
