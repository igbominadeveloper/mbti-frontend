export type Perspective = {
  question: string;
  decision: number;
  id: QuestionID;
};

export enum QuestionID {
  "ei-1" = "ei-1",
  "sn-1" = "sn-1",
  "tf-1" = "tf-1",
  "ei-2" = "ei-2",
  "sn-2" = "sn-2",
  "jp-1" = "jp-1",
  "tf-2" = "tf-2",
  "jp-2" = "jp-2",
  "ei-3" = "ei-3",
  "jp-3" = "jp-3"
}

export const dummyQuestions = [
  {
    question: "",
    decision: 0,
    id: QuestionID["ei-1"]
  },
  {
    question: "",
    decision: 0,
    id: QuestionID["sn-1"]
  },
  {
    question: "",
    decision: 0,
    id: QuestionID["tf-1"]
  },
  {
    question: "",
    decision: 0,
    id: QuestionID["ei-2"]
  },
  {
    question: "",
    decision: 0,
    id: QuestionID["sn-2"]
  },
  {
    question: "",
    decision: 0,
    id: QuestionID["jp-1"]
  },
  {
    question: "",
    decision: 0,
    id: QuestionID["tf-2"]
  },
  {
    question: "",
    decision: 0,
    id: QuestionID["jp-2"]
  },
  {
    question: "",
    decision: 0,
    id: QuestionID["ei-3"]
  },
  {
    question: "",
    decision: 0,
    id: QuestionID["jp-3"]
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
  submitResponse: Status;
  getUserMbti: Status;
};

export type UserResponseObject = {
  "ei-1": number;
  "sn-1": number;
  "tf-1": number;
  "ei-2": number;
  "sn-2": number;
  "jp-1": number;
  "tf-2": number;
  "jp-2": number;
  "ei-3": number;
  "jp-3": number;
  email: string;
};

export type ResponseRecord = {
  mbti: string;
};
