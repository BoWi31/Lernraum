
export interface QuizOption {
  text: string;
  isCorrect: boolean;
}

export interface MatchingPair {
  id: string;
  left: string;
  right: string;
}

export interface DragItem {
  id: string;
  text: string;
}

export interface DropZone {
  id: string;
  label: string;
  correctItemId: string;
}

export interface LearningStep {
  id: number;
  title: string;
  emoji: string;
  content: string[];
  imageType?: 'guillotine' | 'napoleon' | 'crowd' | 'law';
  instruction?: string;
  quiz?: {
    type: 'multiple-choice' | 'matching' | 'ordering' | 'drag-drop';
    question: string;
    options?: QuizOption[];
    pairs?: MatchingPair[];
    order?: string[];
    dragItems?: DragItem[];
    dropZones?: DropZone[];
  };
}

export interface NotebookTask {
  id: string;
  type: 'pflicht' | 'bonus' | 'kreativ';
  task: string;
  label: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  emoji: string;
  levels: {
    id: string;
    name: 'Leicht' | 'Mittel' | 'Schwer';
    icon: string;
    color: string;
    steps: LearningStep[];
    tasks: NotebookTask[];
  }[];
}

export interface Topic {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Subject {
  id: string;
  title: string;
  icon: string;
  color: string;
  grades: {
    id: string;
    topics: Topic[];
  }[];
}
