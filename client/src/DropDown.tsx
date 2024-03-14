import React, { useEffect, useState } from 'react';

type DropDownProps = {
  prompts: string[];
  showDropDown: boolean;
  toggleDropDown: Function;
  promptSelection: Function;
};

const DropDown: React.FC<DropDownProps> = ({
  prompts,
  promptSelection,
}: DropDownProps): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);


  const onClickHandler = (prompt: string): void => {
    promptSelection(prompt);
  };

  useEffect(() => {
    setShowDropDown(showDropDown);
  }, [showDropDown]);

  return (
    <>
      <div className={showDropDown ? 'dropdown' : 'dropdown active'}>
        {prompts.map(
          (prompt: string, index: number): JSX.Element => {
            return (
              <p
                key={index}
                onClick={(): void => {
                  onClickHandler(prompt);
                }}
              >
                {prompt}
              </p>
            );
          }
        )}
      </div>
    </>
  );
};

export default DropDown;