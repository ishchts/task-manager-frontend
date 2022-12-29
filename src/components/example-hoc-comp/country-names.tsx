import React from 'react';

export type CountryNamesProps = {
  data?: Array<{ name: string }>
  selected?: string
};

export const CountryNames: React.FC<CountryNamesProps> = (props) => {
  const { data, selected = '' } = props;

  return (
    <select defaultValue={selected}>
      {
        data?.map((el, i) => {
          return <option key={i} value={el.name}>{el.name}</option>;
        })
      }
    </select>
  );
};
