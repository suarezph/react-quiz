import { motion } from 'framer-motion';

export function Header() {
  return (
    <div className="mb-10 mx-auto w-[80px] h-[80px] mt-10">
      <motion.img
        src="/img/logo.svg"
        initial={{ scale: 0 }}
        animate={{ scale: 2 }}
        transition={{ delay: 0.7 }}
      />
    </div>
  );
}
