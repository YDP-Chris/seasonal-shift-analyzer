import { ForecastApiResponse, TrendData, TransitionAlert, ProductCategory, AnalyticsData } from '../types';

class AnalyticsService {
  calculateRollingAverage(temperatures: number[], window: number = 5): number[] {
    const rollingAverages: number[] = [];

    for (let i = 0; i < temperatures.length; i++) {
      const start = Math.max(0, i - window + 1);
      const subset = temperatures.slice(start, i + 1);
      const average = subset.reduce((sum, temp) => sum + temp, 0) / subset.length;
      rollingAverages.push(Math.round(average * 10) / 10);
    }

    return rollingAverages;
  }

  extractTrendData(forecastData: ForecastApiResponse): TrendData[] {
    const temperatures = forecastData.list.map(item => item.main.temp);
    const rollingAverages = this.calculateRollingAverage(temperatures);

    return forecastData.list.map((item, index) => ({
      date: new Date(item.dt * 1000).toLocaleDateString(),
      temperature: Math.round(item.main.temp),
      rollingAverage: rollingAverages[index]
    }));
  }

  detectSeasonalTransitions(trendData: TrendData[]): TransitionAlert[] {
    const alerts: TransitionAlert[] = [];
    const recentTemps = trendData.slice(-7).map(d => d.rollingAverage);

    // Spring transition: 5 consecutive days > 65°F
    const springDays = this.countConsecutiveDaysAbove(recentTemps, 65);
    if (springDays >= 3) {
      alerts.push({
        type: 'spring',
        confidence: Math.min(100, 60 + (springDays * 10)),
        daysConsecutive: springDays,
        threshold: 65,
        message: `Spring transition likely: ${springDays} consecutive days above 65°F`,
        categories: this.getSpringRecommendations(springDays)
      });
    }

    // Summer transition: 5 consecutive days > 75°F
    const summerDays = this.countConsecutiveDaysAbove(recentTemps, 75);
    if (summerDays >= 3) {
      alerts.push({
        type: 'summer',
        confidence: Math.min(100, 60 + (summerDays * 10)),
        daysConsecutive: summerDays,
        threshold: 75,
        message: `Summer transition likely: ${summerDays} consecutive days above 75°F`,
        categories: this.getSummerRecommendations(summerDays)
      });
    }

    // Fall transition: 5 consecutive days < 55°F
    const fallDays = this.countConsecutiveDaysBelow(recentTemps, 55);
    if (fallDays >= 3) {
      alerts.push({
        type: 'fall',
        confidence: Math.min(100, 60 + (fallDays * 10)),
        daysConsecutive: fallDays,
        threshold: 55,
        message: `Fall transition likely: ${fallDays} consecutive days below 55°F`,
        categories: this.getFallRecommendations(fallDays)
      });
    }

    // Winter transition: 5 consecutive days < 40°F
    const winterDays = this.countConsecutiveDaysBelow(recentTemps, 40);
    if (winterDays >= 3) {
      alerts.push({
        type: 'winter',
        confidence: Math.min(100, 60 + (winterDays * 10)),
        daysConsecutive: winterDays,
        threshold: 40,
        message: `Winter transition likely: ${winterDays} consecutive days below 40°F`,
        categories: this.getWinterRecommendations(winterDays)
      });
    }

    return alerts;
  }

  private countConsecutiveDaysAbove(temps: number[], threshold: number): number {
    let consecutive = 0;
    let maxConsecutive = 0;

    for (const temp of temps) {
      if (temp > threshold) {
        consecutive++;
        maxConsecutive = Math.max(maxConsecutive, consecutive);
      } else {
        consecutive = 0;
      }
    }

    return maxConsecutive;
  }

  private countConsecutiveDaysBelow(temps: number[], threshold: number): number {
    let consecutive = 0;
    let maxConsecutive = 0;

    for (const temp of temps) {
      if (temp < threshold) {
        consecutive++;
        maxConsecutive = Math.max(maxConsecutive, consecutive);
      } else {
        consecutive = 0;
      }
    }

    return maxConsecutive;
  }

  private getSpringRecommendations(days: number): ProductCategory[] {
    const confidence = Math.min(95, 70 + (days * 5));

    return [
      {
        name: 'Outerwear',
        recommendation: 'decrease',
        reasoning: 'Reduce heavy jackets and winter coats. Transition to lighter layers.',
        confidence: confidence
      },
      {
        name: 'Tops',
        recommendation: 'increase',
        reasoning: 'Increase t-shirts, light long-sleeves, and breathable fabrics.',
        confidence: confidence - 5
      },
      {
        name: 'Bottoms',
        recommendation: 'maintain',
        reasoning: 'Maintain current levels. Mix of shorts and light pants.',
        confidence: confidence - 10
      }
    ];
  }

  private getSummerRecommendations(days: number): ProductCategory[] {
    const confidence = Math.min(95, 70 + (days * 5));

    return [
      {
        name: 'Outerwear',
        recommendation: 'decrease',
        reasoning: 'Minimize outerwear. Focus on light rain protection only.',
        confidence: confidence
      },
      {
        name: 'Tops',
        recommendation: 'increase',
        reasoning: 'Maximize tank tops, short sleeves, and moisture-wicking fabrics.',
        confidence: confidence
      },
      {
        name: 'Bottoms',
        recommendation: 'increase',
        reasoning: 'Increase shorts inventory. Reduce long pants significantly.',
        confidence: confidence - 5
      }
    ];
  }

  private getFallRecommendations(days: number): ProductCategory[] {
    const confidence = Math.min(95, 70 + (days * 5));

    return [
      {
        name: 'Outerwear',
        recommendation: 'increase',
        reasoning: 'Increase light jackets, hoodies, and layering pieces.',
        confidence: confidence
      },
      {
        name: 'Tops',
        recommendation: 'maintain',
        reasoning: 'Transition to long sleeves and medium-weight fabrics.',
        confidence: confidence - 5
      },
      {
        name: 'Bottoms',
        recommendation: 'increase',
        reasoning: 'Increase long pants. Gradually reduce shorts inventory.',
        confidence: confidence - 10
      }
    ];
  }

  private getWinterRecommendations(days: number): ProductCategory[] {
    const confidence = Math.min(95, 70 + (days * 5));

    return [
      {
        name: 'Outerwear',
        recommendation: 'increase',
        reasoning: 'Maximize heavy coats, insulated jackets, and winter layers.',
        confidence: confidence
      },
      {
        name: 'Tops',
        recommendation: 'increase',
        reasoning: 'Focus on thermal layers, heavy sweaters, and warm fabrics.',
        confidence: confidence - 5
      },
      {
        name: 'Bottoms',
        recommendation: 'maintain',
        reasoning: 'Maintain warm pants. Minimize shorts to specialty items only.',
        confidence: confidence - 10
      }
    ];
  }

  analyzeWeatherData(forecastData: ForecastApiResponse, locationName: string): AnalyticsData {
    const trends = this.extractTrendData(forecastData);
    const alerts = this.detectSeasonalTransitions(trends);
    const currentTemp = Math.round(forecastData.list[0]?.main.temp || 0);
    const rollingAverage = trends[0]?.rollingAverage || currentTemp;

    return {
      trends,
      alerts,
      currentTemp,
      rollingAverage,
      location: locationName
    };
  }
}

export const analyticsService = new AnalyticsService();