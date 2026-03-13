import React from 'react';
import { AlertTriangle, TrendingUp, TrendingDown, Minus, Thermometer } from 'lucide-react';
import { TransitionAlert } from '../types';

interface TransitionAlertsProps {
  alerts: TransitionAlert[];
}

const getSeasonIcon = (type: string) => {
  switch (type) {
    case 'spring':
      return '🌸';
    case 'summer':
      return '☀️';
    case 'fall':
      return '🍂';
    case 'winter':
      return '❄️';
    default:
      return '🌡️';
  }
};

const getSeasonColor = (type: string) => {
  switch (type) {
    case 'spring':
      return 'bg-green-50 border-green-200 text-green-800';
    case 'summer':
      return 'bg-yellow-50 border-yellow-200 text-yellow-800';
    case 'fall':
      return 'bg-orange-50 border-orange-200 text-orange-800';
    case 'winter':
      return 'bg-blue-50 border-blue-200 text-blue-800';
    default:
      return 'bg-gray-50 border-gray-200 text-gray-800';
  }
};

const getRecommendationIcon = (recommendation: string) => {
  switch (recommendation) {
    case 'increase':
      return <TrendingUp className="w-4 h-4 text-success-600" />;
    case 'decrease':
      return <TrendingDown className="w-4 h-4 text-alert-600" />;
    case 'maintain':
      return <Minus className="w-4 h-4 text-gray-600" />;
    default:
      return <Minus className="w-4 h-4 text-gray-600" />;
  }
};

const getRecommendationColor = (recommendation: string) => {
  switch (recommendation) {
    case 'increase':
      return 'text-success-700 bg-success-50';
    case 'decrease':
      return 'text-alert-700 bg-alert-50';
    case 'maintain':
      return 'text-gray-700 bg-gray-50';
    default:
      return 'text-gray-700 bg-gray-50';
  }
};

export const TransitionAlerts: React.FC<TransitionAlertsProps> = ({ alerts }) => {
  if (alerts.length === 0) {
    return (
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <Thermometer className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Seasonal Transition Alerts
          </h3>
        </div>
        <div className="text-center py-8 text-gray-500">
          <AlertTriangle className="w-8 h-8 mx-auto mb-3 opacity-50" />
          <p>No seasonal transitions detected</p>
          <p className="text-sm mt-1">Check back as weather patterns develop</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-6">
        <Thermometer className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">
          Seasonal Transition Alerts
        </h3>
      </div>

      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className={`border rounded-lg p-4 ${getSeasonColor(alert.type)}`}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">{getSeasonIcon(alert.type)}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold capitalize">
                    {alert.type} Transition
                  </h4>
                  <div className="px-2 py-1 bg-white/50 rounded-full text-xs font-medium">
                    {alert.confidence}% confident
                  </div>
                </div>
                <p className="text-sm mb-4">{alert.message}</p>

                <div className="space-y-3">
                  <h5 className="font-medium text-sm">Product Recommendations:</h5>
                  {alert.categories.map((category, catIndex) => (
                    <div
                      key={catIndex}
                      className="flex items-start gap-3 p-3 bg-white/30 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        {getRecommendationIcon(category.recommendation)}
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getRecommendationColor(category.recommendation)}`}>
                          {category.recommendation}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">{category.name}</span>
                          <span className="text-xs opacity-75">{category.confidence}%</span>
                        </div>
                        <p className="text-xs opacity-90">{category.reasoning}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};