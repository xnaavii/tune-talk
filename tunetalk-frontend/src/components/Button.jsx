export default function Button({ label, icon, onClick }) {
  const isIconOnly = !label;

  return (
    <button
      onClick={onClick}
      className={`${
        isIconOnly ? 'p-2 aspect-square rounded-full' : 'py-2 px-4 rounded-3xl'
      } flex items-center justify-center gap-2 bg-[#C2E1FA]/20 text-stone-100 border-stone-50 shadow-sm backdrop-blur-md hover:cursor-pointer hover:bg-[#C2E1FA]/40 transition-all duration-200`}
    >
      {icon && (
        <ion-icon
          name={icon}
          className={`${isIconOnly ? 'text-md' : 'text-sm'}`}
        />
      )}
      {!isIconOnly && <span className='text-sm'>{label}</span>}
    </button>
  );
}
