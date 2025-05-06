import {
  CircleStackIcon,
  FireIcon,
  GlobeAltIcon,
  ServerIcon,
  UnderlineIcon,
  WifiIcon,
} from '@heroicons/react/24/solid';

import DashboardCard from './DashboardCard';

export default function DashboardStatistics() {
  const assets = [
    {
      id: 1,
      name: 'Server Rack',
      value: '8000 ₼',
      status: 'Operational',
      icon: <ServerIcon width="25px" />, // Placeholder icon
    },
    {
      id: 2,
      name: 'Network',
      value: '2500 ₼',
      status: 'Operational',
      icon: <GlobeAltIcon width="25px" />, // Placeholder icon
    },
    {
      id: 3,
      name: 'Firewall',
      value: '5000 ₼',
      status: 'In Maintenance',
      icon: <FireIcon width="25px" />, // Placeholder icon
    },
    {
      id: 4,
      name: 'Database',
      value: '12000 ₼',
      status: 'Operational',
      icon: <CircleStackIcon width="25px" />, // Placeholder icon
    },
    {
      id: 5,
      name: 'Web Server',
      value: '10000 ₼',
      status: 'Operational',
      icon: <UnderlineIcon width="25px" />, // Placeholder icon
    }
  ];

  return (
    <div className="flex">
      <div className="w-full flex flex-wrap gap-5  justify-between">
        <div className="w-full flex flex-wrap gap-5 justify-between bg-[#131313b2] p-5 rounded-md">
          {assets.map((asset) => (
            <DashboardCard
              key={asset.id}
              title={asset.name}
              id={asset.id}
              subtitle={asset.value}
              icon={asset.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
