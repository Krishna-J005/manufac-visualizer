import React, { useEffect, useState } from 'react';
import StatisticsTable from './Table';
import WineData from '../WineData'

type Measure = {
    mean: number[];
    median: number[];
    mode: (number | null)[];
}
type TableData = {
    headers: string[]
    data: Measure
    name: string[]
}

type WineDataType = {
    Alcohol: number;
    Flavanoids: number;
}

function Flavanoids() {
    const [tableData, setTableData] = useState<TableData>({
        headers: [],
        data: {
            mean: [],
            median: [],
            mode: [],
        },
        name: ['Flavanoids Mean', 'Flavanoids Median', 'Flavanoids Mode'],
    });

    const groupedData: Record<number, WineDataType[]> = {};

    // Step 2: Calculate mean, median, and mode for each group
    const calculateMean = (values: number[]): number => {
        const sum = values.reduce((acc, value) => acc + value, 0);
        return sum / values.length;
    };

    const calculateMedian = (values: number[]): number => {
        const sortedValues = values.sort((a, b) => a - b);
        const middleIndex = Math.floor(sortedValues.length / 2);

        if (sortedValues.length % 2 === 0) {
            return (sortedValues[middleIndex - 1] + sortedValues[middleIndex]) / 2;
        } else {
            return sortedValues[middleIndex];
        }
    };

    const calculateMode = (values: number[]): number | null => {
        const counts: Record<number, number> = {};
        let maxCount = 0;
        let mode: number | null = null;

        values.forEach((value) => {
            counts[value] = (counts[value] || 0) + 1;

            if (counts[value] > maxCount) {
                maxCount = counts[value];
                mode = value;
            }
        });
        return mode;
    };


    useEffect(() => {
        const arr: number[] = [];
        const meanArr: number[] = [];
        const medianArr: number[] = [];
        const modeArr: (number | null)[] = [];
        let processWineData = WineData.map(curr => {
            let obj: WineDataType = {
                Alcohol: curr.Alcohol,
                Flavanoids: !isNaN(+curr.Flavanoids) ? +curr.Flavanoids : 0   //if we get unexpected data then we mark it 0
            }
            return obj;
        })

        processWineData.forEach((curr, id) => {
            let obj = {};
            if (!arr.includes(curr.Alcohol)) {
                arr.push(curr.Alcohol);
            }
            // Step 1: Group data based on Alcohol value
            const alcoholGroup = curr.Alcohol
            if (!groupedData[alcoholGroup]) {
                groupedData[alcoholGroup] = [];
            }
            groupedData[alcoholGroup].push(curr);
        })


        Object.keys(groupedData).forEach((groupKey) => {
            const group = groupedData[Number(groupKey)];
            const flavanoidsValues = group.map((item) => item.Flavanoids);

            const mean = calculateMean(flavanoidsValues);
            const median = calculateMedian(flavanoidsValues);
            const mode = calculateMode(flavanoidsValues);

            meanArr.push(mean);
            medianArr.push(median);
            modeArr.push(mode);
        });

        setTableData({
            ...tableData,
            headers: arr.map(curr => `Class ${curr}`),
            data: {
                mean: meanArr,
                median: medianArr,
                mode: modeArr
            }

        })

    }, [])

    return (
        <>
            <div className='dataHeader'>Flavanoids Data</div>
            <StatisticsTable headers={tableData.headers} data={tableData.data} nameProps={tableData.name} />
        </>
    )
}

export default Flavanoids