
export type CardState = 'closed' | 'page_1_2' | 'page_3_4' | 'final';

export interface PageContent {
  text: string;
  drawings: string[];
  buttons?: string[];
}

export interface BookView {
  left: PageContent;
  right: PageContent;
}
