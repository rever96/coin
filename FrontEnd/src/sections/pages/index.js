import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-rainbow-components';
import {
  CalendarIcon,
  FollowerIcon,
  UsersIcon,
  TimelineIcon,
  GalleryIcon,
  PricingIcon,
  BellIcon,
  ApplicationIcon,
  Attach,
  ChartsIcon,
  Company,
  CompletedTasksIcon,
  CreditCard,
  Emoji,
  GithubIcon,
  LikeIcon,
  Lock,
  Map
} from '../../components/icons';
import PageHeader from '../../components/PageHeader';
import './styles.css';

const href = '/selectAllFromTable';
const pages = [
  { name: 'clienti', icon: <UsersIcon /> },
  { name: 'persone', icon: <FollowerIcon /> },
  { name: 'ddv', icon: <TimelineIcon /> },
  { name: 'tipologiecommerciali', icon: <GalleryIcon /> },
  { name: 'veicoli', icon: <CalendarIcon /> },
  { name: 'depositi', icon: <PricingIcon /> },
  { name: 'merci', icon: <BellIcon /> },
  { name: 'lavorazioni', icon: <ApplicationIcon /> },
  { name: 'ordini', icon: <Attach /> },
  { name: 'ordinimerci', icon: <ChartsIcon /> },
  { name: 'spedizioni', icon: <Company /> },
  { name: 'settimane', icon: <CompletedTasksIcon /> },
  { name: 'storicocontatti', icon: <CreditCard /> },
  { name: 'vendite', icon: <Emoji /> },
  { name: 'viaggioclienti', icon: <FollowerIcon /> },
  { name: 'clienticategorie', icon: <GithubIcon /> },
  { name: 'lavorazionistaff', icon: <LikeIcon /> },
  { name: 'storicomerceuscita', icon: <Lock /> },
  { name: 'registrocariparma', icon: <Map /> }
];

function Cards() {
  return pages.map((page, index) => {
    const { name, icon } = page;
    const key = `card-${index}`;
    return (
      <Link
        key={key}
        className="react-rainbow-admin-pages_anchor"
        to={href + '/' + name}
      >
        <Card className="react-rainbow-admin-pages_card" footer={name}>
          <span className="react-rainbow-admin-pages_card-image">{icon}</span>
        </Card>
      </Link>
    );
  });
}
export default function Pages() {
  return (
    <div className="react-rainbow-admin-pages_container">
      <PageHeader
        title="Pages"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      />
      <div className="react-rainbow-admin-pages_body">
        <Cards />
      </div>
    </div>
  );
}
