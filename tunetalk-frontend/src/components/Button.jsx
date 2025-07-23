export default function Button({ label, icon }) {
  return (
    <button className='py-2 px-4 flex gap-1 justify-between items-center text-stone-100 border-stone-50 rounded-3xl shadow-sm backdrop-blur-md bg-[#C2E1FA]/20 hover:cursor-pointer hover:bg-[#C2E1FA]/40'>
      <ion-icon name={icon} className='text-sm md:text-md'></ion-icon>
      <span className='text-sm md:text-md'>{label}</span>
    </button>
  );
}
