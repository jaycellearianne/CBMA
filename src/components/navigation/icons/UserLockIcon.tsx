const UserLockIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`lucide lucide-user-lock-icon lucide-user-lock ${className}`}
  >
    <circle cx="10" cy="7" r="4" />
    <path d="M10.3 15H7a4 4 0 0 0-4 4v2" />
    <path d="M15 15.5V14a2 2 0 0 1 4 0v1.5" />
    <rect width="8" height="5" x="13" y="16" rx=".899" />
  </svg>
);

export default UserLockIcon;
