import { useState } from 'react';
import config from './config';
import businessmanImage from './businessman.jpeg';

function App() {
  const [idea, setIdea] = useState('');
  const [investmentResult, setInvestmentResult] = useState('');
  const [advice, setAdvice] = useState('');
  const [customIdea, setCustomIdea] = useState('');
  const [customIdeaResult, setCustomIdeaResult] = useState('');

  const handleGenerateIdea = async () => {
    try {
      const response = await fetch(`${config.backendUrl}/generate-idea`);
      const data = await response.json();
      setIdea(data.idea);
    } catch (error) {
      setIdea('Error generating idea');
    }
  };

  const handleCalculateInvestments = async () => {
    try {
      const response = await fetch(`${config.backendUrl}/calculate-investments`);
      if (!response.ok) {
        const data = await response.json();
        setInvestmentResult(data.error || 'Error calculating investments');
      } else {
        const data = await response.json();
        setInvestmentResult(data.investment);
      }
    } catch (error) {
      setInvestmentResult('Error contacting server');
    }
  };

  const handleGetAdvice = () => {
    setAdvice("My advice: don't fear mistakes — they open up new opportunities!");
  };

  const handleCustomIdea = () => {
    if (!customIdea.trim()) {
      setCustomIdeaResult('Please enter an idea.');
    } else {
      if (customIdea.length < 10) {
        setCustomIdeaResult('Error: idea is too short.');
      } else {
        setCustomIdeaResult(`Your idea: "${customIdea}" looks promising but needs refinement.`);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
      {/* Hero Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-10">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">Startup Idea Generator</h1>
          <p className="text-xl md:text-2xl mb-6">
            Unleash creativity and test your startup ideas.
          </p>
          <div className="flex justify-center">
            <img
              src={businessmanImage}
              alt="Businessman"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="space-y-6">
            <div>
              <button
                onClick={handleGenerateIdea}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg transition duration-200"
              >
                Generate Idea
              </button>
              {idea && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
                  <p className="text-blue-800 font-semibold">{idea}</p>
                </div>
              )}
            </div>

            <div>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-lg transition duration-200">
                Check Popularity
              </button>
            </div>

            <div>
              <button
                onClick={handleCalculateInvestments}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl text-lg transition duration-200"
              >
                Calculate Investments
              </button>
              {investmentResult && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
                  <p className="text-red-800 font-semibold">{investmentResult}</p>
                </div>
              )}
            </div>

            <div>
              <button
                onClick={handleGetAdvice}
                data-testid="advice-button"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl text-lg transition duration-200"
              >
                Get Advice
              </button>
              {advice && (
                <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded">
                  <p className="text-purple-800 font-semibold">{advice}</p>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold mt-6 mb-4">Submit Your Own Idea</h2>
              <div className="flex flex-col space-y-4">
                <input
                  type="text"
                  value={customIdea}
                  onChange={(e) => setCustomIdea(e.target.value)}
                  placeholder="Enter your idea"
                  className="w-full border border-gray-300 rounded-xl py-4 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={handleCustomIdea}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-4 rounded-xl text-lg transition duration-200"
                >
                  Check Your Idea
                </button>
                {customIdeaResult && (
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
                    <p className="text-yellow-800 font-semibold">{customIdeaResult}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          © 2025 Startup Idea Generator. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;