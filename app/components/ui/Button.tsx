type ButtonProps = {
  text: string;
};

export default function Button({ text }: ButtonProps) {
  return <button type="submit">{text}</button>;
}
