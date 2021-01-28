export type Perspective = {
  question: string;
  decision: number;
  id: QuestionID;
};

export enum QuestionID {
  "EI-1" = "EI-1",
  "SN-1" = "SN-1",
  "TF-1" = "TF-1",
  "EI-2" = "EI-2",
  "SN-2" = "SN-2",
  "JP-1" = "JP-1",
  "TF-2" = "TF-2",
  "JP-2" = "JP-2",
  "EI-3" = "EI-3",
  "JP-3" = "JP-3"
}

export type UserDecision = {
  decision: number;
  questionId: QuestionID;
};
