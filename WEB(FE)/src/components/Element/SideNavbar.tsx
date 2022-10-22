export interface ButtonProps {
    text?: string;
    label: string;
    margin?: string;
    tab: number;
    onClick?: () => void;
  }


export const SideNavbar = ({
    text = 'text-base',
    label,
    margin,
    onClick,
    tab,
  }: ButtonProps) => {
    let px: string = 'px-5';
    let py: string = 'py-1.5';
    if (text === 'text-xl') {
      px = 'px-10';
      py = 'py-3';
    }
    
    return (
      <button
        className={`bg-orange text-white-100 ${text} font-bold rounded-full ${px} ${py} ${
          margin ? `${margin}` : ''
        }`}
        onClick={onClick}>
        {label}
      </button>
    );
  };
  