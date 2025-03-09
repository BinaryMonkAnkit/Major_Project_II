
// //date 02/02/2025
// import React, { useState } from 'react';
// import axios from 'axios';
// import styles from './Doc_preview.module.css';

// const DocumentUploader = () => {
//     const [file, setFile] = useState(null);
//     const [tables, setTables] = useState([]);
//     const [uploadedDocUrl, setUploadedDocUrl] = useState(null);
//     const [loading, setLoading] = useState(false);

//     const handleFileChange = (e) => {
//         setFile(e.target.files[0]);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!file) {
//             alert('Please upload a document.');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('document', file);

//         setLoading(true);

//         try {
//             const result = await axios.post(
//                 `${window.location.protocol}//${window.location.host}/process-document/`, 
//                 formData 
//             );

//             if (result.data.tables) {
//                 setTables(result.data.tables); // Ensure correct structure
//             } else {
//                 setTables([]);
//             }

//             setUploadedDocUrl(URL.createObjectURL(file));
//         } catch (error) {
//             alert('Error processing document: ' + (error.response?.data?.message || error.message));
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className={styles.documentUploader}>
//             <h1 className={styles.title}>Document Table Extractor</h1>
//             <form onSubmit={handleSubmit} className={styles.uploadForm}>
//                 <div className={styles.uploadSection}>
//                     <label htmlFor="document" className={styles.label}>Upload Document:</label>
//                     <input type="file" id="document" onChange={handleFileChange} className={styles.inputFile} />
//                 </div>
//                 <button type="submit" className={styles.submitBtn} disabled={loading}>
//                     {loading ? 'Processing...' : 'Upload'}
//                 </button>
//             </form>

//             {uploadedDocUrl && (
//                 <div className={styles.uploadedDoc}>
//                     <h2>Uploaded Document Preview:</h2>
//                     <iframe src={uploadedDocUrl} title="Uploaded Document" className={styles.documentPreview}></iframe>
//                 </div>
//             )}

//             {tables.length > 0 && (
//                 <div className={styles.tableOutput}>
//                     <h2>Extracted Tables</h2>
//                     <table className={styles.table}>
//                         <thead>
//                             <tr>
//                                 <th>Table Name</th>
//                                 <th>Type</th>
//                                 <th>Download</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {tables.map((table, index) => (
//                                 <tr key={index}>
//                                     <td>Table {index + 1}</td>
//                                     <td>{table.type.toUpperCase()}</td>
//                                     <td>
//                                         <a 
//                                             href={table.path} 
//                                             download={table.name} 
//                                             className={styles.downloadLink}>
//                                             Download
//                                         </a>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default DocumentUploader;


import React, { useState } from 'react';
import axios from 'axios';
import styles from './Doc_preview.module.css';

const DocumentUploader = ({ setSessionId }) => { // Receive setSessionId from App.jsx
    const [file, setFile] = useState(null);
    const [tables, setTables] = useState([]);
    const [uploadedDocUrl, setUploadedDocUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert('Please upload a document.');
            return;
        }

        const formData = new FormData();
        formData.append('document', file);

        setLoading(true);

        try {
            const result = await axios.post(
                `${window.location.protocol}//${window.location.host}/process-document/`, 
                formData 
            );

            if (result.data.tables) {
                setTables(result.data.tables);
            } else {
                setTables([]);
            }

            setUploadedDocUrl(URL.createObjectURL(file));

            //  Store session_id and pass it to App.jsx
            if (result.data.session_id) {
                setSessionId(result.data.session_id);  // Send session_id to App.jsx
            }
        } catch (error) {
            alert('Error processing document: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.documentUploader}>
            <h1 className={styles.title}>Document Table Extractor</h1>
            <form onSubmit={handleSubmit} className={styles.uploadForm}>
                <div className={styles.uploadSection}>
                    <label htmlFor="document" className={styles.label}>Upload Document:</label>
                    <input type="file" id="document" onChange={handleFileChange} className={styles.inputFile} />
                </div>
                <button type="submit" className={styles.submitBtn} disabled={loading}>
                    {loading ? 'Processing...' : 'Upload'}
                </button>
            </form>

            {uploadedDocUrl && (
                <div className={styles.uploadedDoc}>
                    <h2>Uploaded Document Preview:</h2>
                    <iframe src={uploadedDocUrl} title="Uploaded Document" className={styles.documentPreview}></iframe>
                </div>
            )}

            {tables.length > 0 && (
                <div className={styles.tableOutput}>
                    <h2>Extracted Tables</h2>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Table Name</th>
                                <th>Type</th>
                                <th>Download</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tables.map((table, index) => (
                                <tr key={index}>
                                    <td>Table {index + 1}</td>
                                    <td>{table.type.toUpperCase()}</td>
                                    <td>
                                        <a 
                                            href={table.path} 
                                            download={table.name} 
                                            className={styles.downloadLink}>
                                            Download
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default DocumentUploader;
