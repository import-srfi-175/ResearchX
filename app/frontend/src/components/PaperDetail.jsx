import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../styles/PaperDetail.css';
import { AuthContext } from '../contexts/AuthContext';
import { Trash, Edit, FileText, Sparkles, Loader2 } from 'lucide-react';

const PaperDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [citationCount, setCitationCount] = useState(null); // New state for citation count

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

        // Fetch citation count
        fetchCitationCount(data.paper);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchCitationCount = async (paper) => {
      try {
        const response = await fetch(`http://localhost:8000/citation_counts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paper),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch citation count');
        }

        const citationData = await response.json();
        setCitationCount(citationData); // Update citation count
      } catch (error) {
        setError(error.message);
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

    setIsGenerating(true);
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
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUpdate = () => {
    navigate(`/update-paper/${id}`);
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
            <p><strong>Citation Count:</strong> {citationCount !== null ? citationCount : 'Loading...'}</p> {/* Display citation count */}
            <div className="paper-links">
              <div className="left-buttons">
                <a
                  href={`http://localhost:8000/${paper.document_url}`}
                  download
                  className="button-28"
                >
                  <FileText size={16} /> View Paper
                </a>
                {isAuthenticated && (
                  <>
                    <button onClick={handleUpdate} className="button-27">
                      <Edit size={16} /> Update
                    </button>
                    <button onClick={handleDelete} className="button-27">
                      <Trash size={16} /> Delete
                    </button>
                  </>
                )}
              </div>
              {isAuthenticated && (
                <button onClick={generateSummary} className="button-28">
                  {isGenerating ? <Loader2 size={16} className="loader" /> : <Sparkles size={16} />} Generate Summary
                </button>
              )}
            </div>
            {summary && (
              <div className="summary-container">
                <h2>Summary</h2>
                <ReactMarkdown>{summary}</ReactMarkdown>
              </div>
            )}
            <p className="help-text">
              Need help understanding this stuff? 
              <a href={`/pdfchat?pdfUrl=http://localhost:8000/${paper.document_url}`}> Ask questions here!</a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaperDetail;
