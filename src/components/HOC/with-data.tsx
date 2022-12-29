import React from 'react';

import { useData } from '../../hooks/use-data';

export type withDataProps = {
  data?: Array<{ name: string }>
  selected?: string
  loading?: boolean
  error?: boolean
};

function withData <T extends withDataProps> (Component: React.FC<T>, url: string) {
  function WithDataComp (props: T & withDataProps) {
    const { data, loading, error } = useData<Array<{ name: string }>>(url);
    if (loading) {
      return (
        <div>
          loading
        </div>
      );
    }
    return (
      <Component
        {...props}
        data={data}
        loading={loading}
        error={error}
      />
    );
  }

  WithDataComp.displayName = `withData${Component.name}`;

  return WithDataComp;
}

export default withData;
