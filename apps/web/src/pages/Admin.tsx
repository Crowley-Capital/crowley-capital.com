import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Plus, Settings, FileText, Calendar, Sparkles, Loader2, CheckCircle, AlertCircle, X, Search, Trash2, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import CCVNavbar from '@/components/CCV/CCVNavbar';
import CCVFooter from '@/components/CCV/CCVFooter';
import { DEFAULT_TOPICS, FREQUENCY_OPTIONS } from '@/config/settings';
import { saveSettings, loadSettings, toCronExpression, fromCronExpression } from '@/lib/db';

// Generate time options from 7:00am to 9:00pm CST (1-hour intervals)
const TIME_OPTIONS = (() => {
  const options = [];
  for (let hour = 7; hour <= 21; hour++) {
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    const ampm = hour < 12 ? 'am' : 'pm';
    const value = `${hour.toString().padStart(2, '0')}:00`;
    const label = hour === 12 ? `12:00 pm (CST)` : `${displayHour}:00 ${ampm} (CST)`;
    options.push({ value, label });
  }
  return options;
})();

const AdminLogin: React.FC<{ onLogin: (password: string) => void }> = React.memo(({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    try {
      onLogin(password);
    } catch {
      setError('Invalid password');
      setPassword('');
    }
  }, [password, onLogin]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-slate-800 flex items-center justify-center px-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-light">Admin Access</CardTitle>
          <CardDescription>Enter your password to access the admin dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="text-lg py-3 transition-none"
                autoFocus
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            <Button type="submit" className="w-full bg-black hover:bg-slate-800 text-white py-3 text-lg transition-none">
              Login
            </Button>
            <p className="text-xs text-slate-500 text-center mt-4">
              Default password: admin123 (change this in production!)
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
});

