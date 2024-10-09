import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
// import '../styles/PaperDetail.css'; // You can create a CSS file for styling

const PaperDetail = () => {
  const { id } = useParams(); // Get the paper ID from the URL
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaper = async () => {
      try {
        const response = await fetch(`http://localhost:8000/paper/${id}`); // Adjust endpoint as necessary
        if (!response.ok) {
          throw new Error('Failed to fetch paper');
        }
        const data = await response.json();
        setPaper(data.paper); // Access the paper object here
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPaper();
  }, [id]);

  if (loading) return <p>Loading paper details...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="paper-detail-container">
      <Navbar />
      {paper && (
        <div className="paper-detail">
          <div className="paper-card"> {/* Add a card wrapper here */}
            <h1>{paper.title}</h1>
            <p><strong>Category:</strong> {paper.category}</p> {/* Ensure correct casing for property */}
            <p><strong>Authors:</strong> {paper.authors}</p>
            <p><strong>Description:</strong> {paper.description}</p>
            <p><strong>Document:</strong> <a href={`http://localhost:8000/${paper.document_url}`} download>View Paper</a></p>
            <p><strong>Submitted on:</strong> {new Date(paper.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaperDetail;
