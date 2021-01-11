import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {ResponsiveLine} from '@nivo/line';
import {colors} from './colors';

const LineGraph = (props, context) => {
  const {lineData, emptyData, tooltip, margin} = props;
  const [filterData, setFilterData] = useState([]);
  const [allFilter, setAllFilter] = useState(false);
  const {mainStyle} = props;
  const style = {...{height: 700, width: '100%', margin: 'auto'}, ...(mainStyle || {})};

  useEffect(() => {
    setFilterData(lineData);
  }, [lineData]);

  const legendToggle = x => {
    const selected = filterData.filter(i => i.id === x.id)[0];
    const emp = selected.empty;
    if (!emp) {
      setFilterData(
        [...filterData].map(i => {
          if (i.id === x.id)
            return {
              ...i,
              empty: true,
              data: emptyData || [],
            };
          else return i;
        }),
      );
    } else {
      const selectedOrj = [...lineData].filter(i => i.id === x.id)[0];
      setFilterData(
        [...filterData].map(i => {
          if (i.id === x.id)
            return {
              ...i,
              empty: false,
              data: selectedOrj.data,
            };
          else return i;
        }),
      );
    }
  };

  const colorsT = colors.slice(0, filterData.length).map((i, ind) => {
    console.log(filterData[ind], ind, filterData)
    if (!filterData[ind].empty) return i;
  });

  return (
    <div style={style}>
      <ResponsiveLine
        data={filterData}
        margin={margin ? margin : {top: 50, right: 200, bottom: 150, left: 60}}
        xScale={{type: 'point'}}
        yScale={{type: 'linear', stacked: false, min: 'auto', max: 'auto'}}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 30,
          legend: 'Sınavlar',
          legendOffset: 130,
          legendPosition: 'middle',
        }}
        axisLeft={null}
        colors={colorsT}
        pointSize={10}
        pointColor={{theme: 'background'}}
        pointBorderWidth={2}
        enablePointLabel={true}
        pointBorderColor={{from: 'serieColor'}}
        tooltip={tooltip}
        pointLabelYOffset={-12}
        useMesh={true}
        // pointLabel={pointLabel || 'y'}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            onClick: x => legendToggle(x),
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        {...props}
      />
    </div>
  );
};


LineGraph.propTypes = {};

LineGraph.defaultProps = {};


export default LineGraph;
