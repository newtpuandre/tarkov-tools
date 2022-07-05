import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Icon from '@mdi/react';
import { mdiCogOutline, mdiRemote, mdiHeartFlash, mdiMenu } from '@mdi/js';

import MenuItem from './MenuItem';
import PatreonButton from '../patreon-button';

import ammoData from '../../data/ammo.json';
import mapData from '../../data/maps.json';
import itemsData from '../../data/category-pages.json';

import './index.css';

const ammoTypes = [
    ...new Set(
        ammoData.data.map((ammoData) => {
            return ammoData.type;
        }),
    ),
].sort();

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleMenuClick = () => {
        setIsOpen(!isOpen);
    };
    const { t } = useTranslation();

    return (
        <nav key="main-navigation" className="navigation">
            <Link className="branding" to="/">
                {/* Tarkov Tools */}
                <img
                    alt="Tarkov Tools"
                    height={42}
                    src={`${process.env.PUBLIC_URL}/logo.svg`}
                    width={127}
                />
            </Link>
            <Link
                aria-label="Remote control"
                className="mobile-only-link"
                to="/control/"
                onClick={setIsOpen.bind(this, false)}
            >
                <Icon path={mdiRemote} size={1} className="icon-with-text" />
            </Link>
            <Link
                aria-label="Settings"
                className="mobile-only-link"
                to="/settings/"
                onClick={setIsOpen.bind(this, false)}
            >
                <Icon
                    path={mdiCogOutline}
                    size={1}
                    className="icon-with-text"
                />
            </Link>
            <Icon
                path={mdiMenu}
                size={3}
                className="mobile-icon"
                onClick={handleMenuClick}
            />
            <ul className={`menu${isOpen ? ' open' : ''}`}>
                <li className="only-large">
                    {/*<PatreonButton
                        wrapperStyle={{
                            margin: 0,
                        }}
                        linkStyle={{
                            color: '#fff',
                            padding: '5px 20px',
                            alignItems: 'center',
                        }}
                    >
                        {t('Support on Patreon')}
                        <Icon
                            path={mdiHeartFlash}
                            size={1}
                            className="icon-with-text"
                        />
                    </PatreonButton>*/}
                </li>
                <li className="submenu-wrapper">
                    <Link to="/" onClick={setIsOpen.bind(this, false)}>
                        {t('Home')}
                    </Link>
                </li>
                <li className="submenu-wrapper">
                    <Link to="/ammo/">{t('Ammo')}</Link>
                    <ul>
                        {ammoTypes.map((ammoType) => (
                            <MenuItem
                                checkbox
                                displayText={ammoType}
                                key={ammoType}
                                prefix="/ammo"
                                to={`/ammo/${ammoType}`}
                                onClick={setIsOpen.bind(this, false)}
                            />
                        ))}
                    </ul>
                </li>
                <li className="submenu-wrapper">
                    <Link to="/maps/">{t('Maps')}</Link>
                    <ul>
                        {mapData.map((map) => (
                            <MenuItem
                            style={{"paddingRight":"10%"}}
                                displayText={map.displayText}
                                key={map.key}
                                to={`/map/${map.key}`}
                                onClick={setIsOpen.bind(this, false)}
                            />
                        ))}
                    </ul>
                </li>
                <li className="submenu-wrapper desktop-only-link" style={{"paddingRight":"20px"}}>
                    <Link
                        aria-label="Settings"
                        to="/settings/"
                        onClick={setIsOpen.bind(this, false)}
                    >
                        <Icon
                            path={mdiCogOutline}
                            size={'20px'}
                            className="icon-with-text"
                        />
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Menu;
