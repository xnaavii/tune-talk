export default function Logo({ size }) {
  const sizes = {
    sm: 'text-[32px]',
    md: 'text-[48px]',
    lg: 'text-[96px]',
  };

  return (
    <h1
      className={`tracking-[-6%] ${sizes[size]} font-semibold text-[#F8F9FA] [text-stroke:1px_#F8F9FA]`}
    >
      Tunetalk
    </h1>
  );
}
