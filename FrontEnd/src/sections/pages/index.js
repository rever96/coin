import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-rainbow-components';
import {
  CalendarIcon,
  FollowerIcon,
  OrderIcon,
  UsersIcon,
  TimelineIcon,
  GalleryIcon,
  PricingIcon
} from '../../components/icons';
import PageHeader from '../../components/PageHeader';
import './styles.css';

const href = '/selectAllFromTable';
const pages = [
  { name: 'Ordini', icon: <OrderIcon /> },
  { name: 'Clienti', icon: <UsersIcon /> },
  { name: 'Persone', icon: <FollowerIcon /> },
  { name: 'DDV', icon: <TimelineIcon /> },
  { name: 'TipologieCommerciali', icon: <GalleryIcon /> },
  { name: 'Veicoli', icon: <CalendarIcon /> },
  { name: 'Depositi', icon: <PricingIcon /> },
  { name: 'Merci', icon: <PricingIcon /> },
  { name: 'Lavorazioni', icon: <PricingIcon /> },
  { name: 'Ordini', icon: <PricingIcon /> },
  { name: 'OrdiniMerci', icon: <PricingIcon /> },
  { name: 'Spedizioni', icon: <PricingIcon /> },
  { name: 'Settimane', icon: <PricingIcon /> },
  { name: 'StoricoContatti', icon: <PricingIcon /> },
  { name: 'Vendite', icon: <PricingIcon /> },
  { name: 'ViaggioClienti', icon: <PricingIcon /> },
  { name: 'ClientiCategorie', icon: <PricingIcon /> },
  { name: 'LavorazioniStaff', icon: <PricingIcon /> },
  { name: 'StoricoMerceUscita', icon: <PricingIcon /> },
  { name: 'RegistroCariparma', icon: <PricingIcon /> }
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
