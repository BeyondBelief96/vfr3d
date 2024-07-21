interface UrlButtonProps {
  url: string;
  label: string;
}

const UrlButton: React.FC<UrlButtonProps> = ({ url, label }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-36 btn btn-primary text-wrap"
    >
      {label}
    </a>
  );
};

export default UrlButton;
