import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../styles/PaperDetail.css';
import { AuthContext } from '../contexts/AuthContext';
import { Trash, Edit } from 'lucide-react';

const PaperDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState('');

  useEffect(() => {
    const fetchPaper = async () => {
      try {
        const response = await fetch(`http://localhost:8000/paper/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch paper');
        }
        const data = await response.json();
        setPaper(data.paper);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPaper();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this paper?')) {
      try {
        const response = await fetch(`http://localhost:8000/delete/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to delete the paper');
        }
        navigate('/recent');
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const generateSummary = async () => {
    if (!paper || !paper.document_url) {
      setError('No document URL available to summarize.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pdf_file: paper.document_url,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate summary');
      }

      const data = await response.json();
      setSummary(data.response);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdate = () => {
    navigate(`/update-paper/${id}`); // Redirect to update paper page
  };

  if (loading) return <p>Loading paper details...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="paper-detail-page">
      <div className="paper-detail-container">
        {paper && (
          <div className="paper-detail-card">
            <h1 className="paper-title">{paper.title}</h1>
            <p><strong>Category:</strong> {paper.category}</p>
            <p><strong>Authors:</strong> {paper.authors}</p>
            <p><strong>Description:</strong> {paper.description}</p>
            <p><strong>Submitted on:</strong> {new Date(paper.created_at).toLocaleDateString()}</p>
            <div className="paper-links">
              <a
                href={`http://localhost:8000/${paper.document_url}`}
                download
                className="download-button"
              >
                View Paper
              </a>
              {isAuthenticated && (
                <>
                  <button onClick={handleUpdate} className="update-button">
                    <Edit size={16} /> Update
                  </button>
                  <button onClick={handleDelete} className="delete-button">
                    <Trash size={16} /> Delete
                  </button>
                </>
              )}
            </div>
            <button onClick={generateSummary} className="generate-button">
              Generate Summary
            </button>
            {summary && (
              <div className="summary-container">
                <h2>Summary</h2>
                <ReactMarkdown>{summary}</ReactMarkdown>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaperDetail;
