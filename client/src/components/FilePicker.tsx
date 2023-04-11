import { Dispatch, FC, SetStateAction } from 'react';
import { DecalTypes } from '../config/constants';
import Button from './Button';

interface FilePickerProps {
  file: Blob | undefined;
  setFile: Dispatch<SetStateAction<Blob | undefined>>;
  readFile: (type: keyof typeof DecalTypes) => void;
}

const FilePicker: FC<FilePickerProps> = ({ file, setFile, readFile }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target || !e.target.files) return;

    setFile(e.target.files[0]);
  };

  return (
    <div className="filepicker-container">
      <div className="flex-1 flex flex-col">
        <input type="file" id="file-upload" accept="image/*" onChange={handleChange} />
        <label htmlFor="file-upload" className="filepicker-label">
          Upload file
        </label>

        <p className="mt-2 text-grey-500 text-xs truncate">
          {file && 'name' in file ? `${file.name}` : 'No file uploaded'}
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <Button onClick={() => readFile('logo')} customStyles="text-xs">
            Logo
          </Button>
          <Button filled onClick={() => readFile('full')} customStyles="text-xs">
            Full
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilePicker;
