export default function Logo({ size }) {
  const sizes = {
    sm: 'text-[32px] font-bold',
    md: 'text-[48px] font-bold',
    lg: 'text-[96px] font-semibold',
  };

  return (
    <h1
      className={`tracking-[-6%] ${sizes[size]} text-[#F8F9FA] [text-stroke:1px_#F8F9FA]`}
    >
      Tunetalk
    </h1>
  );
}
