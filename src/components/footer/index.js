import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Supporter from '../supporter';
import { ReactComponent as GithubIcon } from '../supporter/Github.svg';
import { ReactComponent as DiscordIcon } from '../supporter/Discord.svg';
import PatreonButton from '../patreon-button';
import supporters from '../../supporters';

import './index.css';

function Footer() {
    const { t } = useTranslation();

    return (
        <div className={'footer-wrapper'}>
            <div className="footer-section-wrapper about-section-wrapper">
                <h3>{t('Tarkov Tools')}</h3>
                <p>
                    {t(
                        'The whole platform is open source, and the code is available on',
                    )}{' '}
                    <a href="https://github.com/kokarn/tarkov-tools">
                        <GithubIcon /> <span>GitHub</span>
                    </a>
                </p>
                <p>
                    <Link to="/about">{t('About tarkov-tools')}</Link>
                </p>
                <h3>{t('External resources')}</h3>
                <p>
                    <a href="https://developertracker.com/escape-from-tarkov/">
                        Escape from Tarkov Dev tracker
                    </a>
                </p>
                <p>
                    <a href="https://github.com/RatScanner/RatScanner">
                        RatScanner
                    </a>
                </p>
                <p>
                    <a href="https://tarkovtracker.io/">TarkovTracker</a>
                </p>
            </div>
            <div className="footer-section-wrapper">
                 {/*<PatreonButton />*/}
            </div>
            <div className="footer-section-wrapper">
                <h3>{t('Resources')}</h3>
                <p>
                    <Link to={'/api-users/'}>{t('API Users')}</Link>
                </p>
            </div>
            <div className="copyright-wrapper">
                {t(
                    'Game content and materials are trademarks and copyrights of Battlestate Games and its licensors. All rights reserved.',
                )}
            </div>
        </div>
    );
}

export default Footer;
