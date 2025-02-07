import { Entity } from './entity';
export interface Trend extends Entity {
  keywordId: string,
  keyword: string,
  time: string,
  date: Date,
  formattedTime: string,
  value: number,
  diffValue: number,
  diffValueAgg: number,
  geo: '' | 'DE' | 'US',
  type: 'daily' | 'hourly' | 'monthly'
}