import React from 'react';

type MenuButtonProps = {
  child?: string
  txt?: string
  collapsed?: boolean
  expandCollapse?: () => void
  hidden?: boolean
};
export const MenuButton: React.FC<MenuButtonProps> = (props) => {
  const { child, collapsed, txt, expandCollapse } = props;

  return (
      <div className="pop-button">
        <button onClick={expandCollapse}>{txt}</button>
        {(collapsed === false)
          ? <div className="pop-up">
            {child}
          </div>
          : ''
        }
      </div>
  );
};
