export default function Input({ type = 'text', ...props }) {
  return (
    <div className='py-3 px-3 flex gap-5 justify-between items-center text-stone-100 border-stone-50 rounded-[32px] shadow-sm backdrop-blur-md bg-[#C2E1FA]/20 w-full'>
      <input type={type} {...props} className='w-full' />
      <ion-icon name='search-outline' className='text-xl'></ion-icon>
    </div>
  );
}
