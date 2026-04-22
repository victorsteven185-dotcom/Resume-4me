/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useResume } from './hooks/useResume';
import { LandingPage } from './components/LandingPage';
import { EditorView } from './components/EditorView';
import { CoverLetterEditor } from './components/CoverLetterEditor';

import { SharedPreview } from './components/SharedPreview';
import { ShortView } from './components/ShortView';
import { useEffect } from 'react';
import { testConnection } from './services/resumeService';

export default function App() {
  const resume = useResume();

  useEffect(() => {
    testConnection();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage onSelectTemplate={resume.updateTemplate} />} />
        <Route path="/editor" element={<EditorView {...resume} />} />
        <Route path="/view/:data" element={<SharedPreview />} />
        <Route path="/r/:slug" element={<ShortView />} />
        <Route path="/cover-letter" element={<CoverLetterEditor data={resume.data} updateCoverLetter={resume.updateCoverLetter} onUpdateSkills={resume.updateSkills} onUpdateSoftSkills={resume.updateSoftSkills} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

