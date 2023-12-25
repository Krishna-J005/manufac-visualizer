import React from 'react';

type Measure = {
  mean: number[];
  median: number[];
  mode: (number | null) [];
}

type StatisticsTableProps = {
  data: Measure;
  headers: string[];
  nameProps: string[];
}

const StatisticsTable: React.FC<StatisticsTableProps> = ({ headers, data, nameProps }) => {
  let keyArr = ['mean', 'median', 'mode'];
  return (
    <div className='displayFlex'>
      <table className='tableContainer'>
        <thead>
          <tr>
            <th>Measure</th>
            {headers.map((item, index) => (
              <th key={index}>
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            nameProps.map((item, index:number) => (
              <tr key="index">
                <td>{item}</td>
                {
                  index == 0 &&
                    data.mean.map((val, id:number) => (
                      <td key={id}>
                        {typeof val === 'number' ? val.toFixed(3) : '...'}
                      </td>
                    ))
                }{
                  index == 1 &&
                    data.median.map((val, id:number) => (
                      <td key={id}>
                        {typeof val === 'number' ? val.toFixed(3) : '...'}
                      </td>
                  ))
                }{
                  index == 2 &&
                  data?.mode.map((val, id: number) => (
                    <td key={id}>
                      {typeof val ===  'number' ? val.toFixed(3) : '...'}
                    </td>
                  ))
                }
              </tr>)
            )
          }
        </tbody>
      </table>
    </div>
  );
};

export default StatisticsTable;
