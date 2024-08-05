import React from 'react';

type Props = {
  title: string;
  subtitle: string;
  actions?: React.ReactNode;
};

function SeactionHeader(props: Props) {
  const { title, subtitle, actions } = props;
  return (
    <div className="mb-5 flex w-full flex-col justify-between sm:flex-row">
      <div className="mb-5 sm:mb-0">
        <h2 className="text-3xl font-medium">{title}</h2>
        <p className="text-md font-normal text-[#667085]">{subtitle}</p>
      </div>
      {actions}
    </div>
  );
}

export default SeactionHeader;
