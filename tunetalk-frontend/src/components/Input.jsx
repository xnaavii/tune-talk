export default function Input({ type = 'text', ...props }) {
  return (
    <div className='relative w-110'>
      <input
        type={type}
        {...props}
        className='w-full py-3 pr-10 pl-4 text-stone-100 border-stone-50 rounded-3xl shadow-sm backdrop-blur-md bg-[#C2E1FA]/20 outline-none focus:ring-2 focus:ring-stone-100 focus:ring-inset'
      />
      <ion-icon
        name='search-outline'
        class='absolute right-3 top-1/2 -translate-y-1/2 text-xl text-stone-100 pointer-events-none'
      />
    </div>
  );
}
