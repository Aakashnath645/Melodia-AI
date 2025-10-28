
import React, { useState } from 'react';
import { generateImage } from '../services/geminiService';

const ImageGenerator: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('A synthwave landscape with a glowing piano keyboard river');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim() || isLoading) return;

        setIsLoading(true);
        setError(null);
        setImageUrl(null);

        try {
            const base64Image = await generateImage(prompt);
            setImageUrl(`data:image/jpeg;base64,${base64Image}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred while generating the image.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-4 md:p-6 bg-gray-800 rounded-2xl shadow-2xl flex flex-col gap-6">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., An electric guitar made of stars"
                    className="flex-grow bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow duration-200"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:bg-purple-900 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating...
                        </>
                    ) : 'Generate Art'}
                </button>
            </form>

            {error && <div className="text-red-400 bg-red-900/50 p-3 rounded-lg text-center">{error}</div>}

            <div className="w-full aspect-square bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden">
                {isLoading && (
                    <div className="text-center text-gray-400">
                        <p className="text-lg">Creating your masterpiece...</p>
                        <p className="text-sm">This can take a moment.</p>
                    </div>
                )}
                {imageUrl && (
                     <img src={imageUrl} alt={prompt} className="w-full h-full object-cover animate-fade-in" />
                )}
                {!isLoading && !imageUrl && (
                    <div className="text-center text-gray-400 p-8">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="mt-2">Your generated image will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageGenerator;
