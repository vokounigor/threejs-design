import { swatch, fileIcon, ai, logoShirt, stylishShirt } from '../assets';

export type TabType = {
  name: string;
  icon: string;
};

export const EditorTabs: TabType[] = [
  {
    name: 'colorpicker',
    icon: swatch,
  },
  {
    name: 'filepicker',
    icon: fileIcon,
  },
  {
    name: 'aipicker',
    icon: ai,
  },
];

export const FilterTabs: TabType[] = [
  {
    name: 'logoShirt',
    icon: logoShirt,
  },
  {
    name: 'stylishShirt',
    icon: stylishShirt,
  },
];

interface DecalTypesInterface {
  stateProperty: 'logoDecal' | 'fullDecal';
  filterTab: 'logoShirt' | 'stylishShirt';
}

export const DecalTypes: Record<string, DecalTypesInterface> = {
  logo: {
    stateProperty: 'logoDecal',
    filterTab: 'logoShirt',
  },
  full: {
    stateProperty: 'fullDecal',
    filterTab: 'stylishShirt',
  },
};
