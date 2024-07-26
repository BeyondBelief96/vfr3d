import React from 'react';
import { Airport } from '../../redux/api/faa/faa.interface';
import Tabs from './Tabs';
import { AirsigmetDTO, Pirep } from 'vfr3d-shared';

interface EntityInfoPopupProps<T> {
  selectedEntity: T;
  tabs?: { id: string; label: string }[];
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  renderContent: (entity: T) => React.ReactNode;
  renderHeader: (entity: T) => React.ReactNode;
}

const EntityInfoPopup = <T extends Airport | Pirep | AirsigmetDTO>({
  selectedEntity,
  tabs,
  activeTab,
  setActiveTab,
  renderContent,
  renderHeader,
}: EntityInfoPopupProps<T>) => {
  if (!selectedEntity) return null;

  const hasTabs = tabs && tabs.length > 0;

  return (
    <div className="fixed top-0 bottom-0 sm:bottom-10 sm:right-4 sm:top-auto sm:transform-none w-full sm:w-96 h-screen sm:h-[calc(80vh)] bg-base-100 rounded-lg overflow-hidden shadow-lg">
      <div className="flex flex-col h-full">
        {renderHeader(selectedEntity)}
        {hasTabs && activeTab && setActiveTab ? (
          <>
            <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="flex-1 p-4 overflow-y-auto">{renderContent(selectedEntity)}</div>
          </>
        ) : (
          <div className="flex-1 p-4 overflow-y-auto">{renderContent(selectedEntity)}</div>
        )}
      </div>
    </div>
  );
};

export default EntityInfoPopup;
