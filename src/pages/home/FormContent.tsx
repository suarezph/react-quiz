import { useState } from 'react';
import useQuizStore from '../../store/useQuizStore';
import { motion } from 'framer-motion';

interface formType {
  fullname: string;
  email: string;
}

export function FormContent() {
  const { next, handleForm } = useQuizStore();
  const [body, setBody] = useState<formType>({ fullname: '', email: '' });
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>(
    {}
  );

  const validate = (body: formType): { [key: string]: string | undefined } => {
    let errors = {};
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (body.fullname === '')
      errors = { ...errors, fullname: 'Fullname is required' };
    if (body.email === '')
      errors = { ...errors, email: 'Email address is required' };
    if (body.email !== '' && !re.test(body.email))
      errors = { ...errors, email: 'Email address is not a valid email' };

    return errors;
  };

  const handleFormSubmit = () => {
    const validateError = validate(body);
    if (Object.keys(validateError).length !== 0) {
      return setErrors(validateError);
    }

    handleForm(body);
    next();
  };

  return (
    <motion.div className="flex flex-col">
      <motion.h1
        className="text-5xl text-center mb-10 text-gray-900"
        initial={{ y: -250 }}
        transition={{ delay: 0.5 }}
        animate={{ y: 0 }}>
        Welcome to QUIZ
      </motion.h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}>
        <div className="flex flex-col mb-5">
          <label className="text-xl mb-2 text-slate-200" htmlFor="fullname">
            Your Name
          </label>
          <input
            type="text"
            className="border border-gray-500 px-2 py-2 outline-none rounded text-lg"
            id="fullname"
            name="fullname"
            placeholder="ex: John Doe"
            onChange={(e) => setBody({ ...body, fullname: e.target.value })}
          />

          {errors?.fullname ? (
            <p className="text-red-900 bg-white px-2 py-1 mt-1 text-sm">
              {errors.fullname}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col mb-10">
          <label className="text-xl mb-2 text-slate-200" htmlFor="fullname">
            Your Email Address
          </label>
          <input
            type="email"
            className="border border-gray-500 px-2 py-2 outline-none rounded text-lg"
            id="fullname"
            name="fullname"
            placeholder="ex: johndoe@email.com"
            onChange={(e) => setBody({ ...body, email: e.target.value })}
          />

          {errors?.email ? (
            <p className="text-red-900 bg-white px-2 py-1 mt-1 text-sm">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <button
            className="border border-pink-500 bg-pink-500 text-white cursor-pointer p-2 w-[100%] text-lg rounded-xl hover:bg-pink-600"
            onClick={handleFormSubmit}>
            Start
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
