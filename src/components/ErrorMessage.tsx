import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface ErrorMessageProps {
  error: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, onRetry }) => {
  return (
    <div className="card border-alert-200 bg-alert-50">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-alert-600 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-medium text-alert-900 mb-1">
            Something went wrong
          </h3>
          <p className="text-sm text-alert-700 mb-4">
            {error}
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-2 px-3 py-2 bg-alert-100 hover:bg-alert-200 text-alert-700 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};