import Button from './common/Button';

export default function ReviewInput({ value, onChange, onAddReview }) {
  return (
    <div className='flex flex-col justify-between bg-[#C2E1FA]/10 rounded-xl gap-1 h-25 p-2 shrink-0 flex-1'>
      <textarea
        name='review'
        id='review'
        placeholder='Write a review (optional)'
        maxLength={250}
        value={value}
        onChange={onChange}
        className='w-full h-full resize-none text-stone-50 p-2 outline-none focus:ring-1 focus:ring-stone-200 focus:ring-inset focus:bg-[#C2E1FA]/30 border border-stone-300 rounded-lg text-md bg-[#C2E1FA]/20'
      ></textarea>
      <Button
        className='hover:cursor-pointer'
        onClick={onAddReview}
        icon={'add'}
        label='Comment'
      />
    </div>
  );
}
