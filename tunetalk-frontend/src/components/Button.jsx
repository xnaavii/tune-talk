export default function Button({ label, icon, hasRated = false, ...props }) {
  return (
    <button
      {...props}
      className={`py-2 px-4 flex gap-1 justify-between items-center text-stone-100 border-stone-50 rounded-3xl shadow-sm backdrop-blur-md ${
        hasRated ? 'bg-[#C2E1FA]/50' : 'bg-[#C2E1FA]/20'
      } hover:cursor-pointer hover:bg-[#C2E1FA]/40`}
    >
      {icon && <ion-icon name={icon} className='text-sm lg:text-md'></ion-icon>}
      <span className='text-sm lg:text-md'>{label}</span>
    </button>
  );
}
