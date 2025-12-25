type InputProps = {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ label, error, ...props }: InputProps) {
  return (
    <div>
      <label>{label}</label><br />
      <input {...props} />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
