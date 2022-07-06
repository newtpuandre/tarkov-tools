import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import QueueBrowserTask from '../../modules/queue-browser-task';
import mapData from '../../data/maps.json';
import SmallItemTable from '../../components/small-item-table';
import ItemSearch from '../../components/item-search';
import ServerStatus from '../../components/server-status';
import ItemIconList from '../../components/item-icon-list';

import Icon from '@mdi/react';
import {
    mdiAccountGroup,
    mdiAmmunition,
    mdiHammerWrench,
    mdiFinance,
    mdiAccountSwitch,
    mdiProgressWrench,
    mdiMap,
    mdiViewGrid,
    mdiDiscord,
    mdiHome,
    mdiCalendarClock,
} from '@mdi/js';

import './index.css';

import categoryPages from '../../data/category-pages.json';

function Start(props) {
    const defaultQuery = new URLSearchParams(window.location.search).get(
        'search',
    );
    const [nameFilter, setNameFilter] = useState(defaultQuery || '');
    const { t } = useTranslation();

    const handleNameFilterChange = useCallback(
        (value) => {
            if (typeof window !== 'undefined') {
                // schedule this for the next loop so that the UI
                // has time to update but we do the filtering as soon as possible
                QueueBrowserTask.task(() => {
                    setNameFilter(value);
                });
            }
        },
        [setNameFilter],
    );

    return [
        <Helmet key={'loot-tier-helmet'}>
            <meta charSet="utf-8" />
            <title>{t(`Scuffed Tarkov Tools - Escape from Tarkov`)}</title>
            <meta
                name="description"
                content={`All the relevant information about Escape from Tarkov`}
            />
        </Helmet>,
        <div
            className="display-wrapper page-wrapper start-wrapper"
            key={'display-wrapper'}
        >
            <div className="start-section-wrapper item-section">
                {/* <h3>
                    Items
                </h3> */}
                <ItemSearch
                    onChange={handleNameFilterChange}
                    autoFocus={true}
                />
                <SmallItemTable
                    maxItems={20}
                    nameFilter={nameFilter}
                    defaultRandom={true}
                    fleaValue
                    traderValue
                    instaProfit
                    hideBorders
                />
            </div>
            <div className="start-section-wrapper">
                {/* <h3>
                    Ammo types
                </h3>
                <ul>
                    {ammoTypes.map(ammoType => {
                        return <li>
                        </li>;
                    })}
                </ul> */}
                <ServerStatus />
                <Link className="ammo-link-wrapper" to={`/ammo/`}>
                    <h2>
                        <Icon
                            path={mdiAmmunition}
                            size={1}
                            rotate={90}
                            className="icon-with-text"
                        />
                        {t('Ammo chart')}
                    </h2>
                    <img
                        alt="Ammo chart"
                        className="link-image"
                        height="140"
                        loading="lazy"
                        src={`${process.env.PUBLIC_URL}/images/ammo-chart-thumbnail.jpg`}
                        width="256"
                    />
                </Link>
                <h3>
                    <Link to={'/maps'}>
                        <Icon
                            path={mdiMap}
                            size={1}
                            className="icon-with-text"
                        />
                        {t('Maps')}
                    </Link>
                </h3>
                <ul>
                    {mapData.map((mapData) => {
                        return (
                            <li key={`map-link-${mapData.key}`}>
                                <Link to={`/map/${mapData.key}`}>
                                    {mapData.displayText}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>,
    ];
}

export default Start;
