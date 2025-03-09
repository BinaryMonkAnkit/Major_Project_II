import './App.css';
import { useState } from 'react';
import DocumentProcessor from './components/doc_preview/Doc_preview.jsx';
import ChatComponent from './components/query/queryBox.jsx';

function App() {
  const [sessionId, setSessionId] = useState(null);  // Store session_id globally

  return (
    <div className="appContainer">
      <div className="documentProcessor">
        <DocumentProcessor setSessionId={setSessionId} />
      </div>
      <div className="chatComponent">
        <ChatComponent sessionId={sessionId} />
      </div>
    </div>
  );
}

export default App;



// import './App.css';
// import DocumentProcessor from './components/doc_preview/Doc_preview.jsx';
// import ChatComponent from './components/query/queryBox.jsx';

// function App() {
//   return (
//     <div className="appContainer">
//       <div className="documentProcessor">
//         <DocumentProcessor/>
//       </div>
//       <div className="chatComponent">
//         <ChatComponent/>
//       </div>
//     </div>
//   );
// }

// export default App;
