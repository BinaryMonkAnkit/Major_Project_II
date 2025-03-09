// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';
// import styles from './queryBox.module.css';

// const ChatComponent = () => {
//     const [query, setQuery] = useState('');
//     const [messages, setMessages] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const chatEndRef = useRef(null);

//     const handleQueryChange = (e) => {
//         setQuery(e.target.value);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!query.trim()) return;
    
//         const newMessage = { text: query, sender: 'user' };
//         setMessages((prevMessages) => [...prevMessages, newMessage]);
//         setQuery('');
//         setLoading(true);
    
//         try {
//             const response = await axios.post(
//                 `${window.location.protocol}//${window.location.host}/query-document/`,
//                 { session_id: sessionId, query },  // Ensure session_id is sent
//                 { headers: { "Content-Type": "application/json" } }
//             );
//             const aiResponse = { text: response.data.text || 'No response available.', sender: 'ai' };
//             setMessages((prevMessages) => [...prevMessages, aiResponse]);
//         } catch (error) {
//             console.error("Error:", error.response?.data || error.message);
//             const errorMessage = { text: 'Error fetching response. Please try again.', sender: 'ai' };
//             setMessages((prevMessages) => [...prevMessages, errorMessage]);
//         } finally {
//             setLoading(false);
//         }
//     };
    
//     useEffect(() => {
//         chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }, [messages]);

//     return (
//         <div className={styles.chatContainer}>
//             <h1 className={styles.title}>AI Chat</h1>
            
//             <div className={styles.chatBox}>
//                 {messages.length === 0 ? (
//                     <p className={styles.placeholder}>Ask a question about the document...</p>
//                 ) : (
//                     messages.map((msg, index) => (
//                         <div key={index} className={msg.sender === 'user' ? styles.userMessage : styles.aiMessage}>
//                             <p>{msg.text}</p>
//                         </div>
//                     ))
//                 )}
//                 {loading && <p className={styles.typingIndicator}>AI is typing...</p>}
//                 <div ref={chatEndRef} />
//             </div>

//             <form onSubmit={handleSubmit} className={styles.inputForm}>
//                 <textarea
//                     value={query}
//                     onChange={handleQueryChange}
//                     placeholder="Enter your query..."
//                     className={styles.inputBox}
//                 ></textarea>
//                 <button type="submit" className={styles.sendButton} disabled={loading}>
//                     {loading ? 'Processing...' : 'Send'}
//                 </button>
//             </form>
//         </div>
//     );
// };


//BEST WORKING CODE

// // export default ChatComponent;
// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';
// import styles from './queryBox.module.css';

// const ChatComponent = ({ sessionId }) => {
//     const [query, setQuery] = useState('');
//     const [messages, setMessages] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const chatEndRef = useRef(null);

//     // Handle query input change
//     const handleQueryChange = (e) => {
//         setQuery(e.target.value);
//     };

//     // Handle query submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!query.trim()) return;

//         if (!sessionId) {
//             alert("No session found. Please upload a document first.");
//             return;
//         }

//         // Add user's message to chat
//         const newMessage = { text: query, sender: 'user' };
//         setMessages((prevMessages) => [...prevMessages, newMessage]);
//         setQuery('');
//         setLoading(true);

//         try {
//             // Send request to backend
//             const response = await axios.post(
//                 `${window.location.protocol}//${window.location.host}/query-document/`,
//                 JSON.stringify({ session_id: sessionId, query }),
//                 { headers: { "Content-Type": "application/json" } }
//             );

//             // ✅ Fix: Extract the correct key from response
//             const aiResponseText = response.data?.response?.text?.trim() || 'No response available.';
//             const aiResponse = { text: aiResponseText, sender: 'ai' };
//             setMessages((prevMessages) => [...prevMessages, aiResponse]);

//         } catch (error) {
//             console.error("Error:", error.response?.data || error.message);
//             setMessages((prevMessages) => [...prevMessages, { text: 'Error fetching response. Please try again.', sender: 'ai' }]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Scroll to the latest message
//     useEffect(() => {
//         chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }, [messages]);

//     return (
//         <div className={styles.chatContainer}>
//             <h1 className={styles.title}>AI Chat</h1>
            
//             <div className={styles.chatBox}>
//                 {messages.length === 0 ? (
//                     <p className={styles.placeholder}>Ask a question about the document...</p>
//                 ) : (
//                     messages.map((msg, index) => (
//                         <div key={index} className={msg.sender === 'user' ? styles.userMessage : styles.aiMessage}>
//                             <p>{msg.text}</p>
//                         </div>
//                     ))
//                 )}
//                 {loading && <p className={styles.typingIndicator}>AI is typing...</p>}
//                 <div ref={chatEndRef} />
//             </div>

//             <form onSubmit={handleSubmit} className={styles.inputForm}>
//                 <textarea
//                     value={query}
//                     onChange={handleQueryChange}
//                     placeholder="Enter your query..."
//                     className={styles.inputBox}
//                 ></textarea>
//                 <button type="submit" className={styles.sendButton} disabled={loading}>
//                     {loading ? 'Processing...' : 'Send'}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default ChatComponent;



// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';
// import styles from './queryBox.module.css';

