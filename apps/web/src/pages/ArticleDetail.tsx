import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import CCVNavbar from '@/components/CCV/CCVNavbar';
import CCVFooter from '@/components/CCV/CCVFooter';
import '@/styles/article.css';

interface Article {
  id: number;
  title: string;
  description: string;
  article: string;
  url: string;
  topic: string | null;
  author: string;
  date_published: string | null;
  read_time: string | null;
  featured: boolean;
}

const ArticleDetail = () => {
  const { id: urlSlug } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const apiUrl = import.meta.env.API_URL;
      
      if (!apiUrl) {
        setError('Backend API not configured');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/articles`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }

        const data: Article[] = await response.json();
        
        // Find article by URL slug
        const foundArticle = data.find(a => a.url === urlSlug);
        
        if (!foundArticle) {
          setError('Article not found');
          setLoading(false);
          return;
        }

        setArticle(foundArticle);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Failed to load article');
        setLoading(false);
      }
    };

    fetchArticle();
  }, [urlSlug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <CCVNavbar />
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-slate-400 mb-4" />
          <p className="text-slate-600 text-lg">Loading article...</p>
        </div>
        <CCVFooter />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-white">
        <CCVNavbar />
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 text-center max-w-2xl mx-auto my-20">
          <p className="text-red-900 text-lg mb-4">{error || 'Article not found'}</p>
          <Link to="/articles" className="text-blue-600 hover:underline">
            ← Back to Articles
          </Link>
        </div>
        <CCVFooter />
      </div>
    );
  }

// The actual component starts above with the fetched data
  return (
    <div className="min-h-screen bg-white">
      <CCVNavbar />
      
      {/* Article Header - Crowley Capital Style */}
      <div className="relative bg-gradient-to-br from-black via-slate-900 to-slate-800 py-20 px-6 lg:px-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <Link 
            to="/articles" 
            className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            Back to Articles
          </Link>
          
          <div className="flex items-center gap-3 mb-6">
            {article.topic && (
              <Badge className="bg-white text-black hover:bg-slate-100 rounded-lg px-4 py-1.5 text-sm">
                {article.topic}
              </Badge>
            )}
            {article.featured && (
              <Badge className="bg-white/20 text-white hover:bg-white/30 rounded-lg px-4 py-1.5 text-sm">
                Featured
              </Badge>
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-8 tracking-tight leading-tight">
            {article.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-10 font-light leading-relaxed">
            {article.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 mb-8">
            <div className="flex items-center gap-2">
              <span className="font-medium text-white">By {article.author}</span>
            </div>
            {article.date_published && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(article.date_published).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </div>
            )}
            {article.read_time && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {article.read_time}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-slate-50 py-16 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">

          {/* Article Content */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100 mb-12">
            <style>{`
              /* Quick Answer Box */
              .article-content .answer-box {
                background: linear-gradient(to bottom right, rgb(239 246 255), rgb(248 250 252));
                border: 2px solid rgb(191 219 254);
                border-radius: 1rem;
                padding: 2rem;
                margin: 0 0 3rem 0;
              }
              .article-content .answer-box h2 {
                font-size: 1.5rem;
                font-weight: 500;
                color: rgb(0 0 0);
                margin-bottom: 1rem;
                margin-top: 0;
                border: none !important;
                padding-bottom: 0 !important;
              }
              .article-content .answer-box p {
                color: rgb(51 65 85);
                font-weight: 300;
                line-height: 1.75;
                margin-bottom: 0;
              }
              
              /* Pro Tip Box */
              .article-content .pro-tip {
                background: linear-gradient(to right, rgb(240 253 244), rgb(236 253 245));
                border-left: 4px solid rgb(22 163 74);
                padding: 1.5rem;
                margin: 2.5rem 0;
                border-radius: 0 0.75rem 0.75rem 0;
              }
              .article-content .pro-tip strong {
                color: rgb(20 83 45);
                font-weight: 500;
              }
              
              /* Headings */
              .article-content h2 {
                font-size: 1.875rem;
                font-weight: 300;
                color: rgb(0 0 0);
                margin-top: 3rem;
                margin-bottom: 1.5rem;
                padding-bottom: 0.75rem;
                border-bottom: 1px solid rgb(226 232 240);
                letter-spacing: -0.025em;
              }
              .article-content h3 {
                font-size: 1.5rem;
                font-weight: 400;
                color: rgb(0 0 0);
                margin-top: 2rem;
                margin-bottom: 1rem;
              }
              
              /* Lists */
              .article-content ul {
                list-style-type: disc;
                padding-left: 1.5rem;
                margin: 1.5rem 0;
              }
              .article-content ol {
                list-style-type: decimal;
                padding-left: 1.5rem;
                margin: 1.5rem 0;
              }
              .article-content li {
                color: rgb(51 65 85);
                font-weight: 300;
                font-size: 1.125rem;
                line-height: 1.75;
                margin-bottom: 0.75rem;
                padding-left: 0.5rem;
              }
              
              /* Tables */
              .article-content table {
                width: 100%;
                border-collapse: collapse;
                margin: 2rem 0;
                border: 1px solid rgb(226 232 240);
                border-radius: 0.5rem;
                overflow: hidden;
              }
              .article-content thead {
                background-color: rgb(241 245 249);
              }
              .article-content th {
                padding: 1rem 1.5rem;
                text-align: left;
                font-weight: 500;
                color: rgb(0 0 0);
                border-bottom: 2px solid rgb(203 213 225);
                font-size: 0.95rem;
              }
              .article-content td {
                padding: 1rem 1.5rem;
                border-bottom: 1px solid rgb(226 232 240);
                color: rgb(51 65 85);
                font-weight: 300;
                font-size: 0.95rem;
              }
              .article-content tbody tr:hover {
                background-color: rgb(248 250 252);
              }
              .article-content tbody tr:last-child td {
                border-bottom: none;
              }
              
              /* Paragraphs */
              .article-content p {
                color: rgb(51 65 85);
                font-weight: 300;
                font-size: 1.125rem;
                line-height: 1.75;
                margin-bottom: 1.5rem;
              }
              
              /* FAQ Accordion */
              .article-content .faq-accordion {
                margin: 2rem 0;
              }
              .article-content .faq-item {
                border: 1px solid rgb(226 232 240);
                border-radius: 0.5rem;
                margin-bottom: 1rem;
                overflow: hidden;
                transition: all 0.2s ease;
              }
              .article-content .faq-item:hover {
                border-color: rgb(203 213 225);
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
              }
              .article-content .faq-question {
                padding: 1.25rem 1.5rem;
                font-size: 1.125rem;
                font-weight: 500;
                color: rgb(0 0 0);
                cursor: pointer;
                list-style: none;
                background-color: rgb(248 250 252);
                transition: background-color 0.2s ease;
                position: relative;
                padding-right: 3rem;
              }
              .article-content .faq-question::-webkit-details-marker {
                display: none;
              }
              .article-content .faq-question::after {
                content: '+';
                position: absolute;
                right: 1.5rem;
                top: 50%;
                transform: translateY(-50%);
                font-size: 1.5rem;
                font-weight: 300;
                transition: transform 0.2s ease;
              }
              .article-content .faq-item[open] .faq-question::after {
                content: '−';
              }
              .article-content .faq-item[open] .faq-question {
                background-color: rgb(241 245 249);
              }
              .article-content .faq-question:hover {
                background-color: rgb(241 245 249);
              }
              .article-content .faq-answer {
                padding: 1.25rem 1.5rem;
                background-color: rgb(255 255 255);
              }
              .article-content .faq-answer p {
                margin-bottom: 0.75rem;
                font-size: 1rem;
              }
              .article-content .faq-answer p:last-child {
                margin-bottom: 0;
              }
            `}</style>
            <div 
              dangerouslySetInnerHTML={{ __html: article.article }}
              className="article-content prose prose-lg max-w-none
                         prose-headings:font-light prose-headings:text-black prose-headings:tracking-tight
                         prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8
                         prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-12 prose-h2:pb-3 prose-h2:border-b prose-h2:border-slate-200
                         prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8 prose-h3:font-medium
                         prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg prose-p:font-light
                         prose-ul:my-6 prose-ul:space-y-3 prose-ul:list-disc prose-ul:pl-6
                         prose-ol:my-6 prose-ol:space-y-3 prose-ol:list-decimal prose-ol:pl-6
                         prose-li:text-slate-700 prose-li:text-base prose-li:leading-relaxed prose-li:font-light prose-li:pl-2
                         prose-strong:text-black prose-strong:font-medium
                         prose-a:text-black prose-a:underline prose-a:font-medium hover:prose-a:text-slate-700 prose-a:transition-colors
                         prose-blockquote:border-l-2 prose-blockquote:border-slate-300 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-slate-600 prose-blockquote:font-light
                         prose-code:bg-slate-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:text-slate-800 prose-code:font-mono
                         prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:p-6 prose-pre:rounded-xl prose-pre:overflow-x-auto prose-pre:shadow-lg"
            />
          </div>

          {/* Back to Articles Link */}
          <div className="text-center">
            <Link 
              to="/articles"
              className="inline-flex items-center gap-2 text-black hover:text-slate-700 font-medium transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to All Articles
            </Link>
          </div>
        </div>
      </div>

      <CCVFooter />
    </div>
  );
};

export default ArticleDetail;
