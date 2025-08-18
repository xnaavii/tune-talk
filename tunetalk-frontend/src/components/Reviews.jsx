export default function Reviews({ children }) {
  return (
    <div className='flex-1 flex flex-col gap-2 p-2'>
      <div className='flex items-center justify-between bg-[#C2E1FA]/10 rounded-xl gap-1 h-25 p-2 shrink-0'>
        <textarea
          name='review'
          id='review'
          placeholder='Write a review'
          maxLength={150}
          className='w-full h-full resize-none text-stone-50 p-2 outline-none focus:ring-1 focus:ring-stone-200 focus:ring-inset focus:bg-[#C2E1FA]/30 border border-stone-300 rounded-lg text-md bg-[#C2E1FA]/20'
        ></textarea>
        <button className='hover:cursor-pointer'>Add</button>
      </div>

      <div className='flex flex-col'>{children}</div>
    </div>
  );
}
