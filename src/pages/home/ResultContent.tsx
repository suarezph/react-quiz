import useQuizStore from '../../store/useQuizStore';
import data from '../../data/quiz.json';
import { HiOutlineChevronRight } from 'react-icons/hi';

export function ResultContent() {
  const { formDetails, answers } = useQuizStore();

  return (
    <>
      <h1 className="text-3xl text-slate-300">Results:</h1>
      <div className="my-5">
        <p className="text-slate-200">
          Name: <span className="font-bold">{formDetails.fullname}</span>
        </p>
        <p className="text-slate-200">
          Email <span className="font-bold">{formDetails.email}</span>
        </p>
      </div>

      <h1 className="text-2xl text-slate-200 mb-2">Answers:</h1>
      {data.map((item, index) => {
        return (
          <div className="bg-gray-300 mb-2 p-5 rounded">
            <div className="text-lg" key={index}>
              {item.question}
            </div>
            <div className="flex flex-col">
              {answers[index].map((ans, i) => {
                return (
                  <div key={i} className="flex items-center gap-2">
                    <HiOutlineChevronRight />
                    {ans}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <button
        onClick={() => location.reload()}
        className="border border-gray-500 bg-gray-500 text-white cursor-pointer px-5 py-2 text-lg rounded-xl hover:bg-gray-600 mt-10">
        Take again
      </button>
    </>
  );
}