// const ChatComponent = ({ sessionId }) => {
//     const [query, setQuery] = useState('');
//     const [messages, setMessages] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const chatBoxRef = useRef(null);

//     // Handle query input change
//     const handleQueryChange = (e) => {
//         setQuery(e.target.value);
//     };

//     // Handle query submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!query.trim()) return;

//         if (!sessionId) {
//             alert("No session found. Please upload a document first.");
//             return;
//         }

//         // Add user's message to chat
//         const newMessage = { text: query, sender: 'user' };
//         setMessages((prevMessages) => [...prevMessages, newMessage]);
//         setQuery('');
//         setLoading(true);

//         try {
//             // Send request to backend
//             const response = await axios.post(
//                 `${window.location.protocol}//${window.location.host}/query-document/`,
//                 JSON.stringify({ session_id: sessionId, query }),
//                 { headers: { "Content-Type": "application/json" } }
//             );

//             // Fix: Extract the correct key from response
//             const aiResponseText = response.data?.response?.text?.trim() || 'No response available.';
//             const aiResponse = { text: aiResponseText, sender: 'ai' };
//             setMessages((prevMessages) => [...prevMessages, aiResponse]);

//         } catch (error) {
//             console.error("Error:", error.response?.data || error.message);
//             setMessages((prevMessages) => [...prevMessages, { text: 'Error fetching response. Please try again.', sender: 'ai' }]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Scroll only the chat container, not the whole page
//     useEffect(() => {
//         if (chatBoxRef.current) {
//             setTimeout(() => {
//                 chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
//             }, 100);
//         }
//     }, [messages]);

//     return (
//         <div className={styles.chatContainer}>
//             <h1 className={styles.title}>AI Chat</h1>
            
//             <div className={styles.chatBox} ref={chatBoxRef}>
//                 {messages.length === 0 ? (
//                     <p className={styles.placeholder}>Ask a question about the document...</p>
//                 ) : (
//                     messages.map((msg, index) => (
//                         <div key={index} className={msg.sender === 'user' ? styles.userMessage : styles.aiMessage}>
//                             <p>{msg.text}</p>
//                         </div>
//                     ))
//                 )}
//                 {loading && <p className={styles.typingIndicator}>AI is typing...</p>}
//             </div>

//             <form onSubmit={handleSubmit} className={styles.inputForm}>
//                 <textarea
//                     value={query}
//                     onChange={handleQueryChange}
//                     placeholder="Enter your query..."
//                     className={styles.inputBox}
//                 ></textarea>
//                 <button type="submit" className={styles.sendButton} disabled={loading}>
//                     {loading ? 'Processing...' : 'Send'}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default ChatComponent;


// Implemented the Markdown in response

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown for Markdown rendering
import styles from './queryBox.module.css';

const ChatComponent = ({ sessionId }) => {
    const [query, setQuery] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const chatBoxRef = useRef(null);

    // Handle query input change
    const handleQueryChange = (e) => {
        setQuery(e.target.value);
    };

    // Handle query submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        if (!sessionId) {
            alert("No session found. Please upload a document first.");
            return;
        }

        // Add user's message to chat
        const newMessage = { text: query, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setQuery('');
        setLoading(true);

        try {
            // Send request to backend
            const response = await axios.post(
                `${window.location.protocol}//${window.location.host}/query-document/`,
                JSON.stringify({ session_id: sessionId, query }),
                { headers: { "Content-Type": "application/json" } }
            );

            // ✅ Fix: Extract the correct key from response
            const aiResponseText = response.data?.response?.text?.trim() || 'No response available.';
            const aiResponse = { text: aiResponseText, sender: 'ai' };
            setMessages((prevMessages) => [...prevMessages, aiResponse]);
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: 'Error fetching response. Please try again.', sender: 'ai' }
            ]);
        } finally {
            setLoading(false);
        }
    };

    // Scroll only the chat container, not the whole page
    useEffect(() => {
        if (chatBoxRef.current) {
            setTimeout(() => {
                chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
            }, 100);
        }
    }, [messages]);

    return (
        <div className={styles.chatContainer}>
            <h1 className={styles.title}>AI Chat</h1>

            <div className={styles.chatBox} ref={chatBoxRef}>
                {messages.length === 0 ? (
                    <p className={styles.placeholder}>Ask a question about the document...</p>
                ) : (
                    messages.map((msg, index) => (
                        <div
                            key={index}
                            className={msg.sender === 'user' ? styles.userMessage : styles.aiMessage}
                        >
                            {/* Render Markdown for AI responses */}
                            {msg.sender === 'ai' ? (
                                <ReactMarkdown>{msg.text}</ReactMarkdown>
                            ) : (
                                <p>{msg.text}</p>
                            )}
                        </div>
                    ))
                )}
                {loading && <p className={styles.typingIndicator}>AI is typing...</p>}
            </div>

            <form onSubmit={handleSubmit} className={styles.inputForm}>
                <textarea
                    value={query}
                    onChange={handleQueryChange}
                    placeholder="Enter your query..."
                    className={styles.inputBox}
                ></textarea>
                <button type="submit" className={styles.sendButton} disabled={loading}>
                    {loading ? 'Processing...' : 'Send'}
                </button>
            </form>
        </div>
    );
};

export default ChatComponent;