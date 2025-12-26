type ButtonProps = {
  text: string;
};

export default function Button({ text }: ButtonProps) {
  return (
    <button className="w-full bg-[#f6c7a6] text-white py-2 rounded-full hover:bg-[#f2b68a] transition">
      {text}
    </button>
  );
}
