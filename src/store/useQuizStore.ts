import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface QuizState {
  // Quiz Steps
  step: number;
  next: () => void;
  prev: () => void;
  // form details
  formDetails: { fullname: string; email: string };
  handleForm: (body: { fullname: string; email: string }) => void;
  // answers
  answers: string[][];
  handleAnswers: (answers: string[][]) => void;
}

const useQuizStore = create<QuizState>()(
  devtools((set) => ({
    step: 0,
    formDetails: { fullname: '', email: '' },
    answers: [],

    next: () =>
      set((state) => ({ step: state.step > 3 ? state.step : state.step + 1 })),
    prev: () =>
      set((state) => ({
        step: state.step == 0 ? state.step : state.step - 1,
      })),
    handleForm: (body) => {
      set((state) => ({
        formDetails: { fullname: body.fullname, email: body.email },
      }));
    },
    handleAnswers: (answers) => {
      set((state) => ({
        answers: answers,
      }));
    },
  }))
);

export default useQuizStore;
