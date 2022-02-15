import Tippy from '@tippyjs/react';
import React from 'react';
import Select from 'react-select';
import 'tippy.js/dist/tippy.css'; // optional

import './index.css';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectAllStations,
    selectAllSkills,
    selectAllTraders,
    setStationOrTraderLevel,
} from '../../features/settings/settingsSlice';
import capitalizeFirst from '../../modules/capitalize-first';
import camelcaseToDashes from '../../modules/camelcase-to-dashes';

const getNumericSelect = (min, max) => {
    let returnOptions = [];

    for (let i = min; i <= max; i = i + 1) {
        returnOptions.push({
            value: i,
            label: i.toString(),
        });
    }

    return returnOptions;
};

const getOptionsForStation = (t, stationKey) => {
    let options = [
        {
            value: 0,
            label: t('Not built'),
        },
        {
            value: 1,
            label: '1',
        },
        {
            value: 2,
            label: '2',
        },
        {
            value: 3,
            label: '3',
        },
    ];

    if (
        ['booze-generator', 'christmas-tree', 'solar-power'].includes(
            stationKey,
        )
    ) {
        options = [...options.slice(0, 2)];
    }

    return options;
};

const getOptionsForSkill = (t, skillKey) => {
    return getNumericSelect(0, 51);
};

const getOptionsForTrader = (t, traderKey) => {
    let options = getNumericSelect(1, 4);

    if (traderKey === 'jaeger') {
        options.unshift({
            value: 0,
            label: 'Locked',
        });
    }

    if (traderKey === 'fence') {
        options.unshift({
            value: 0,
            label: '0',
        });
        options = [...options.slice(0, 2)];
    }

    return options;
};

const StationSkillTraderSetting = React.forwardRef((props, ref) => {
    const { stateKey, type, isDisabled } = props;
    const { t } = useTranslation();

    let selector;
    let options;
    let iconExt = 'png';
    if (type === 'station') {
        selector = selectAllStations;
        options = getOptionsForStation(t, stateKey);
    } else if (type === 'skill') {
        selector = selectAllSkills;
        options = getOptionsForSkill(t, stateKey);
    } else if (type === 'trader') {
        selector = selectAllTraders;
        options = getOptionsForTrader(t, stateKey);
        iconExt = 'jpg';
    }
    const dispatch = useDispatch();
    const state = useSelector(selector);

    const selectedOption = options.find(
        (option) => option.value === state[stateKey],
    );

    return (
        <Tippy
            placement="top"
            content={capitalizeFirst(
                camelcaseToDashes(stateKey).replace(/-/g, ' '),
            )}
        >
            <div className="wrapper">
                <img
                    alt={`${stateKey}-icon`}
                    loading="lazy"
                    src={`${process.env.PUBLIC_URL}/images/${stateKey}-icon.${iconExt}`}
                />
                <Select
                    defaultValue={selectedOption}
                    options={options}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(event) => {
                        dispatch(
                            setStationOrTraderLevel({
                                target: stateKey,
                                value: event.value,
                            }),
                        );
                    }}
                    ref={ref}
                    isDisabled={isDisabled}
                />
            </div>
        </Tippy>
    );
});

export default StationSkillTraderSetting;