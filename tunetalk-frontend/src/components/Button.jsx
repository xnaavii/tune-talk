export default function Button({ label }) {
  return (
    <button className='relative z-19 py-2 px-4 text-stone-100 border-stone-50 rounded-[16px] shadow-sm backdrop-blur-md bg-[#C2E1FA]/20'>
      <span>{label}</span>
    </button>
  );
}
