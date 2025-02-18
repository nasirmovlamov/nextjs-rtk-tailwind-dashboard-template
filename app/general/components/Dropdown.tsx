'use client';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ReactNode } from 'react'; // Import ReactNode

interface DropdownChild {
  label: string;
  route: string;
  icon?: ReactNode;
  onClick?: () => void;
}

interface DropdownProps {
  title: string;
  items?: DropdownChild[];
  icon?: ReactNode;
  route?: string;
}

export default function Dropdown({ title, items, icon, route }: DropdownProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="box-border text-lg">
      <button
        data-testid={`button-${title.toLowerCase()}`}
        className={`w-full text-left flex justify-between items-center gap-5 text-lg 
          ${route ? (pathname === route ? 'bg-[#97979770]' : '') : ''}
          px-2 py-2 rounded-md hover:bg-[#97979720]`}
        onClick={items ? toggleDropdown : () => {}}
      >
        <div className="flex gap-5 items-center">
          {icon && icon}
          <span>{title}</span>
        </div>
        {items &&
          (isOpen ? (
            <ChevronDownIcon className="h-5 w-5" />
          ) : (
            <ChevronRightIcon className="h-5 w-5" />
          ))}
      </button>

      {isOpen && items && (
        <div>
          {items.map((child, index) => (
            <Link
              key={index}
              href={child.route}
              data-testid={`link-${child.route.toLowerCase()}`}
              className={`w-full text-left flex gap-5 items-center h-10 px-6  mt-1 text-lg
                ${pathname === child.route ? 'bg-[#97979770]' : ''}
                hover:bg-[#97979720] rounded-md`}
            >
              {child.icon && child.icon}
              <span>{child.label}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
