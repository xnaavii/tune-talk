export default function Logo({ size }) {
  return (
    <h1
      className={`tracking-[-6%] text-[${
        size || 48
      }px] font-semibold text-[#F8F9FA] [text-stroke:1px_#F8F9FA]`}
    >
      Tunetalk
    </h1>
  );
}
