
import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { CardState } from './types';
import FloatingHearts from './components/FloatingHearts';
import Celebration from './components/Celebration';
import DrawingIcon from './components/DrawingIcon';
import { Analytics } from "@vercel/analytics/react"

const CHARACTER_TYPES = [
  'char_cat', 'char_penguin', 'char_bunny', 'char_cloud', 'char_dino',
  'char_owl', 'char_sun', 'char_pig', 'char_elephant', 'char_ghost',
  'char_dog', 'char_fox', 'char_monkey', 'char_panda'
];

const ANIMATIONS = ['animate-wiggle', 'animate-sway', 'animate-drift', 'animate-bob', 'animate-bounce'];

interface DraggableChar {
  id: number;
  type: string;
  animation: string;
  isRight: boolean;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
}

const App: React.FC = () => {
  const [state, setState] = useState<CardState>('closed');
  const [celebrating, setCelebrating] = useState(false);
  const [noPos, setNoPos] = useState<{ x: number; y: number } | null>(null);
  
  // Draggable characters state
  const [chars, setChars] = useState<DraggableChar[]>([]);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  // Initialize characters once
  useEffect(() => {
    const initialChars: DraggableChar[] = [];
    for (let i = 0; i < 14; i++) {
      const isTop = i < 7; 
      const isRight = Math.random() > 0.5;
      initialChars.push({
        id: i,
        type: CHARACTER_TYPES[i % CHARACTER_TYPES.length],
        animation: ANIMATIONS[Math.floor(Math.random() * ANIMATIONS.length)],
        isRight,
        x: 10 + Math.random() * 75,
        y: isTop ? 5 + Math.random() * 15 : 75 + Math.random() * 15,
      });
    }
    setChars(initialChars);
  }, []);

  const handleNext = () => {
    if (state === 'closed') setState('page_1_2');
    else if (state === 'page_1_2') setState('page_3_4');
  };

  const handlePrev = () => {
    if (state === 'page_1_2') setState('closed');
    else if (state === 'page_3_4') setState('page_1_2');
    setNoPos(null);
  };

  const handleYes = () => {
    setCelebrating(true);
    setState('final');
  };

  // Evasive NO button logic
  const moveNoButton = useCallback((mouseX?: number, mouseY?: number) => {
    if (!noButtonRef.current || !cardContainerRef.current) return;
    const rect = cardContainerRef.current.getBoundingClientRect();
    const halfWidth = rect.width / 2;
    const btnWidth = 200; 
    const btnHeight = 90;

    const padding = 30;
    const minX = padding;
    const maxX = halfWidth - btnWidth - padding;
    const minY = padding;
    const maxY = rect.height - btnHeight - padding;

    let newX: number, newY: number;
    let attempts = 0;
    
    do {
      newX = minX + Math.random() * (maxX - minX);
      newY = minY + Math.random() * (maxY - minY);
      attempts++;
      
      if (mouseX !== undefined && mouseY !== undefined) {
        const localMouseX = mouseX - (rect.left + halfWidth);
        const localMouseY = mouseY - rect.top;
        const dist = Math.hypot(newX + btnWidth / 2 - localMouseX, newY + btnHeight / 2 - localMouseY);
        if (dist > 250) break;
      } else {
        break;
      }
    } while (attempts < 20);

    setNoPos({ x: newX, y: newY });
  }, []);

  useEffect(() => {
    if (state !== 'page_3_4' || celebrating) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Handle Evasive NO button
      if (noButtonRef.current) {
        const btnRect = noButtonRef.current.getBoundingClientRect();
        const btnCenterX = btnRect.left + btnRect.width / 2;
        const btnCenterY = btnRect.top + btnRect.height / 2;
        const distance = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);
        if (distance < 180) {
          moveNoButton(e.clientX, e.clientY);
        }
      }

      // Handle Character Dragging
      if (draggingId !== null && cardContainerRef.current) {
        const containerRect = cardContainerRef.current.getBoundingClientRect();
        const halfWidth = containerRect.width / 2;
        
        // Target page rect (Left or Right half)
        const char = chars.find(c => c.id === draggingId);
        if (!char) return;

        const pageLeft = char.isRight ? containerRect.left + halfWidth : containerRect.left;
        const localX = e.clientX - pageLeft - dragOffset.current.x;
        const localY = e.clientY - containerRect.top - dragOffset.current.y;

        // Convert to percentage
        const newX = Math.max(0, Math.min(90, (localX / halfWidth) * 100));
        const newY = Math.max(0, Math.min(90, (localY / containerRect.height) * 100));

        setChars(prev => prev.map(c => c.id === draggingId ? { ...c, x: newX, y: newY } : c));
      }
    };

    const handleMouseUp = () => setDraggingId(null);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [state, celebrating, moveNoButton, draggingId, chars]);

  const startDrag = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setDraggingId(id);
  };

  const pageFaceClass = "absolute inset-0 w-full h-full backface-hidden flex flex-col items-center text-center overflow-hidden shadow-inner border-pink-100/40 bg-[#fffcfd] pointer-events-auto";
  const paperTexture = "absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]";
  const dotsBackground = "absolute inset-0 opacity-5 bg-[radial-gradient(#ff4d88_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none";

  const LetterSpreadStickers = () => (
    <>
      <div className="absolute top-10 left-1/4 animate-bounce"><DrawingIcon type="char_cat" /></div>
      <div className="absolute top-10 right-1/4 animate-wiggle"><DrawingIcon type="char_penguin" /></div>
      <div className="absolute bottom-10 left-1/4 animate-sway"><DrawingIcon type="char_bunny" /></div>
      <div className="absolute bottom-10 right-1/4 animate-bob"><DrawingIcon type="char_sun" /></div>
    </>
  );

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      <FloatingHearts />
      <Celebration active={celebrating} />

      <div 
        ref={cardContainerRef}
        className={`relative transition-all duration-700 ease-in-out transform shadow-2xl rounded-xl
          ${state === 'closed' || state === 'final' ? 'w-80 h-[480px] sm:w-96 sm:h-[550px]' : 'w-full max-w-5xl h-[550px] sm:h-[650px]'}
        `}
        style={{ perspective: '2500px' }}
      >
        {state === 'final' ? (
          <div className="w-full h-full bg-[#ff4d88] flex flex-col items-center justify-center p-8 text-center border-[14px] border-white rounded-xl relative overflow-hidden shadow-2xl animate-heartbeat cursor-default">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_white_1.5px,_transparent_1.5px)] bg-[size:24px_24px]"></div>
            <div className="z-10 flex flex-col items-center">
              <DrawingIcon type="big_heart" className="w-40 h-40 text-white mb-6 drop-shadow-2xl" />
              <h2 className="text-6xl font-cursive font-bold text-white drop-shadow-lg">YAY!!!</h2>
              <p className="text-xl font-medium text-pink-100 font-cursive mt-4 max-w-xs leading-tight">
                You just made my heart do a happy dance! 💃❤️
              </p>
              <div className="mt-8 scale-110 flex gap-2"><DrawingIcon type="cute_flowers" /></div>
              <div className="mt-12 text-[10px] text-pink-200 tracking-[0.3em] font-sans uppercase font-bold">Handcoded with Love</div>
              <div className="mt-12 text-[10px] text-pink-200 tracking-[0.3em] font-sans uppercase font-bold">Refresh the page to re-live this moment</div>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
            
            {/* STATIC LEFT BASE */}
            <div className={`absolute top-0 left-0 w-1/2 h-full rounded-l-xl border-2 border-r-0 border-pink-100/40 z-0 bg-[#fffcfd] transition-opacity duration-500 ${state === 'closed' ? 'opacity-0' : 'opacity-100'}`}>
              <div className={dotsBackground}></div>
              <div className={paperTexture}></div>
            </div>

            {/* PAGE 5: STATIC RIGHT BASE (My Valentine? + NO button) */}
            <div 
              className={`absolute top-0 right-0 h-full rounded-r-xl border-2 border-l-0 border-pink-100/40 bg-[#fffcfd] transition-all duration-700 
                ${state === 'closed' ? 'w-full opacity-0 z-0 shadow-inner' : 'w-1/2 opacity-100 z-10 shadow-inner'}`}
            >
              <div className={dotsBackground}></div>
              <div className={paperTexture}></div>
              
              {state === 'page_3_4' && (
                <div className="w-full h-full flex flex-col items-center pt-32 relative">
                   {/* Draggable Characters for Right Side */}
                   {chars.filter(c => c.isRight).map(c => (
                     <div
                       key={c.id}
                       onMouseDown={(e) => startDrag(e, c.id)}
                       style={{ 
                         left: `${c.x}%`, 
                         top: `${c.y}%`, 
                         position: 'absolute',
                         cursor: draggingId === c.id ? 'grabbing' : 'grab',
                         zIndex: draggingId === c.id ? 200 : 50
                       }}
                       className={`transition-transform duration-75 ${c.animation} pointer-events-auto`}
                     >
                       <DrawingIcon type={c.type} />
                     </div>
                   ))}

                   <h2 className="text-5xl sm:text-7xl font-cursive font-bold text-[#ff4d88] drop-shadow-sm mb-0 h-[1.5em] flex items-center select-none justify-center px-4">
                      My Valentine?
                   </h2>

                   <div className="mt-28 flex-1 w-full flex justify-center items-start">
                     <button 
                        ref={noButtonRef} 
                        style={noPos ? { 
                          position: 'absolute', 
                          left: `${noPos.x}px`, 
                          top: `${noPos.y}px`, 
                          zIndex: 100 
                        } : { zIndex: 100 }}
                        className="px-16 py-8 bg-white text-gray-400 rounded-full text-4xl font-bold shadow-xl border-4 border-black transition-all duration-150 ease-out pointer-events-none min-w-[200px]"
                      >
                        NO
                      </button>
                    </div>
                </div>
              )}
            </div>

            {/* SHEET 2: Page 3 (Front) / Page 4 (Back - YES) */}
            <div 
              className={`absolute top-0 right-0 h-full transition-all duration-1000 ease-in-out origin-left pointer-events-none
                ${state === 'closed' ? 'w-full opacity-0' : 'w-1/2 opacity-100'}`}
              style={{ 
                transformStyle: 'preserve-3d', 
                transform: state === 'page_3_4' ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                zIndex: state === 'page_3_4' ? 40 : 20 
              }}
            >
              {/* PAGE 3: Love Letter Two (Front) */}
              <div className={`${pageFaceClass} border-r-2 rounded-r-xl justify-center z-10 p-8 sm:p-12`}>
                <div className={dotsBackground}></div>
                <div className={paperTexture}></div>
                <div className="z-20 bg-white/80 p-6 sm:p-10 rounded-3xl border border-pink-50 shadow-sm min-h-[50%] flex flex-col justify-center">
                  <p className="text-xl sm:text-2xl font-cursive text-gray-800 leading-relaxed">
                    You are my favorite notification, my favorite laugh, and my favorite place to rest my heart. Life feels sweeter with you in it, and every smile of yours feels like a gift I never knew I needed.
                  </p>
                </div>
                <LetterSpreadStickers />
              </div>

              {/* PAGE 4: Will You Be + YES button (Back) */}
              <div 
                className={`${pageFaceClass} border-l-2 rounded-l-xl pt-32 z-20`}
                style={{ transform: 'rotateY(180deg)' }}
              >
                <div className={dotsBackground}></div>
                <div className={paperTexture}></div>
                
                {/* Draggable Characters for Left Side */}
                {state === 'page_3_4' && chars.filter(c => !c.isRight).map(c => (
                  <div
                    key={c.id}
                    onMouseDown={(e) => startDrag(e, c.id)}
                    style={{ 
                      left: `${c.x}%`, 
                      top: `${c.y}%`, 
                      position: 'absolute',
                      cursor: draggingId === c.id ? 'grabbing' : 'grab',
                      zIndex: draggingId === c.id ? 200 : 50
                    }}
                    className={`transition-transform duration-75 ${c.animation} pointer-events-auto`}
                  >
                    <DrawingIcon type={c.type} />
                  </div>
                ))}

                <h2 className="text-5xl sm:text-7xl font-cursive font-bold text-[#ff4d88] drop-shadow-sm mb-0 h-[1.5em] flex items-center select-none justify-center px-4">
                  Will You Be
                </h2>
                <div className="mt-28 flex-1 w-full flex justify-center items-start">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleYes();
                    }} 
                    className="px-16 py-8 bg-[#ff4d88] text-white rounded-full text-4xl font-bold shadow-2xl hover:scale-110 active:scale-95 transition-all animate-bounce border-4 border-white pointer-events-auto min-w-[200px]"
                  >
                    YES! 💖
                  </button>
                </div>
              </div>
            </div>

            {/* SHEET 1: Page 1 (Cover) / Page 2 (Letter) */}
            <div 
              className={`absolute top-0 right-0 h-full transition-all duration-1000 ease-in-out origin-left pointer-events-none
                ${state === 'closed' ? 'w-full z-50' : 'w-1/2 z-30'}`}
              style={{ 
                transformStyle: 'preserve-3d', 
                transform: state !== 'closed' ? 'rotateY(-180deg)' : 'rotateY(0deg)'
              }}
            >
              {/* PAGE 1: Cover */}
              <div 
                className={`absolute inset-0 w-full h-full backface-hidden flex flex-col justify-center items-center text-center p-8 overflow-hidden shadow-2xl border-[14px] border-white cursor-pointer group rounded-xl bg-[#ff4d88] pointer-events-auto z-10`}
                onClick={handleNext}
              >
                <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(circle_at_center,_white_1.5px,_transparent_1.5px)] bg-[size:24px_24px]"></div>
                <div className="flex-1 flex items-center justify-center w-full">
                  <DrawingIcon type="teddy_bear" className="w-48 h-48 sm:w-64 sm:h-64 drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="mb-10">
                   <h1 className="text-white font-cursive text-4xl sm:text-6xl font-bold tracking-wide drop-shadow-lg mb-2">Tap to open 💌</h1>
                   <div className="h-1.5 w-24 bg-white/40 mx-auto rounded-full"></div>
                </div>
              </div>

              {/* PAGE 2: Love Letter One */}
              <div 
                className={`${pageFaceClass} border-l-2 rounded-l-xl justify-center z-20 p-8 sm:p-12`}
                style={{ transform: 'rotateY(180deg)' }}
              >
                <div className={dotsBackground}></div>
                <div className={paperTexture}></div>
                <div className="z-30 bg-white/80 p-6 sm:p-10 rounded-3xl border border-pink-50 shadow-sm min-h-[50%] flex flex-col justify-center">
                  <p className="text-xl sm:text-2xl font-cursive text-gray-800 leading-relaxed">
                    From the moment you came into my life, everything felt lighter, warmer, and funnier. You turned ordinary days into tiny adventures and boring moments into memories worth smiling about.
                  </p>
                </div>
                <LetterSpreadStickers />
              </div>
            </div>

            <div className={`absolute left-1/2 top-0 bottom-0 w-12 -translate-x-1/2 bg-gradient-to-r from-black/10 via-transparent to-black/10 pointer-events-none z-[45] transition-opacity duration-500 ${state === 'closed' ? 'opacity-0' : 'opacity-100'}`}></div>
          </div>
        )}
      </div>

      {state !== 'closed' && state !== 'final' && (
        <div className="mt-12 flex gap-8 z-50">
          <button onClick={handlePrev} className="px-8 py-3 rounded-full border-2 border-[#ff4d88] text-[#ff4d88] font-bold hover:bg-[#ff4d88] hover:text-white transition-all shadow-md bg-white/90 backdrop-blur-sm active:scale-95">← Previous</button>
          <button 
            onClick={handleNext} 
            className={`px-8 py-3 rounded-full bg-[#ff4d88] text-white font-bold hover:bg-[#ff1a66] transition-all shadow-md active:scale-95 ${state === 'page_3_4' ? 'opacity-0 pointer-events-none' : ''}`}
          >
            Next →
          </button>
        </div>
      )}

      <style>{`
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>
      <Analytics />
    </div>
  );
};

export default App;