const AdminDashboard: React.FC = React.memo(() => {
  const toastHook = useToast();
  
  // Memoize toast to prevent useCallback dependencies from changing
  const toast = useCallback(toastHook.toast, []);
  
  // Settings state
  const [frequency, setFrequency] = useState('weekly');
  const [day, setDay] = useState('monday');
  const DEFAULT_TIME = '09:00'; // Default: 9:00 am (CST)
  const [time, setTime] = useState<string>(DEFAULT_TIME);
  const [autoGenerate, setAutoGenerate] = useState(true);
  
  // Helper to get display label for current time value
  const getTimeLabel = (timeValue: string) => {
    const option = TIME_OPTIONS.find(opt => opt.value === timeValue);
    if (!option) return 'Select time';
    
    // Append "- Default" if it's the default value
    if (timeValue === DEFAULT_TIME) {
      return `${option.label} - Default`;
    }
    
    return option.label;
  };
  const [topics, setTopics] = useState(DEFAULT_TOPICS.join(', '));
  const [newTopic, setNewTopic] = useState('');
  
  // Brand Essence state
  const [positioning, setPositioning] = useState('');
  const [tone, setTone] = useState('');
  const [brandPillars, setBrandPillars] = useState('');

  // AI state
  const [isGenerating, setIsGenerating] = useState(() => {
    // Check localStorage on mount for persistent generation state
    const savedState = localStorage.getItem('articleGenerating');
    return savedState === 'true';
  });
  const [selectedTopic, setSelectedTopic] = useState('');
  // Removed: generatedArticle state (using background generation)
  const [apiConnected, setApiConnected] = useState<boolean | null>(null);
  
  // Scheduler state
  const [schedulerStatus, setSchedulerStatus] = useState<any>(null);
  const [isTestingScheduler, setIsTestingScheduler] = useState(false);
  
  // Generation input state
  const [isFeatured, setIsFeatured] = useState(false);

  // Articles state
  const [articles, setArticles] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Simple notification state
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  
  // Generation status state
  const [generationStatus, setGenerationStatus] = useState<'generating' | 'formatting' | 'metadata' | null>(null);

  // Helper function to update generation state persistently
  const updateGeneratingState = useCallback((generating: boolean) => {
    setIsGenerating(generating);
    if (generating) {
      localStorage.setItem('articleGenerating', 'true');
    } else {
      localStorage.removeItem('articleGenerating');
      localStorage.removeItem('generationJobId');
      localStorage.removeItem('generationStartTime');
    }
  }, []);

  // Auto-dismiss notification after 5 seconds
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  // Memoize parsed topics array to prevent unnecessary re-renders
  const topicsArray = useMemo(() => {
    return topics.split(',').map(t => t.trim()).filter(t => t.length > 0);
  }, [topics]);

  // Test OpenAI API connection via backend and load settings on mount
  useEffect(() => {
    // Test OpenAI connection through backend
    const testOpenAIConnection = async () => {
      const apiUrl = import.meta.env.API_URL;
      if (!apiUrl) {
        setApiConnected(false);
        return;
      }
      
      try {
        const response = await fetch(`${apiUrl}/openai/status`);
        if (response.ok) {
          const data = await response.json();
          setApiConnected(data.connected);
          if (!data.hasApiKey) {
            console.error('OpenAI API key not configured in backend');
          }
        } else {
          setApiConnected(false);
        }
      } catch (error) {
        console.error('OpenAI connection test failed:', error);
        setApiConnected(false);
      }
    };
    
    // Load scheduler status
    const loadSchedulerStatus = async () => {
      const apiUrl = import.meta.env.API_URL;
      if (!apiUrl) return;
      
      try {
        const response = await fetch(`${apiUrl}/scheduler/status`);
        if (response.ok) {
          const data = await response.json();
          setSchedulerStatus(data);
        }
      } catch (error) {
        console.error('Failed to load scheduler status:', error);
      }
    };
    
    testOpenAIConnection();
    loadSchedulerStatus();
    
    // Load settings from database
    loadSettings().then(settings => {
      if (settings) {
        setTopics(settings.topics.join(', '));
        setAutoGenerate(settings.auto);
        
        // Parse cron expression
        const parsed = fromCronExpression(settings.schedule);
        setFrequency(parsed.frequency);
        setDay(parsed.day);
        
        // Validate and set time - ensure it's within allowed range (7am-9pm)
        let loadedTime = parsed.time || DEFAULT_TIME;
        const [hours, minutes] = loadedTime.split(':').map(Number);
        const hourValue = hours || 0;
        
        // If time is outside allowed range (7am-9pm), reset to default
        if (hourValue < 7 || hourValue >= 21) {
          console.warn(`Loaded time ${loadedTime} is outside allowed range (7am-9pm CST). Resetting to default: ${DEFAULT_TIME}`);
          loadedTime = DEFAULT_TIME;
        }
        
        setTime(loadedTime);
        
        // Load Brand Essence fields
        if (settings.positioning) setPositioning(settings.positioning);
        if (settings.tone) setTone(settings.tone);
        if (settings.brand_pillars) setBrandPillars(settings.brand_pillars);
      } else {
        // No settings found - ensure default time is set
        setTime(DEFAULT_TIME);
      }
    }).catch(error => {
      console.error('Error loading settings:', error);
      // On error, ensure default time is set
      setTime(DEFAULT_TIME);
    });

    // Load articles (mock data for now - will be replaced with API call)
    loadArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  

  // Memoize filtered articles to prevent unnecessary re-renders
  const filteredArticles = useMemo(() => {
    let filtered = articles;

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(article => article.status === statusFilter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query) ||
        article.topic.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [articles, statusFilter, searchQuery]);

  const loadArticles = useCallback(async () => {
    const apiUrl = import.meta.env.API_URL;
    
    if (!apiUrl) {
      console.warn('Backend API not configured. Using empty articles list.');
      setArticles([]);
      return;
    }
    
    try {
      const response = await fetch(`${apiUrl}/articles`);
      
      if (!response.ok) {
        throw new Error('Failed to load articles');
      }
      
      const articlesData = await response.json();
      setArticles(articlesData);
    } catch (error) {
      console.error('Error loading articles:', error);
      // Set empty array on error to prevent UI issues
      setArticles([]);
    }
  }, []);

  const handleSaveSettings = async () => {
    try {
      // Ensure time is set (fallback to default if empty)
      const timeToSave = time || DEFAULT_TIME;
      console.log(`💾 Saving settings with time: ${timeToSave} (${getTimeLabel(timeToSave)})`);
      
      // Convert frequency/day/time to cron expression
      const schedule = toCronExpression(frequency, day, timeToSave);
      console.log(`📅 Cron expression: ${schedule}`);
      
      // Save to database
      await saveSettings({
        topics: topicsArray,
        schedule,
        auto: autoGenerate,
        positioning,
        tone,
        brand_pillars: brandPillars
      });
      
      // Reload scheduler status
      const apiUrl = import.meta.env.API_URL;
      if (apiUrl) {
        const response = await fetch(`${apiUrl}/scheduler/status`);
        if (response.ok) {
          const data = await response.json();
          setSchedulerStatus(data);
        }
      }
      
      toast({
        title: 'Settings Saved',
        description: 'Your AI generation settings have been saved successfully.',
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: 'Settings Saved (Locally)',
        description: 'Settings saved to browser storage. Backend API not configured.',
        variant: 'default',
      });
    }
  };

  const handleTestScheduler = async () => {
    const apiUrl = import.meta.env.API_URL;
    if (!apiUrl) {
      toast({
        title: 'Backend Not Configured',
        description: 'Backend API is not configured.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsTestingScheduler(true);
    
    try {
      const response = await fetch(`${apiUrl}/scheduler/trigger`, {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Failed to trigger scheduler');
      }
      
      const data = await response.json();
      
      toast({
        title: 'Scheduler Triggered!',
        description: data.message,
      });
    } catch (error) {
      console.error('Error triggering scheduler:', error);
      toast({
        title: 'Trigger Failed',
        description: 'Failed to trigger scheduler.',
        variant: 'destructive',
      });
    } finally {
      setIsTestingScheduler(false);
    }
  };

  // Polling function that can be used for both new and resumed generations
  const startPolling = useCallback((jobId: string, startTime: number, initialArticleCount: number) => {
    const maxDuration = 600000; // 10 minutes
    let pollCount = 0;
    const maxPolls = 60; // Poll for up to 10 minutes (60 * 10 seconds)
    
    const pollInterval = setInterval(async () => {
      pollCount++;
      
      // Check if we've exceeded max duration
      if (Date.now() - startTime >= maxDuration) {
        clearInterval(pollInterval);
        updateGeneratingState(false);
        setGenerationStatus(null);
        setNotificationMessage('Generation taking longer than expected. Please check back in a few minutes.');
        setShowNotification(true);
        return;
      }
      
      // Fetch generation status
      const apiUrl = import.meta.env.API_URL;
      try {
        const statusResponse = await fetch(`${apiUrl}/articles/status/${jobId}`);
        if (statusResponse.ok) {
          const statusData = await statusResponse.json();
          
          // Check for error status
          if (statusData.step === 'error') {
            clearInterval(pollInterval);
            updateGeneratingState(false);
            setGenerationStatus(null);
            toast({
              title: 'Generation Failed',
              description: statusData.message || 'Article generation failed. Please try again.',
              variant: 'destructive',
            });
            return;
          }
          
          setGenerationStatus(statusData.step);
        }
      } catch (err) {
        console.log('Status check failed:', err);
      }
      
      // Fetch latest articles
      const response = await fetch(`${apiUrl}/articles`);
      const latestArticles = await response.json();
      
      // Check if a new article was added
      if (latestArticles.length > initialArticleCount) {
        clearInterval(pollInterval);
        updateGeneratingState(false);
        setGenerationStatus(null);
        setArticles(latestArticles);
        setNotificationMessage('Article Published! ✨ Your new article is now live.');
        setShowNotification(true);
        return;
      }
      
      // Update articles list
      setArticles(latestArticles);
      
      // Stop polling after max attempts
      if (pollCount >= maxPolls) {
        clearInterval(pollInterval);
        updateGeneratingState(false);
        setGenerationStatus(null);
        setNotificationMessage('Generation taking longer than expected. Please check back in a few minutes.');
        setShowNotification(true);
      }
    }, 10000); // Poll every 10 seconds
    
    // Store interval ID for cleanup
    return pollInterval;
  }, [toast, updateGeneratingState]);

  // Resume polling function (used on page reload)
  const resumePolling = useCallback((jobId: string, elapsed: number) => {
    const startTime = Date.now() - elapsed;
    const initialArticleCount = articles.length;
    startPolling(jobId, startTime, initialArticleCount);
  }, [articles.length, startPolling]);

  // Resume polling if generation was in progress (page reload/navigation)
  useEffect(() => {
    const jobId = localStorage.getItem('generationJobId');
    const startTime = localStorage.getItem('generationStartTime');
    
    if (isGenerating && jobId && startTime) {
      const elapsed = Date.now() - parseInt(startTime);
      const maxDuration = 600000; // 10 minutes
      
      // If less than 10 minutes have passed, resume polling
      if (elapsed < maxDuration) {
        console.log('Resuming article generation polling...');
        resumePolling(jobId, elapsed);
      } else {
        // Generation timed out
        console.log('Generation timed out, resetting state');
        updateGeneratingState(false);
        setGenerationStatus(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount - only dependencies are stable

  const handleGenerateArticle = useCallback(async () => {
    // API key check removed - handled by backend
    updateGeneratingState(true);

    try {
      // Check if topics are available
      if (topicsArray.length === 0) {
        toast({
          title: 'No Topics Available',
          description: 'Please add topics in AI Settings before generating articles.',
          variant: 'destructive',
        });
        updateGeneratingState(false);
        return;
      }
      
      // Select topic (use selected or random)
      const topic = selectedTopic || topicsArray[Math.floor(Math.random() * topicsArray.length)];
      
      const params = {
        inputType: 'topic',
        topic: topic,
        featured: isFeatured
      };
      
      // Call backend to generate in background
      const apiUrl = import.meta.env.API_URL;
      const response = await fetch(`${apiUrl}/articles/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
      });

      const data = await response.json();
      const jobId = data.jobId;
      
      // Save generation state to localStorage
      const startTime = Date.now();
      localStorage.setItem('generationJobId', jobId);
      localStorage.setItem('generationStartTime', startTime.toString());
      
      // Show simple notification
      setNotificationMessage('Article generation started! Your article will be published within the next 5-10 minutes.');
      setShowNotification(true);
      
      // Set initial status
      setGenerationStatus('generating');

      // Start polling
      const initialArticleCount = articles.length;
      startPolling(jobId, startTime, initialArticleCount);
      
    } catch (error: any) {
      console.error('Generation error:', error);
      toast({
        title: 'Generation Failed',
        description: error.message || 'Failed to start article generation.',
        variant: 'destructive',
      });
      updateGeneratingState(false);
    }
  }, [topicsArray, selectedTopic, isFeatured, toast, articles.length, updateGeneratingState, startPolling]);


  const addTopic = () => {
    if (newTopic.trim()) {
      setTopics(topics + ', ' + newTopic.trim());
      setNewTopic('');
    }
  };

  const removeTopic = (topicToRemove: string) => {
    const updatedTopics = topicsArray.filter(t => t !== topicToRemove);
    setTopics(updatedTopics.join(', '));
  };

  const handleDeleteArticle = useCallback(async (articleId: number) => {
    const apiUrl = import.meta.env.API_URL;
    
    if (!apiUrl) {
      toast({
        title: 'Backend Not Configured',
        description: 'Backend API is not configured.',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      const response = await fetch(`${apiUrl}/articles/${articleId}`, { 
        method: 'DELETE' 
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete article');
      }
      
      // Remove from local state
      setArticles(prev => prev.filter(article => article.id !== articleId));
      
      toast({
        title: 'Article Deleted',
        description: 'The article has been permanently deleted.',
      });
    } catch (error) {
      toast({
        title: 'Delete Failed',
        description: 'Failed to delete article from database.',
        variant: 'destructive',
      });
    }
  }, [toast]);


  const getStatusBadgeColor = useCallback((status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-600 text-white';
      case 'scheduled':
        return 'bg-blue-600 text-white';
      case 'draft':
        return 'bg-slate-500 text-white';
      default:
        return 'bg-slate-300 text-slate-900';
    }
  }, []);

  const formatDate = useCallback((dateString: string | null) => {
    if (!dateString) return 'Not published';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <CCVNavbar />
      
      {/* Simple Notification Popup */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-[9999] max-w-md">
          <div className="bg-white text-slate-900 rounded-lg shadow-2xl border-2 border-slate-300 p-6 pr-12 transition-none">
            <button
              onClick={() => setShowNotification(false)}
              className="absolute top-2 right-2 text-slate-500 hover:text-slate-900 p-1 rounded-md hover:bg-slate-100 transition-none"
            >
              <X className="h-5 w-5" />
            </button>
            <p className="text-base font-light leading-relaxed">{notificationMessage}</p>
          </div>
        </div>
      )}
      
      {/* Header - Added pt-20 to prevent navbar overlap */}
      <div className="bg-gradient-to-br from-black via-slate-900 to-slate-800 py-12 pt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div>
            <h1 className="text-4xl font-light text-white mb-2">Admin Dashboard</h1>
            <p className="text-slate-300 text-lg">Manage your blog content and AI generation settings</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <Tabs defaultValue="generate" className="space-y-8">
          <div className="flex items-center justify-between">
            <TabsList className="bg-white border-2 border-slate-200 p-1">
              <TabsTrigger value="generate" className="data-[state=active]:bg-black data-[state=active]:text-white">
                <Sparkles className="h-4 w-4 mr-2" />
                Generate
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-black data-[state=active]:text-white">
                <Settings className="h-4 w-4 mr-2" />
                AI Settings
              </TabsTrigger>
              <TabsTrigger value="articles" className="data-[state=active]:bg-black data-[state=active]:text-white">
                <FileText className="h-4 w-4 mr-2" />
                All Articles
              </TabsTrigger>
            </TabsList>
            
            {/* API Connection Status Badge - Inline with tabs */}
            {apiConnected === null ? (
              <Badge className="bg-slate-500 text-white px-4 py-2 text-sm">
                <Loader2 className="h-3 w-3 mr-2 animate-spin" />
                Checking...
              </Badge>
            ) : apiConnected ? (
              <Badge className="bg-green-600 text-white px-4 py-2 text-sm">
                <CheckCircle className="h-3 w-3 mr-2" />
                OpenAI API Connected
              </Badge>
            ) : (
              <Badge className="bg-red-600 text-white px-4 py-2 text-sm">
                <AlertCircle className="h-3 w-3 mr-2" />
                Not Connected
              </Badge>
            )}
          </div>

          {/* AI Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-light">Brand Essence</CardTitle>
                <CardDescription>Define your brand's core identity and voice</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="positioning">Positioning</Label>
                  <Textarea
                    id="positioning"
                    placeholder="Describe your brand's unique market position..."
                    value={positioning}
                    onChange={(e) => setPositioning(e.target.value)}
                    className="min-h-[100px] transition-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tone">Tone</Label>
                  <Textarea
                    id="tone"
                    placeholder="Describe your brand's communication tone and style..."
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="min-h-[100px] transition-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brand-pillars">Brand Pillars</Label>
                  <Textarea
                    id="brand-pillars"
                    placeholder="List your brand's core pillars and values..."
                    value={brandPillars}
                    onChange={(e) => setBrandPillars(e.target.value)}
                    className="min-h-[100px] transition-none"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-light">Generation Frequency</CardTitle>
                    <CardDescription>Configure how often AI generates new articles</CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <Label htmlFor="auto-generate" className="text-sm font-medium text-slate-700 cursor-pointer">
                      Automatic Generation
                    </Label>
                    <Switch 
                      id="auto-generate" 
                      checked={autoGenerate} 
                      onCheckedChange={setAutoGenerate}
                      className="data-[state=checked]:bg-green-600"
                    />
                  </div>
                </div>
                
                {/* Scheduler Status Banner */}
                {schedulerStatus && (
                  <div className={`mt-4 p-4 rounded-lg border-2 ${
                    schedulerStatus.active && autoGenerate 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {schedulerStatus.active && autoGenerate ? (
                          <>
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <div>
                              <p className="text-sm font-medium text-green-900">
                                Scheduler Active
                              </p>
                              <p className="text-xs text-green-700 mt-1">
                                Next run: {schedulerStatus.nextRun}
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="h-5 w-5 text-slate-500" />
                            <div>
                              <p className="text-sm font-medium text-slate-700">
                                Scheduler Inactive
                              </p>
                              <p className="text-xs text-slate-600 mt-1">
                                {!autoGenerate 
                                  ? 'Enable Automatic Generation to activate' 
                                  : 'Configure settings and save to activate'}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                      
                      {schedulerStatus.active && (
                        <Button
                          onClick={handleTestScheduler}
                          disabled={isTestingScheduler}
                          variant="outline"
                          size="sm"
                          className="border-green-200 text-green-700 hover:bg-green-100 transition-none"
                        >
                          {isTestingScheduler ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Testing...
                            </>
                          ) : (
                            <>
                              <Sparkles className="h-4 w-4 mr-2" />
                              Test Now
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                {/* Daily - Frequency and Time */}
                {frequency === 'daily' && (
                  <div className="flex items-end gap-4">
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="frequency">Frequency</Label>
                      <Select value={frequency} onValueChange={setFrequency}>
                        <SelectTrigger className="transition-none">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {FREQUENCY_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex-1 space-y-2">
                      <Label htmlFor="time" className="flex items-center gap-2">
                        Time <span className="text-xs text-slate-500 font-normal">(CST)</span>
                      </Label>
                      <Select value={time || DEFAULT_TIME} onValueChange={setTime}>
                        <SelectTrigger className="transition-none">
                          <SelectValue>
                            {(() => {
                              const currentTime = time || DEFAULT_TIME;
                              const option = TIME_OPTIONS.find(opt => opt.value === currentTime);
                              if (!option) return '9:00 am (CST) - Default';
                              return currentTime === DEFAULT_TIME ? `${option.label} - Default` : option.label;
                            })()}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {TIME_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.value === DEFAULT_TIME ? `${option.label} - Default` : option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Weekly or Biweekly - Frequency, Day and Time */}
                {(frequency === 'weekly' || frequency === 'biweekly') && (
                  <div className="flex items-end gap-4">
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="frequency">Frequency</Label>
                      <Select value={frequency} onValueChange={setFrequency}>
                        <SelectTrigger className="transition-none">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {FREQUENCY_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex-1 space-y-2">
                      <Label htmlFor="day">Day of Week</Label>
                      <Select value={day} onValueChange={setDay}>
                        <SelectTrigger className="transition-none">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monday">Monday</SelectItem>
                          <SelectItem value="tuesday">Tuesday</SelectItem>
                          <SelectItem value="wednesday">Wednesday</SelectItem>
                          <SelectItem value="thursday">Thursday</SelectItem>
                          <SelectItem value="friday">Friday</SelectItem>
                          <SelectItem value="saturday">Saturday</SelectItem>
                          <SelectItem value="sunday">Sunday</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex-1 space-y-2">
                      <Label htmlFor="time" className="flex items-center gap-2">
                        Time <span className="text-xs text-slate-500 font-normal">(CST)</span>
                      </Label>
                      <Select value={time || DEFAULT_TIME} onValueChange={setTime}>
                        <SelectTrigger className="transition-none">
                          <SelectValue>
                            {(() => {
                              const currentTime = time || DEFAULT_TIME;
                              const option = TIME_OPTIONS.find(opt => opt.value === currentTime);
                              if (!option) return '9:00 am (CST) - Default';
                              return currentTime === DEFAULT_TIME ? `${option.label} - Default` : option.label;
                            })()}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {TIME_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.value === DEFAULT_TIME ? `${option.label} - Default` : option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Monthly - Frequency, Date and Time */}
                {frequency === 'monthly' && (
                  <div className="flex items-end gap-4">
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="frequency">Frequency</Label>
                      <Select value={frequency} onValueChange={setFrequency}>
                        <SelectTrigger className="transition-none">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {FREQUENCY_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex-1 space-y-2">
                      <Label htmlFor="date">Day of Month</Label>
                      <Input
                        id="date"
                        type="number"
                        min="1"
                        max="28"
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                        placeholder="1-28"
                      />
                    </div>

                    <div className="flex-1 space-y-2">
                      <Label htmlFor="time" className="flex items-center gap-2">
                        Time <span className="text-xs text-slate-500 font-normal">(CST)</span>
                      </Label>
                      <Select value={time || DEFAULT_TIME} onValueChange={setTime}>
                        <SelectTrigger className="transition-none">
                          <SelectValue>
                            {(() => {
                              const currentTime = time || DEFAULT_TIME;
                              const option = TIME_OPTIONS.find(opt => opt.value === currentTime);
                              if (!option) return '9:00 am (CST) - Default';
                              return currentTime === DEFAULT_TIME ? `${option.label} - Default` : option.label;
                            })()}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {TIME_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.value === DEFAULT_TIME ? `${option.label} - Default` : option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-light">Article Topics</CardTitle>
                <CardDescription>Topics that AI will use to generate articles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {topicsArray.map((topic) => (
                    <Badge 
                      key={topic} 
                      variant="secondary" 
                      className="px-3 py-1.5 flex items-center gap-2 hover:bg-slate-300 transition-none"
                    >
                      {topic}
                      <button
                        onClick={() => removeTopic(topic)}
                        className="hover:bg-slate-400 rounded-full p-0.5 transition-none"
                        aria-label={`Remove ${topic}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Enter new topic..."
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTopic()}
                    className="max-w-xs"
                  />
                  <Button onClick={addTopic} variant="outline" className="whitespace-nowrap transition-none">
                    <Plus className="h-4 w-4 mr-2" />
                    New Topic
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button onClick={handleSaveSettings} className="bg-black hover:bg-slate-800 text-white px-8 transition-none">
                Save Settings
              </Button>
            </div>
          </TabsContent>

          {/* Generate Tab */}
          <TabsContent value="generate" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-light flex items-center gap-2">
                  <Sparkles className="h-6 w-6" />
                  Generate New Article
                </CardTitle>
                <CardDescription>Use AI to automatically create a new blog article</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Simple Layout */}
                <div className="space-y-6">
                  {/* Top Row - Topic and Featured */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Topic Selection */}
                    <div className="space-y-2">
                      <Label htmlFor="topic-select">Select Topic</Label>
                      <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                        <SelectTrigger id="topic-select">
                          <SelectValue placeholder="Random topic from your settings" />
                        </SelectTrigger>
                        <SelectContent>
                          {topicsArray.map((topic) => (
                            <SelectItem key={topic} value={topic}>
                              {topic}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-slate-500">
                        Leave empty to randomly select from your configured topics
                      </p>
                    </div>

                    {/* Featured Toggle */}
                    <div className="space-y-2">
                      <Label htmlFor="featured-toggle">Featured</Label>
                      <div className="flex items-center gap-3 h-10">
                        <Switch
                          id="featured-toggle"
                          checked={isFeatured}
                          onCheckedChange={setIsFeatured}
                          className="data-[state=checked]:bg-black"
                        />
                        <span className="text-sm text-slate-600">Generate image (featured only)</span>
                      </div>
                    </div>
                  </div>

                  {/* Generate Button - At Bottom */}
                  <Button 
                    onClick={handleGenerateArticle}
                    className="w-full bg-black hover:bg-slate-800 text-white py-6 text-lg transition-none disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isGenerating || !apiConnected}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        {generationStatus === 'generating' && 'Please wait... Generating Article'}
                        {generationStatus === 'formatting' && 'Please wait... Formatting Article'}
                        {generationStatus === 'metadata' && 'Please wait... Generating Metadata'}
                        {!generationStatus && 'Please wait... Processing...'}
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5 mr-2" />
                        Generate Article Now
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Generated Article Preview */}
            
          </TabsContent>

          {/* All Articles Tab */}
          <TabsContent value="articles" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-light">All Articles</CardTitle>
                <CardDescription>Manage and review all blog articles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Filters and Search */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search articles by title, description, or topic..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Results Count */}
                <div className="text-sm text-slate-600">
                  Showing {filteredArticles.length} of {articles.length} articles
                </div>

                {/* Articles Accordion */}
                {filteredArticles.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">No articles found</p>
                    <p className="text-sm text-slate-400 mt-2">
                      {searchQuery || statusFilter !== 'all' 
                        ? 'Try adjusting your filters' 
                        : 'Generate your first article to get started'}
                    </p>
                  </div>
                ) : (
                  <Accordion type="single" collapsible className="space-y-4">
                    {filteredArticles.map((article) => (
                      <AccordionItem 
                        key={article.id} 
                        value={`article-${article.id}`}
                        className="border-2 border-slate-200 rounded-xl overflow-hidden"
                      >
                        <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 hover:no-underline">
                          <div className="flex items-start justify-between w-full pr-4 gap-4">
                            {/* Article Thumbnail */}
                            {article.image_url && (
                              <div className="flex-shrink-0">
                                <div className="w-32 h-20 rounded-lg overflow-hidden bg-slate-900">
                                  <img 
                                    src={article.image_url} 
                                    alt={article.image_alt || article.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </div>
                            )}
                            
                            <div className="flex-1 text-left space-y-2">
                              <div className="flex items-center gap-3 flex-wrap">
                                <Badge className={getStatusBadgeColor(article.status)}>
                                  {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                                </Badge>
                                <span className="text-xs text-slate-500">
                                  {formatDate(article.date_published)}
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {article.topic}
                                </Badge>
                              </div>
                              <h3 className="text-lg font-semibold text-slate-900">
                                {article.title}
                              </h3>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4">
                          <div className="space-y-4 pt-4 border-t-2 border-slate-100">   
                            <div>
                              <div 
                                className="text-sm text-slate-600 mt-1"
                                dangerouslySetInnerHTML={{ 
                                  __html: (() => {
                                    // Extract Quick Answer content without the title
                                    const parser = new DOMParser();
                                    const doc = parser.parseFromString(article.article, 'text/html');
                                    const answerBox = doc.querySelector('.answer-box');
                                    if (answerBox) {
                                      // Remove the h2 title
                                      const h2 = answerBox.querySelector('h2');
                                      if (h2) h2.remove();
                                      return answerBox.innerHTML;
                                    }
                                    return article.description || 'No quick answer available';
                                  })()
                                }}
                              />
                            </div>

                            <div className="flex gap-3 pt-2">
                              <Button
                                variant="outline"
                                onClick={() => window.open(`/articles/${article.url}`, '_blank')}
                                className="flex-1 border-2 border-slate-200 text-slate-700 hover:bg-slate-50 transition-none"
                              >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                View Article
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => handleDeleteArticle(article.id)}
                                className="flex-1 border-2 border-red-200 text-red-700 hover:bg-red-50 transition-none"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}

              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <CCVFooter />
    </div>
  );
});

const Admin: React.FC = () => {
  const { isAuthenticated, isLoading, login } = useAdminAuth();

  const handleLogin = useCallback((password: string) => {
    const success = login(password);
    if (!success) {
      throw new Error('Invalid password');
    }
  }, [login]);

  // Show nothing while checking authentication
  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <AdminDashboard />;
};

export default Admin;
