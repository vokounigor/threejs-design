import { FC, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';

import state from '../store';
import { download } from '../assets';

import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { DIRECTION, fadeAnimation, slideAnimation } from '../config/motion';

import { AIPicker, ColorPicker, Button, FilePicker, Tab } from '../components';

type FilterTabType = 'logoShirt' | 'stylishShirt';

const Customizer: FC = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState<Blob>();
  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState('');
  const [activeFilterTab, setActiveFilterTab] = useState({ logoShirt: true, stylishShirt: false });

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case 'colorpicker':
        return <ColorPicker />;
      case 'filepicker':
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case 'aipicker':
        return <AIPicker />;
      default:
        return null;
    }
  };

  const handleEditorTabClick = (tabName: string) => {
    if (tabName === activeEditorTab) {
      setActiveEditorTab('');
      return;
    }
    setActiveEditorTab(tabName);
  };

  const handleDecals = (type: keyof typeof DecalTypes, res: string) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = res;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const handleActiveFilterTab = (filterTab: FilterTabType) => {
    switch (filterTab) {
      case 'logoShirt':
        state.isLogoTexture = !activeFilterTab[filterTab];
        break;
      case 'stylishShirt':
        state.isFullTexture = !activeFilterTab[filterTab];
        break;
      default:
        state.isFullTexture = false;
        state.isLogoTexture = true;
    }

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [filterTab]: !prevState[filterTab],
      };
    });
  };

  const readFile = (type: keyof typeof DecalTypes) => {
    if (!file) return;

    reader(file).then((res) => {
      handleDecals(type, res as string);
      setActiveEditorTab('');
    });
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div key="custom" className="absolute top-0 left-0 z-10" {...slideAnimation(DIRECTION.LEFT)}>
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab key={tab.name} tab={tab} handleClick={() => handleEditorTabClick(tab.name)} />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div className="absolute top-5 right-5 z-10" {...fadeAnimation}>
            <Button filled customStyles="w-fit px-4 py-2.5 font-bold text-sm" onClick={() => (state.intro = true)}>
              Go Back
            </Button>
          </motion.div>

          <motion.div className="filtertabs-container" {...slideAnimation(DIRECTION.UP)}>
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                handleClick={() => handleActiveFilterTab(tab.name as FilterTabType)}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name as FilterTabType]}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
