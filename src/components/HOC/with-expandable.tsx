import React, { useState } from 'react';

type WithExpandableProps = {
  hidden?: boolean
};

const withExpandable = <T extends WithExpandableProps,>(Component: React.FC<T>) => {
  const WithExpandableComp = (props: T & WithExpandableProps) => {
    const [collapsed, setCollapsed] = useState<boolean>(Boolean(props.hidden));

    const expandCollapse = () => {
      setCollapsed(!collapsed);
    };

    return (
      <Component {...props} collapsed={collapsed} expandCollapse={expandCollapse}/>
    );
  };

  WithExpandableComp.displayName = `withExpandable${Component.name}`;
  return WithExpandableComp;
};

export default withExpandable;
