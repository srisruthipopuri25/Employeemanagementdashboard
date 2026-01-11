'use client';
import { useEmployeeStore } from '@/store/employeeStore';

export default function Header() {
  const { currentView } = useEmployeeStore();

  const getTitle = () => {
    switch (currentView) {
      case 'table':
        return 'Employee List';
      case 'summary':
        return 'Employee Summary';
      case 'form':
        return 'Add / Edit Employee';
      default:
        return 'Employee Management Dashboard';
    }
  };

  return (
    <header className="bg-white shadow px-6 py-3 font-semibold">
      {getTitle()}
    </header>
  );
}
