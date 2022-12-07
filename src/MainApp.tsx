import { Header } from './components/Header';
import { FormContent } from './pages/home/FormContent';
import { QuizContent } from './pages/home/QuizContent';
import { ResultContent } from './pages/home/ResultContent';
import useQuizStore from './store/useQuizStore';

export default function MainApp() {
  const { step } = useQuizStore();
  const render = [<FormContent />, <QuizContent />, <ResultContent />];

  return (
    <div className="h-screen w-100 bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="flex items-center justify-center flex-col">
        <div className="mx-auto w-screen p-10 sm:w-[560px] ">
          <Header />
          {render[step]}
        </div>
      </div>
    </div>
  );
}
