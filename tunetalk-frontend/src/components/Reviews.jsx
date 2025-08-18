export default function Reviews({ children }) {
  return (
    <div className='flex-1 flex flex-col gap-2'>
      <div className='flex items-center justify-between bg-[#C2E1FA]/10 rounded-lg gap-1 h-20 p-2 shrink-0'>
        <textarea
          name='review'
          id='review'
          placeholder='Write a review'
          maxLength={150}
          className='w-full h-full resize-none text-stone-50 p-2 outline-none focus:ring-1 focus:ring-stone-200 focus:ring-inset focus:bg-[#C2E1FA]/30 border border-stone-300 rounded-md text-sm bg-[#C2E1FA]/20'
        ></textarea>
        <button className="hover:cursor-pointer">Add</button>
      </div>

      <p className='text-sm text-stone-200 self-center'>{children}</p>
    </div>
  );
}
