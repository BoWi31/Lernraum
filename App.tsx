
import React, { useState, useMemo, useEffect } from 'react';
import { SUBJECTS, GLOSSARY } from './constants';
import { Subject, Topic, Lesson, LearningStep, NotebookTask, QuizOption, MatchingPair, DragItem, DropZone } from './types';

// --- VISUAL ELEMENTS ---

const GuillotineGraphic = () => (
  <div className="w-full max-w-[340px] mx-auto mt-4 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#5dade2]">
    <img 
      src="assets/img/guillotine.png" 
      alt="Die Guillotine" 
      className="w-full h-auto object-contain block hover:scale-105 transition-transform duration-500"
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = 'none';
        const parent = (e.target as HTMLImageElement).parentElement;
        if (parent) {
          parent.className = "h-48 bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-slate-400 text-center p-6";
          parent.innerHTML = '<span class="text-4xl mb-2">🖼️</span><p class="text-sm font-bold">Bild einfügen:<br/><code class="bg-white px-2 py-1 rounded text-blue-600">assets/img/guillotine.png</code></p>';
        }
      }}
    />
    <div className="bg-white/95 backdrop-blur-sm py-2 px-4 text-center">
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Abbildung: Die Guillotine</p>
    </div>
  </div>
);

const LawGraphic = () => (
  <div className="w-28 h-36 md:w-32 md:h-44 bg-yellow-50 border-2 border-amber-200 mx-auto rounded shadow-lg p-3 flex flex-col gap-2 shrink-0 mt-4">
    <div className="h-2 w-3/4 bg-amber-200 rounded"></div>
    <div className="h-1 w-full bg-slate-200 rounded"></div>
    <div className="h-1 w-full bg-slate-200 rounded"></div>
    <div className="h-1 w-4/5 bg-slate-200 rounded"></div>
    <div className="mt-auto h-4 w-10 bg-red-100 border border-red-200 rounded self-end"></div>
  </div>
);

// --- QUIZ COMPONENTS ---

const MultipleChoiceQuiz: React.FC<{
  options: QuizOption[];
  onResult: (ok: boolean, idx: number) => void;
  state?: { sel: number | null, ok: boolean | null };
}> = ({ options, onResult, state }) => (
  <div className="grid gap-2 w-full max-w-2xl mx-auto">
    {options.map((o, oi) => (
      <button 
        key={oi} 
        disabled={state?.ok === true} 
        onClick={() => onResult(o.isCorrect, oi)} 
        className={`p-4 rounded-2xl text-lg font-bold flex justify-between items-center transition-all border-4 ${state?.sel === oi ? (o.isCorrect ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500') : 'bg-white border-slate-100 shadow-sm hover:border-blue-200'}`}
      >
        <span className="text-left pr-4 leading-tight">{o.text}</span>
        {state?.sel === oi && <span className="shrink-0">{o.isCorrect ? '✅' : '❌'}</span>}
      </button>
    ))}
  </div>
);

