
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TheoryExplorer from './components/TheoryExplorer';
import NewsAnalyzer from './components/NewsAnalyzer';
import EssayArchitect from './components/EssayArchitect';
import TextRefiner from './components/TextRefiner';
import TutorChat from './components/TutorChat';
import LiveSeminar from './components/LiveSeminar';
import ResearchAssistant from './components/ResearchAssistant';
import NotesManager from './components/NotesManager';
import StudyJournal from './components/StudyJournal';
import DriveResource from './components/DriveResource';
import Auth from './components/Auth';
import InstallGuide from './components/InstallGuide';
import AccountProfile from './components/AccountProfile';
import { AppView, UserProfile } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isLocked, setIsLocked] = useState(false); // Nouvel état pour le verrouillage
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showInstallGuide, setShowInstallGuide] = useState(false);

  useEffect(() => {
    const initApp = () => {
      try {
        const savedProfile = localStorage.getItem('agora_user_profile');
        if (savedProfile) {
          const parsed = JSON.parse(savedProfile);
          if (parsed && parsed.pseudonym) {
            setUserProfile(parsed);
            // Si un profil existe, on verrouille l'application par défaut
            setIsLocked(true);
          } else {
            console.warn("Profil invalide détecté, réinitialisation.");
            localStorage.removeItem('agora_user_profile');
          }
        }
      } catch (e) {
        console.error("Erreur critique lors du chargement du profil:", e);
        localStorage.removeItem('agora_user_profile');
      } finally {
        setIsInitializing(false);
      }
    };

    initApp();
  }, []);

  const handleUnlock = (profile: UserProfile) => {
    setUserProfile(profile);
    setIsLocked(false);
  };

  // Écran de chargement
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-[#002147] flex items-center justify-center flex-col space-y-4">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Flag_of_Quebec.svg" 
          alt="Chargement..." 
          className="w-16 h-auto animate-pulse" 
        />
        <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Afficher l'écran Auth si pas de profil OU si l'app est verrouillée
  if (!userProfile || isLocked) {
    return (
      <Auth 
        onComplete={handleUnlock} 
        existingProfile={userProfile} 
      />
    );
  }

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard onNavigate={setCurrentView} user={userProfile} onShowInstall={() => setShowInstallGuide(true)} />;
      case AppView.THEORY_EXPLORER:
        return <TheoryExplorer />;
      case AppView.RESEARCH_ASSISTANT:
        return <ResearchAssistant />;
      case AppView.NEWS_ANALYZER:
        return <NewsAnalyzer />;
      case AppView.ESSAY_ARCHITECT:
        return <EssayArchitect />;
      case AppView.TEXT_REFINER:
        return <TextRefiner />;
      case AppView.TUTOR:
        return <TutorChat />;
      case AppView.LIVE_SEMINAR:
        return <LiveSeminar />;
      case AppView.NOTES:
        return <NotesManager />;
      case AppView.JOURNAL:
        return <StudyJournal />;
      case AppView.DRIVE:
        return <DriveResource />;
      case AppView.ACCOUNT:
        return <AccountProfile 
          user={userProfile} 
          onUpdateUser={setUserProfile} 
          onLogout={() => {
            // "Déconnexion" signifie ici re-verrouiller l'app
            setIsLocked(true);
            setCurrentView(AppView.DASHBOARD);
          }} 
        />;
      default:
        return <Dashboard onNavigate={setCurrentView} user={userProfile} onShowInstall={() => setShowInstallGuide(true)} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 selection:bg-amber-200 selection:text-amber-900">
      
      {/* Mobile Header Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-40 flex items-center justify-between px-4 shadow-sm">
        <div className="flex items-center space-x-2">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Flag_of_Quebec.svg" 
            alt="Québec" 
            className="w-6 h-auto shadow-sm border border-black/5" 
          />
          <span className="font-bold text-[#002147] serif text-sm">Académie du Garage</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 text-[#002147] hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
        >
          <span className="sr-only">Ouvrir le menu</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <Sidebar 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        user={userProfile}
        onLogout={() => setIsLocked(true)}
        onShowInstall={() => setShowInstallGuide(true)}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      
      <main className="flex-1 p-4 md:p-8 lg:p-12 pt-20 lg:pt-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto pb-20">
          {renderView()}
        </div>
      </main>

      {showInstallGuide && <InstallGuide onClose={() => setShowInstallGuide(false)} />}
    </div>
  );
};

export default App;
