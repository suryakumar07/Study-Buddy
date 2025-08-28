
import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { getLocaleString } from '../constants/locales';
import type { Task } from '../types';

const motivationalQuotes = {
  en: "The secret of getting ahead is getting started.",
  ta: "முன்னேறுவதற்கான ரகசியம் தொடங்குவதே.",
};

const Planner: React.FC = () => {
  const context = useContext(AppContext);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  if (!context) return null;
  const { language } = context;

  const handleAddTask = () => {
    if (newTask.trim() === '') return;
    const task: Task = { id: Date.now(), text: newTask, completed: false };
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };
  
  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* To-Do List */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">{getLocaleString('todoList', language)}</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
            placeholder={getLocaleString('addTask', language)}
            className="flex-grow p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <button onClick={handleAddTask} className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors">
            {getLocaleString('add', language)}
          </button>
        </div>
        <ul className="mt-4 space-y-2 max-h-60 overflow-y-auto">
          {tasks.map(task => (
            <li key={task.id} className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <span 
                className={`flex-grow cursor-pointer ${task.completed ? 'line-through text-gray-500' : ''}`}
                onClick={() => toggleTask(task.id)}
              >
                {task.text}
              </span>
              <button onClick={() => deleteTask(task.id)} className="ml-4 text-red-500 hover:text-red-700">
                <i className="fas fa-trash"></i>
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Motivational Quote & Timetable */}
      <div className="space-y-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{getLocaleString('motivationalQuote', language)}</h2>
            <p className="text-lg italic text-center text-gray-600 dark:text-gray-300">"{motivationalQuotes[language]}"</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{getLocaleString('timetable', language)}</h2>
            <p className="text-center text-gray-500">Timetable feature coming soon!</p>
        </div>
      </div>
    </div>
  );
};

export default Planner;