const DragDropQuiz: React.FC<{
  dragItems: DragItem[];
  dropZones: DropZone[];
  onComplete: () => void;
}> = ({ dragItems, dropZones, onComplete }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [wrongEffect, setWrongEffect] = useState<string | null>(null);

  const handleZoneClick = (zoneId: string) => {
    if (!selectedItem || placements[zoneId]) return;
    const zone = dropZones.find(z => z.id === zoneId);
    if (zone?.correctItemId === selectedItem) {
      const newPlacements = { ...placements, [zoneId]: selectedItem };
      setPlacements(newPlacements);
      setSelectedItem(null);
      if (Object.keys(newPlacements).length === dropZones.length) onComplete();
    } else {
      setWrongEffect(zoneId);
      setTimeout(() => setWrongEffect(null), 500);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <div className="flex flex-wrap justify-center gap-3">
        {dragItems.map(item => {
          const isPlaced = Object.values(placements).includes(item.id);
          return (
            <button
              key={item.id}
              disabled={isPlaced}
              onClick={() => setSelectedItem(item.id)}
              className={`px-6 py-3 rounded-2xl font-black text-lg border-4 transition-all ${isPlaced ? 'opacity-20 pointer-events-none' : selectedItem === item.id ? 'bg-blue-600 text-white border-blue-900 scale-105' : 'bg-white border-blue-100 shadow-md hover:border-blue-300'}`}
            >
              {item.text}
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dropZones.map(zone => {
          const placedItemId = placements[zone.id];
          const placedItem = dragItems.find(i => i.id === placedItemId);
          return (
            <div
              key={zone.id}
              onClick={() => handleZoneClick(zone.id)}
              className={`h-24 rounded-3xl border-4 border-dashed flex flex-col items-center justify-center p-2 transition-all cursor-pointer ${placedItem ? 'bg-green-100 border-green-500 border-solid' : wrongEffect === zone.id ? 'bg-red-100 border-red-500' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}
            >
              <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-1">{zone.label}</span>
              <span className="text-xl font-bold text-slate-800">{placedItem ? placedItem.text : '?'}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MatchingQuiz: React.FC<{
  pairs: MatchingPair[];
  onComplete: () => void;
}> = ({ pairs, onComplete }) => {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [wrong, setWrong] = useState<string | null>(null);

  const leftItems = useMemo(() => [...pairs].sort(() => 0.5 - Math.random()), [pairs]);
  const rightItems = useMemo(() => [...pairs].sort(() => 0.5 - Math.random()), [pairs]);

  const handleLeftClick = (id: string) => {
    if (matches[id]) return;
    setSelectedLeft(id);
    setWrong(null);
  };

  const handleRightClick = (id: string) => {
    if (!selectedLeft) return;
    if (selectedLeft === id) {
      const newMatches = { ...matches, [id]: id };
      setMatches(newMatches);
      setSelectedLeft(null);
      if (Object.keys(newMatches).length === pairs.length) onComplete();
    } else {
      setWrong(id);
      setTimeout(() => setWrong(null), 500);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3 w-full max-w-3xl mx-auto">
      <div className="space-y-2">
        {leftItems.map(item => (
          <button 
            key={item.id}
            onClick={() => handleLeftClick(item.id)}
            className={`w-full p-4 rounded-xl text-sm md:text-base font-bold border-4 transition-all min-h-[4.5rem] flex items-center justify-center text-center ${matches[item.id] ? 'bg-green-100 border-green-500 opacity-40' : selectedLeft === item.id ? 'bg-blue-600 text-white border-blue-800' : 'bg-white border-slate-100 shadow-sm'}`}
          >
            {item.left}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {rightItems.map(item => {
          const isMatched = Object.values(matches).includes(item.id);
          return (
            <button 
              key={item.id}
              onClick={() => handleRightClick(item.id)}
              className={`w-full p-4 rounded-xl text-sm md:text-base font-bold border-4 transition-all min-h-[4.5rem] flex items-center justify-center text-center ${isMatched ? 'bg-green-100 border-green-500 opacity-40' : (wrong === item.id) ? 'bg-red-500 text-white border-red-700 animate-pulse' : 'bg-white border-slate-100 shadow-sm'}`}
            >
              {item.right}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const OrderingQuiz: React.FC<{
  items: string[];
  onComplete: () => void;
}> = ({ items, onComplete }) => {
  const [currentOrder, setCurrentOrder] = useState(() => [...items].sort(() => 0.5 - Math.random()));
  const [isCorrect, setIsCorrect] = useState(false);

  const move = (idx: number, dir: number) => {
    if (isCorrect) return;
    const newOrder = [...currentOrder];
    const target = idx + dir;
    if (target < 0 || target >= items.length) return;
    [newOrder[idx], newOrder[target]] = [newOrder[target], newOrder[idx]];
    setCurrentOrder(newOrder);
    if (JSON.stringify(newOrder) === JSON.stringify(items)) {
      setIsCorrect(true);
      onComplete();
    }
  };

  return (
    <div className="space-y-2 w-full max-w-xl mx-auto">
      {currentOrder.map((text, i) => (
        <div key={text} className={`flex items-center gap-3 p-3 rounded-2xl border-4 transition-all ${isCorrect ? 'bg-green-100 border-green-500' : 'bg-white border-slate-100 shadow-sm'}`}>
          <div className="flex flex-col gap-1 shrink-0">
            <button onClick={() => move(i, -1)} disabled={i === 0 || isCorrect} className="p-1 hover:bg-slate-100 rounded text-slate-400 disabled:opacity-10 text-2xl">▲</button>
            <button onClick={() => move(i, 1)} disabled={i === items.length - 1 || isCorrect} className="p-1 hover:bg-slate-100 rounded text-slate-400 disabled:opacity-10 text-2xl">▼</button>
          </div>
          <span className="text-lg font-bold text-slate-700 flex-1 leading-tight">{text}</span>
          {isCorrect && <span className="text-2xl">✅</span>}
        </div>
      ))}
    </div>
  );
};

// --- MAIN UI COMPONENTS ---

const Header: React.FC<{ onHome: () => void }> = ({ onHome }) => (
  <header className="bg-white border-b-2 border-slate-100 px-6 py-3 flex items-center justify-between h-16 shrink-0 z-[100] shadow-sm">
    <div className="flex items-center gap-3">
      <div className="bg-blue-600 w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-lg">B</div>
      <div>
        <h1 className="text-base font-black text-slate-800 leading-none uppercase tracking-tight">BoWi</h1>
        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Digitaler Lernraum</p>
      </div>
    </div>
    <button onClick={onHome} className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-white hover:border-blue-400 transition-all shadow-sm">
      <svg className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
    </button>
  </header>
);

const Card: React.FC<{ title: string; subtitle?: string; icon: string; color: string; onClick: () => void; accent?: string }> = ({ title, subtitle, icon, color, onClick, accent }) => (
  <button onClick={onClick} className="bg-white rounded-2xl p-5 text-left shadow-sm border border-slate-200 hover:shadow-lg hover:border-blue-300 transition-all group relative overflow-hidden flex items-center gap-4 active:scale-[0.98] w-full h-28">
    <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: color }}></div>
    <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0 bg-slate-50 border border-slate-100 group-hover:scale-110 transition-transform">{icon}</div>
    <div className="flex-1 min-w-0">
      {accent && <span className="text-[8px] font-black uppercase text-slate-400 mb-0.5 block tracking-widest">{accent}</span>}
      <h3 className="text-lg font-bold text-slate-800 truncate leading-tight">{title}</h3>
      {subtitle && <p className="text-xs text-slate-400 truncate mt-0.5">{subtitle}</p>}
    </div>
    <div className="text-slate-200 group-hover:text-blue-500 shrink-0"><svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M9 5l7 7-7 7"/></svg></div>
  </button>
);

const GlossaryTerm: React.FC<{ term: string }> = ({ term }) => {
  const [show, setShow] = useState(false);
  const def = GLOSSARY[term];
  if (!def) return <span>{term}</span>;

  // Globaler Listener zum Schließen beim Klick außerhalb
  useEffect(() => {
    if (!show) return;
    const handleGlobalClick = () => setShow(false);
    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, [show]);

  return (
    <span 
      className="relative inline-block z-[40]" 
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={(e) => { e.stopPropagation(); setShow(!show); }}
    >
      <span className="border-b-2 border-dotted border-blue-400 font-bold bg-blue-50/50 px-0.5 rounded cursor-help transition-colors hover:bg-blue-100 touch-manipulation">{term}</span>
      {show && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 bg-white border-2 border-blue-600 p-4 rounded-2xl shadow-2xl z-[99999] text-sm font-normal text-slate-800 animate-in zoom-in duration-200">
          <span className="block text-[8px] font-black uppercase text-blue-900 mb-1 tracking-widest">Lexikon</span>
          {def}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-blue-600"></span>
        </span>
      )}
    </span>
  );
};

const ContentRenderer: React.FC<{ text: string }> = ({ text }) => {
  const terms = useMemo(() => Object.keys(GLOSSARY).sort((a, b) => b.length - a.length), []);
  const regex = useMemo(() => new RegExp(`(${terms.join('|')})`, 'gi'), [terms]);
  const parts = text.split(regex);
  return <>{parts.map((p, i) => {
    const t = terms.find(x => x.toLowerCase() === p.toLowerCase());
    return t ? <GlossaryTerm key={i} term={t} /> : p;
  })}</>;
};

// --- APP COMPONENT ---

const App: React.FC = () => {
  const [view, setView] = useState<'subject' | 'grade' | 'topic' | 'lesson' | 'level' | 'learning'>('subject');
  const [path, setPath] = useState<{ subject?: Subject; grade?: string; topic?: Topic; lesson?: Lesson; levelIdx?: number }>({});
  const [unlockedSlide, setUnlockedSlide] = useState(0);
  const [quizState, setQuizState] = useState<Record<number, { sel: number | null, ok: boolean | null }>>({});
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({});

  const goHome = () => { setView('subject'); setPath({}); setUnlockedSlide(0); setQuizState({}); setCheckedTasks({}); };
  const goBackToLevels = () => { setView('level'); setUnlockedSlide(0); setQuizState({}); setCheckedTasks({}); };

  const currentLevel = path.lesson?.levels[path.levelIdx || 0];
  const steps = currentLevel?.steps || [];
  const totalSlides = (steps.length * 2) + 1;

  const scroll = (id: number) => {
    const el = document.getElementById(`slide-${id}`);
    el?.scrollIntoView({ behavior: 'smooth', inline: 'start' });
  };

  const handleQuizResult = (stepIdx: number, ok: boolean, sel: number | null) => {
    if (quizState[stepIdx]?.ok) return;
    setQuizState(prev => ({ ...prev, [stepIdx]: { sel, ok } }));
    if (ok) {
      const nextSlide = (stepIdx * 2) + 2;
      if (unlockedSlide < nextSlide) setUnlockedSlide(nextSlide);
    }
  };

  useEffect(() => {
    const preventDefault = (e: TouchEvent) => { if (e.touches.length > 1) e.preventDefault(); };
    document.addEventListener('touchmove', preventDefault, { passive: false });
    return () => document.removeEventListener('touchmove', preventDefault);
  }, []);

  if (view === 'learning' && currentLevel) {
    const progress = (unlockedSlide / (totalSlides - 1)) * 100;
    return (
      <div className="h-full flex flex-col bg-slate-100 no-select overflow-hidden fixed inset-0">
        <header className="bg-white border-b border-slate-200 w-full z-[100] px-6 py-3 flex items-center justify-between shadow-sm h-16 shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={goBackToLevels} className="bg-slate-50 p-2 rounded-xl text-slate-500 hover:bg-slate-200 border border-slate-200 transition-all flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M15 19l-7-7 7-7"/></svg>
              <span className="font-black text-[9px] uppercase tracking-widest hidden md:inline">Zurück</span>
            </button>
            <div className="hidden lg:flex items-center gap-2 border-l border-slate-200 pl-4 ml-2">
               <span className="text-xl">{path.lesson?.emoji}</span>
               <h1 className="font-black text-slate-800 uppercase tracking-tight text-xs">{path.lesson?.title}</h1>
            </div>
          </div>
          <div className="flex-1 max-w-sm mx-6">
            <div className="h-2.5 bg-slate-100 rounded-full border border-slate-200 overflow-hidden">
              <div className="h-full bg-blue-500 transition-all duration-700" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
          <button onClick={goHome} className="bg-slate-50 p-2 rounded-xl text-slate-400 hover:text-red-500 border border-slate-200 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
          </button>
        </header>

        <div className="snap-container flex-1 bg-slate-100 h-full overflow-hidden">
          {steps.map((step, idx) => {
            const contentIdx = idx * 2;
            const quizIdx = (idx * 2) + 1;
            const isUnlocked = contentIdx <= unlockedSlide;
            return (
              <React.Fragment key={step.id}>
                <section id={`slide-${contentIdx}`} className={`snap-section transition-all duration-700 ${isUnlocked ? 'opacity-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                  <div className="max-w-[95%] lg:max-w-5xl w-full h-[88%] bg-white rounded-[40px] shadow-2xl border border-slate-200 flex flex-col md:flex-row gap-6 p-6 md:p-10 relative">
                    <div className="flex-1 flex flex-col gap-4 relative">
                      <div className="flex items-center gap-4 border-b border-slate-100 pb-4 shrink-0">
                        <span className="text-4xl md:text-5xl">{step.emoji}</span>
                        <h2 className="text-2xl md:text-3xl font-black text-blue-900 tracking-tighter uppercase leading-none">{step.title}</h2>
                      </div>
                      <div className="flex-1 overflow-y-auto content-scroll pr-3 space-y-4 text-slate-700 no-scrollbar relative z-10">
                        {step.content.map((t, ci) => <p key={ci} className="text-xl md:text-2xl leading-relaxed font-medium"><ContentRenderer text={t} /></p>)}
                        {step.imageType === 'guillotine' && <GuillotineGraphic />}
                        {step.imageType === 'law' && <LawGraphic />}
                      </div>
                    </div>
                    <div className="w-full md:w-80 flex flex-col gap-4 shrink-0 justify-center z-[100]">
                      {step.instruction && (
                        <div className="bg-yellow-50 border-4 border-yellow-200 rounded-3xl p-5 text-base md:text-xl font-bold text-yellow-800 italic shadow-sm">
                          <ContentRenderer text={step.instruction} />
                        </div>
                      )}
                      <button 
                        onClick={() => { if (unlockedSlide === contentIdx) setUnlockedSlide(quizIdx); scroll(quizIdx); }} 
                        className="bg-blue-600 text-white font-black py-5 px-8 rounded-3xl text-2xl flex items-center justify-center gap-4 transition-all hover:bg-blue-700 shadow-xl animate-bounce-horizontal"
                      >
                        Prüfen <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={4}><path d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                      </button>
                    </div>
                  </div>
                </section>

                {step.quiz && (
                  <section id={`slide-${quizIdx}`} className={`snap-section transition-all duration-700 ${quizIdx <= unlockedSlide ? 'opacity-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                    <div className={`max-w-[95%] lg:max-w-4xl w-full h-[88%] rounded-[40px] shadow-2xl border-4 p-6 md:p-10 flex flex-col overflow-hidden ${quizState[idx]?.ok ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="text-center mb-6 shrink-0">
                        <span className="text-4xl md:text-6xl mb-1 block">🤔</span>
                        <h3 className="text-3xl font-black text-slate-800 mb-0.5 uppercase tracking-tight leading-none">Mini-Check</h3>
                        <p className="text-xl md:text-2xl text-slate-500 font-bold leading-tight mt-2">{step.quiz.question}</p>
                      </div>
                      
                      <div className="flex-1 overflow-y-auto content-scroll px-2 py-2 no-scrollbar">
                        {step.quiz.type === 'multiple-choice' && <MultipleChoiceQuiz options={step.quiz.options || []} onResult={(ok, s) => handleQuizResult(idx, ok, s)} state={quizState[idx]} />}
                        {step.quiz.type === 'matching' && <MatchingQuiz pairs={step.quiz.pairs || []} onComplete={() => handleQuizResult(idx, true, 0)} />}
                        {step.quiz.type === 'ordering' && <OrderingQuiz items={step.quiz.order || []} onComplete={() => handleQuizResult(idx, true, 0)} />}
                        {step.quiz.type === 'drag-drop' && <DragDropQuiz dragItems={step.quiz.dragItems || []} dropZones={step.quiz.dropZones || []} onComplete={() => handleQuizResult(idx, true, 0)} />}
                      </div>

                      {quizState[idx]?.ok && (
                        <div className="pt-6 shrink-0">
                          <button onClick={() => scroll(quizIdx + 1)} className="bg-blue-600 text-white font-black py-5 px-12 rounded-3xl text-2xl flex items-center gap-4 mx-auto shadow-lg hover:scale-105 transition-all">
                            Sehr gut! Weiter <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={4}><path d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                          </button>
                        </div>
                      )}
                    </div>
                  </section>
                )}
              </React.Fragment>
            );
          })}
          
          <section id={`slide-${steps.length * 2}`} className="snap-section">
            <div className="max-w-[95%] lg:max-w-5xl w-full h-[88%] bg-white rounded-[50px] p-6 md:p-12 shadow-2xl border-4 border-yellow-400 flex flex-col overflow-hidden">
              <div className="text-center mb-6 shrink-0">
                <span className="text-6xl md:text-8xl block mb-2 animate-bounce">🎖️</span>
                <h2 className="text-4xl md:text-5xl font-black text-blue-900 uppercase tracking-tighter leading-none">Geschafft!</h2>
                <p className="text-xl text-slate-400 font-bold mt-2 italic">Hake deine Aufgaben im Heft ab:</p>
              </div>
              <div className="flex-1 overflow-y-auto content-scroll px-2 space-y-3 no-scrollbar">
                {currentLevel.tasks.map((t) => (
                  <div 
                    key={t.id} 
                    onClick={() => setCheckedTasks(prev => ({...prev, [t.id]: !prev[t.id]}))}
                    className={`flex items-start gap-4 p-5 rounded-3xl border-4 transition-all cursor-pointer ${checkedTasks[t.id] ? 'bg-green-50 border-green-500 shadow-inner' : 'bg-slate-50 border-slate-100 hover:border-blue-200'}`}
                  >
                    <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center border-4 transition-colors ${checkedTasks[t.id] ? 'bg-green-500 border-green-600 text-white' : 'bg-white border-slate-300'}`}>
                      {checkedTasks[t.id] && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={5}><path d="M5 13l4 4L19 7"/></svg>}
                    </div>
                    <div className="flex-1">
                      <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full ${t.type === 'pflicht' ? 'bg-blue-100 text-blue-700' : t.type === 'bonus' ? 'bg-yellow-100 text-yellow-700' : 'bg-purple-100 text-purple-700'}`}>
                        {t.label}
                      </span>
                      <p className={`text-xl md:text-2xl font-bold mt-2 leading-tight ${checkedTasks[t.id] ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                        {t.task}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-8 shrink-0 flex gap-4">
                <button onClick={goBackToLevels} className="flex-1 py-5 text-blue-600 font-black uppercase text-xl border-4 border-blue-100 rounded-3xl transition-all hover:bg-blue-50">
                   Level-Menü
                </button>
                <button onClick={goHome} className="flex-1 py-5 bg-blue-600 text-white font-black uppercase text-xl rounded-3xl shadow-lg hover:bg-blue-700 transition-all">
                   Hauptmenü
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#f8fafc] overflow-hidden fixed inset-0">
      <Header onHome={goHome} />
      <main className="flex-1 overflow-y-auto p-4 md:p-8 no-scrollbar">
        <div className="max-w-4xl mx-auto pb-10">
          {view === 'subject' && (
            <div className="space-y-8 animate-in fade-in zoom-in duration-300">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tighter uppercase mb-2">Lernraum</h2>
                <div className="w-16 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SUBJECTS.map(s => <Card key={s.id} title={s.title} icon={s.icon} color={s.color} onClick={() => { setPath({ subject: s }); setView('grade'); }} accent="Starten" />)}
              </div>
            </div>
          )}

          {view === 'grade' && path.subject && (
            <div className="space-y-8 animate-in slide-in-from-right duration-300">
              <div className="flex items-center gap-4 mb-8">
                <button onClick={() => setView('subject')} className="bg-white p-3 rounded-xl shadow-sm text-slate-400 hover:text-blue-600 transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path d="M15 19l-7-7 7-7"/></svg>
                </button>
                <h2 className="text-2xl md:text-3xl font-black text-slate-800 uppercase tracking-tighter">Klasse wählen</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {path.subject.grades.map(g => (
                  <button key={g.id} onClick={() => { setPath({ ...path, grade: g.id }); setView('topic'); }} className="bg-white rounded-[32px] h-48 flex flex-col items-center justify-center border-4 border-white shadow-md hover:border-blue-400 transition-all group active:scale-95">
                    <span className="text-6xl font-black text-slate-800 group-hover:scale-110 transition-transform">{g.id}</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-3">Jahrgang</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {view === 'topic' && path.subject && path.grade && (
            <div className="space-y-8 animate-in slide-in-from-right duration-300">
              <div className="flex items-center gap-4 mb-8">
                <button onClick={() => setView('grade')} className="bg-white p-3 rounded-xl shadow-sm text-slate-400 hover:text-blue-600 transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path d="M15 19l-7-7 7-7"/></svg>
                </button>
                <h2 className="text-2xl md:text-3xl font-black text-slate-800 uppercase tracking-tighter">Thema</h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {path.subject.grades.find(g => g.id === path.grade)?.topics.map(t => (
                  <Card key={t.id} title={t.title} icon="📂" color={path.subject?.color || '#333'} onClick={() => { setPath({ ...path, topic: t }); setView('lesson'); }} />
                ))}
              </div>
            </div>
          )}

          {view === 'lesson' && path.topic && (
            <div className="space-y-8 animate-in slide-in-from-right duration-300">
              <div className="flex items-center gap-4 mb-8">
                <button onClick={() => setView('topic')} className="bg-white p-3 rounded-xl shadow-sm text-slate-400 hover:text-blue-600 transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path d="M15 19l-7-7 7-7"/></svg>
                </button>
                <h2 className="text-2xl md:text-3xl font-black text-slate-800 uppercase tracking-tighter">Lektion</h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {path.topic.lessons.map(l => (
                  <Card key={l.id} title={l.title} subtitle={l.description} icon={l.emoji} color={path.subject?.color || '#333'} onClick={() => { setPath({ ...path, lesson: l }); setView('level'); }} />
                ))}
              </div>
            </div>
          )}

          {view === 'level' && path.lesson && (
            <div className="space-y-8 animate-in slide-in-from-right duration-300">
              <div className="flex items-center gap-4 mb-6">
                <button onClick={() => setView('lesson')} className="bg-white p-3 rounded-xl shadow-sm text-slate-400 hover:text-blue-600 transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path d="M15 19l-7-7 7-7"/></svg>
                </button>
                <h2 className="text-2xl md:text-3xl font-black text-slate-800 uppercase tracking-tighter">Schwierigkeit</h2>
              </div>
              <div className="bg-white rounded-[40px] p-6 md:p-10 shadow-lg border border-slate-100 flex flex-col gap-8">
                  <div className="flex items-center gap-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-4xl shrink-0">{path.lesson.emoji}</div>
                      <div className="min-w-0">
                          <h3 className="text-xl font-black uppercase text-slate-800 truncate">{path.lesson.title}</h3>
                          <p className="text-slate-400 text-sm truncate font-medium">{path.lesson.description}</p>
                      </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {path.lesson.levels.map((lvl, lidx) => (
                        <button key={lvl.id} onClick={() => { setPath({ ...path, levelIdx: lidx }); setView('learning'); }} className="group flex flex-col items-center justify-center gap-4 p-8 bg-slate-50 rounded-[36px] border border-slate-100 hover:bg-white hover:border-blue-400 hover:shadow-xl transition-all active:scale-95">
                          <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{lvl.icon}</span>
                          <div className="text-center">
                              <span className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] block mb-0.5">Stufe</span>
                              <span className="text-xl font-black text-slate-800">{lvl.name}</span>
                          </div>
                        </button>
                    ))}
                  </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <footer className="py-3 text-center text-[8px] font-black text-slate-400 uppercase tracking-[0.4em] pointer-events-none shrink-0 border-t border-slate-100 bg-white">
        BoWi Lernraum • Erstellt von Herr Woitun • Keine Datenspeicherung
      </footer>
    </div>
  );
};

export default App;
