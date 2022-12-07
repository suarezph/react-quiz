import { useState } from 'react';
import data from '../../data/quiz.json';
import useQuizStore from '../../store/useQuizStore';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { motion } from 'framer-motion';

export function QuizContent() {
  const { next, handleAnswers } = useQuizStore();
  const dataLength = data.length - 1;
  const [index, setIndex] = useState<number>(0);
  const [selected, setSelected] = useState<string[][]>(
    [...Array(dataLength + 1)].map((e) => Array())
  );

  const handleSelected = (
    currentIndex: number,
    item: string,
    multiple: boolean
  ) => {
    const newArray = [...selected];

    if (multiple) {
      if (newArray[currentIndex].includes(item)) {
        const updatedArray = newArray[currentIndex].filter((i) => item !== i);
        newArray[currentIndex] = updatedArray;
      } else {
        newArray[currentIndex].push(item);
      }
    } else {
      newArray[currentIndex] = [item];
    }

    setSelected(newArray);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="text-2xl mb-5 text-slate-200">{data[index].question}</h1>
      <div className="text-lg mb-5">
        {data[index].choices.map((item) => {
          return (
            <div
              key={item}
              className={`cursor-pointer mb-2 flex items-center gap-2 ${
                selected[index].includes(item)
                  ? 'text-blue-700 font-semibold'
                  : 'text-slate-300'
              }`}
              onClick={() => handleSelected(index, item, data[index].multiple)}>
              {selected[index].includes(item) ? <HiArrowNarrowRight /> : null}
              {item}
            </div>
          );
        })}
      </div>

      <div className="flex gap-2 mt-16">
        {index !== 0 ? (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={() => {
              if (index === 0) return;

              setIndex(index - 1);
            }}
            className="border border-gray-500 bg-gray-500 text-white cursor-pointer px-5 py-2 text-lg rounded-xl hover:bg-gray-600">
            Back
          </motion.button>
        ) : null}
        {selected[index].length !== 0 ? (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
            onClick={() => {
              if (dataLength === index) {
                handleAnswers(selected);
                next();
                return;
              }

              setIndex(index + 1);
            }}
            className="border border-pink-500 bg-pink-500 text-white cursor-pointer px-5 py-2 text-lg rounded-xl hover:bg-pink-600">
            {dataLength === index ? 'FINISH' : 'NEXT'}
          </motion.button>
        ) : null}
      </div>
    </motion.div>
  );
}
