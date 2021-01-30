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

export const dummyQuestions = [
  {
    question: "",
    decision: 0,
    id: QuestionID["EI-1"]
  },
  {
    question: "",
    decision: 0,
    id: QuestionID["SN-1"]
  },
  {
    question: "",
    decision: 0,
    id: QuestionID["TF-1"]
  },
  {
    question: "",
    decision: 0,
    id: QuestionID["EI-2"]
  },
  {
    question: "",
    decision: 0,
    id: QuestionID["SN-2"]
  },
  {
    question: "",
    decision: 0,
    id: QuestionID["JP-1"]
  },
  {
    question: "",
    decision: 0,
    id: QuestionID["TF-2"]
  },
  {
    question: "",
    decision: 0,
    id: QuestionID["JP-2"]
  },
  {
    question: "",
    decision: 0,
    id: QuestionID["EI-3"]
  },
  {
    question: "",
    decision: 0,
    id: QuestionID["JP-3"]
  }
];

export type UserDecision = {
  decision: number;
  questionId: QuestionID;
};

export type Question = {
  id: string;
  question: string;
  shortcode: string;
  created_at: string;
  updated_at: string;
};

export enum Status {
  SUCCESS = "SUCCESS",
  LOADING = "LOADING",
  NORMAL = "NORMAL",
  ERROR = "ERROR"
}

export type RequestStatus = {
  getQuestions: Status;
};

export type Result = {
  ei: number;
  si: number;
  tf: number;
  jp: number;
};
