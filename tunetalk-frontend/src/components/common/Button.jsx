import PropTypes from 'prop-types';

export default function Button({ label, icon: Icon, ...props }) {
  return (
    <button
      {...props}
      className='w-fit h-fit py-[6px] px-[8px] rounded-[16px] flex items-center justify-between gap-[6px] bg-[#C2E1FA]/20 text-[#F8F9FA] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)] backdrop-blur-[23.2px] hover:cursor-pointer hover:bg-[#C2E1FA]/40 transition-all duration-200'
    >
      {Icon && <Icon className='w-[14px] h-[14px] text-[#F8F9FA]' />}
      {label && <span className='text-[12px]'>{label}</span>}
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.elementType,
};
