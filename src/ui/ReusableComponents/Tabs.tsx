interface TabsProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="tabs tabs-boxed bg-base-200">
      {tabs.map((tab) => (
        <a
          key={tab.id}
          className={`tab ${activeTab === tab.id ? 'tab-active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </a>
      ))}
    </div>
  );
};

export default Tabs;
