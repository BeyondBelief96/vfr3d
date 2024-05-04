// AirportTabs.tsx
interface AirportTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AirportTabs: React.FC<AirportTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="tabs tabs-boxed bg-base-200">
      <a
        className={`tab ${activeTab === 'info' ? 'tab-active' : ''}`}
        onClick={() => setActiveTab('info')}
      >
        Info
      </a>
      <a
        className={`tab ${activeTab === 'weather' ? 'tab-active' : ''}`}
        onClick={() => setActiveTab('weather')}
      >
        Weather
      </a>
    </div>
  );
};

export default AirportTabs;
