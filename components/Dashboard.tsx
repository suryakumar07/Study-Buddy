
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import AiTutor from '../features/AiTutor';
import Planner from '../features/Planner';
import SmartNotes from '../features/SmartNotes';
import ExamPrep from '../features/ExamPrep';
import Community from '../features/Community';

const Dashboard: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) return null;

  const { activeFeature } = context;

  const renderFeature = () => {
    switch (activeFeature) {
      case 'tutor':
        return <AiTutor />;
      case 'planner':
        return <Planner />;
      case 'notes':
        return <SmartNotes />;
      case 'exam':
        return <ExamPrep />;
      case 'community':
        return <Community />;
      default:
        return <AiTutor />;
    }
  };

  return <div className="animate-fade-in">{renderFeature()}</div>;
};

export default Dashboard;
