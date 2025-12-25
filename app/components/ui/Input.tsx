type InputProps = {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ label, error, ...props }: InputProps) {
  return (
    <div>
      <label>{label}</label>
      <input className="input" {...props} />
      {error && <p className="error">{error}</p>}
    </div>
  );
}
