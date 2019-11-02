const db = require('./db');

exports.create = async function(req, res) {
  const deleteTables = `DROP TABLE IF EXISTS TipologieCommerciali, Persone, Clienti, Veicoli, DDV,Depositi,Merci,Lavorazioni,Ordini,OrdiniMerci,
  Spedizioni,Settimane,StoricoContatti,Vendite,ViaggioClienti,ClientiCategorie,LavorazioniStaff,StoricoMerceUscita,RegistroCariparma`;
  const deleteTypes = `DROP TYPE IF EXISTS ENUMDIFFICOLTA,ENUMTIPOCLIENTE,ENUMDDV,ENUMLAVORAZIONI,ENUMCONTATTO,ENUMPAGAMENTO,ENUMUSCITAMERCE,
  ENUMREPARTO,ENUMDOCUMENTOPAGAMENTO,ENUMCORRIERE`;
  const createType1 = `CREATE TYPE ENUMDIFFICOLTA AS ENUM('facile', 'medio', 'difficile', 'impossibile')`;
  const createType2 = `CREATE TYPE ENUMTIPOCLIENTE AS ENUM('cliente', 'potenziale cliente', 'oppositore', 'oppositore perdi tempo', 'ex cliente')`;
  const createType3 = `CREATE TYPE ENUMDDV AS ENUM('vendita', 'conoscenza', 'visita', 'altro')`;
  const createType4 = `CREATE TYPE ENUMLAVORAZIONI AS ENUM('mov1', 'mov2', 'op1', 'altro')`;
  const createType5 = `CREATE TYPE ENUMCONTATTO AS ENUM('telefono', 'whatsapp', 'email', 'persona')`;
  const createType6 = `CREATE TYPE ENUMPAGAMENTO AS ENUM('assegno bancario', 'assegno circolare', 'bonifico bancario', 'contanti')`;
  const createType7 = `CREATE TYPE ENUMUSCITAMERCE AS ENUM('vendita', 'regalo', 'altro')`;
  const createType8 = `CREATE TYPE ENUMREPARTO AS ENUM('agricolo', 'commerciale', 'altro')`;
  const createType9 = `CREATE TYPE ENUMDOCUMENTOPAGAMENTO AS ENUM('scontrino fiscale', 'scontrino fiscale con POS', 'POS', 'fattura con POS', 'fattura')`;
  const createType10 = `CREATE TYPE ENUMCORRIERE AS ENUM('gls', 'brt', 'altro')`;

  const createTipologieCommerciali = `CREATE TABLE IF NOT EXISTS TipologieCommerciali (
    id UUID PRIMARY KEY,
    nome TEXT,
    note TEXT)`;
  const createPersone = `CREATE TABLE IF NOT EXISTS Persone (
    id UUID PRIMARY KEY,
    nome TEXT,
    cognome TEXT,
    data_nascita TIMESTAMP,
    telefono TEXT,
    email TEXT,
    note TEXT,
    fk_cliente UUID,
    ruolo TEXT)`;
  const createClienti = `CREATE TABLE IF NOT EXISTS Clienti (
    id UUID PRIMARY KEY,
    email TEXT,
    telefono TEXT,
    indirizzo TEXT,
    data_inserimento TIMESTAMP,
    gmap TEXT,
    n_coperti INTEGER,
    intestazione_legale TEXT,
    indirizzo_sede_legale TEXT,
    attivita_fruitrice TEXT,
    partita_iva TEXT,
    codice_univoco TEXT,
    accessibilita_consegne ENUMDIFFICOLTA,
    tipo_cliente ENUMTIPOCLIENTE,
    data_contatto_futuro TIMESTAMPTZ,
    note TEXT,
    fk_orario UUID,
    fk_proprietario UUID)`;
  const createVeicoli = `CREATE TABLE IF NOT EXISTS Veicoli (
    id UUID PRIMARY KEY,
    targa TEXT,
    km_litro NUMERIC,
    note TEXT)`;
  const createDDV = `CREATE TABLE IF NOT EXISTS DDV (
    id UUID PRIMARY KEY,
    data TIMESTAMPTZ NOT NULL,
    km INTEGER,
    zona_interessata TEXT,
    tipo ENUMDDV,
    costo_pedaggi NUMERIC,
    costo_vitto NUMERIC,
    note TEXT,
    fk_veicolo UUID NOT NULL,
    fk_capo_viaggio UUID NOT NULL,
    fk_assistente UUID,
    quantita_carburante NUMERIC,
    costo_carburante NUMERIC)`;
  const createDepositi = `CREATE TABLE IF NOT EXISTS Depositi (
    id UUID PRIMARY KEY,
    luogo TEXT,
    capienza INTEGER,
    note TEXT)`;
  const createMerci = `CREATE TABLE IF NOT EXISTS Merci (
    id UUID PRIMARY KEY,
    nome TEXT,
    scadenza TIMESTAMPTZ,
    costo_unitario NUMERIC,
    note TEXT,
    tipo TEXT,
    peso_unitario NUMERIC)`;
  const createLavorazioni = `CREATE TABLE IF NOT EXISTS Lavorazioni (
    id UUID PRIMARY KEY,
    data TIMESTAMPTZ,
    tipo ENUMLAVORAZIONI,
    note TEXT,
    quantita INTEGER,
    fk_deposito_prima UUID NOT NULL,
    fk_deposito_dopo UUID NOT NULL,
    fk_merce_prima UUID NOT NULL,
    fk_merce_dopo UUID NOT NULL)`;
  const createOrdini = `CREATE TABLE IF NOT EXISTS Ordini (
    id UUID PRIMARY KEY,
    data_ordine TIMESTAMPTZ NOT NULL,
    data_prevista_consegna TIMESTAMPTZ,
    come_effettuato ENUMCONTATTO,
    data_ultima TIMESTAMPTZ NOT NULL,
    note TEXT,
    fk_responsabile UUID NOT NULL,
    fk_cliente UUID NOT NULL)`;
  const createOrdiniMerci = `CREATE TABLE IF NOT EXISTS OrdiniMerci (
    idMerci UUID NOT NULL,
    idOrdini UUID NOT NULL,
    quantita INTEGER NOT NULL,
    prezzo NUMERIC NOT NULL,
    PRIMARY KEY (idMerci, idOrdini))`;
  const createSpedizioni = `CREATE TABLE IF NOT EXISTS Spedizioni (
    id UUID PRIMARY KEY,
    servizio ENUMCORRIERE NOT NULL,
    data_ritiro TIMESTAMPTZ NOT NULL,
    note TEXT,
    fk_responsabile UUID NOT NULL)`;
  //DEFAULT '10-15|17-00' COMMENT 'da-a| separatore'
  const createSettimane = `CREATE TABLE IF NOT EXISTS Settimane (
    id UUID PRIMARY KEY,
    lunedi TEXT NOT NULL DEFAULT '10-15|17-00',
    martedi TEXT NOT NULL DEFAULT '10-15|17-00',
    mercoledi TEXT NOT NULL DEFAULT '10-15|17-00',
    giovedi TEXT NOT NULL DEFAULT '10-15|17-00',
    venerdi TEXT NOT NULL DEFAULT '10-15|17-00',
    sabato TEXT NOT NULL DEFAULT '10-15|17-00',
    domenica TEXT NOT NULL DEFAULT '10-15|17-00',
    note TEXT)`;
  const createStoricoContatti = `CREATE TABLE IF NOT EXISTS StoricoContatti (
    id UUID PRIMARY KEY,
    data TIMESTAMPTZ,
    note TEXT,
    fk_cliente UUID NOT NULL,
    fk_staff UUID NOT NULL)`;
  const createVendite = `CREATE TABLE IF NOT EXISTS Vendite (
    id UUID PRIMARY KEY,
    data TIMESTAMPTZ NOT NULL,
    tipo_pagamento ENUMPAGAMENTO,
    ddt TEXT,
    ricevuta TEXT,
    note TEXT,
    fk_ordine UUID NOT NULL,
    importo NUMERIC,
    saldo NUMERIC,
    data_saldo TIMESTAMPTZ)`;
  const createViaggioClienti = `CREATE TABLE IF NOT EXISTS ViaggioClienti (
    id UUID PRIMARY KEY,
    note TEXT,
    fk_cliente UUID NOT NULL,
    fk_ddv UUID NOT NULL,
    ora_arrivo_effettiva TIMESTAMPTZ,
    ora_arrivo_stimata TIMESTAMPTZ,
    fk_persona_incontrata UUID)`;
  const createClientiCategorie = `CREATE TABLE IF NOT EXISTS ClientiCategorie (
    idClienti UUID NOT NULL,
    idTipologieCommerciali UUID NOT NULL,
    PRIMARY KEY (idClienti, idTipologieCommerciali))`;
  const createLavorazioniStaff = `CREATE TABLE IF NOT EXISTS LavorazioniStaff (
    idLavorazioni UUID NOT NULL,
    idPersone UUID NOT NULL,
    PRIMARY KEY (idLavorazioni, idPersone))`;
  const createStoricoMerceUscita = `CREATE TABLE IF NOT EXISTS StoricoMerceUscita (
    id UUID PRIMARY KEY,
    data TIMESTAMPTZ NOT NULL,
    fk_merce UUID NOT NULL,
    quantita INTEGER NULL,
    tipo_uscita ENUMUSCITAMERCE,
    note TEXT,
    fk_vendita UUID,
    fk_DDV UUID,
    fk_cliente UUID)`;
  const createRegistroCariparma = `CREATE TABLE IF NOT EXISTS RegistroCariparma (
    id UUID PRIMARY KEY,
    data TIMESTAMPTZ,
    reparto ENUMREPARTO,
    importo NUMERIC,
    beneficiario TEXT,
    indirizzo TEXT,
    documento ENUMDOCUMENTOPAGAMENTO,
    causale TEXT)`;

  try {
    await db.query(deleteTables);
    await db.query(deleteTypes);
    await db.query(createType1);
    await db.query(createType2);
    await db.query(createType3);
    await db.query(createType4);
    await db.query(createType5);
    await db.query(createType6);
    await db.query(createType7);
    await db.query(createType8);
    await db.query(createType9);
    await db.query(createType10);
    await db.query(createClienti);
    await db.query(createClientiCategorie);
    await db.query(createDDV);
    await db.query(createDepositi);
    await db.query(createLavorazioni);
    await db.query(createLavorazioniStaff);
    await db.query(createMerci);
    await db.query(createOrdini);
    await db.query(createOrdiniMerci);
    await db.query(createPersone);
    await db.query(createRegistroCariparma);
    await db.query(createSettimane);
    await db.query(createSpedizioni);
    await db.query(createStoricoContatti);
    await db.query(createStoricoMerceUscita);
    await db.query(createTipologieCommerciali);
    await db.query(createVeicoli);
    await db.query(createVendite);
    await db.query(createViaggioClienti);
    return res.status(201).send({});
  } catch (error) {
    return res.status(400).send(error);
  }
};
exports.alter = async function(req, res) {
  const alterPersone = `
    ALTER TABLE Persone ADD CONSTRAINT constraint_fk_cliente
    FOREIGN KEY (fk_cliente) REFERENCES Clienti(id)
    ON UPDATE CASCADE
    ON DELETE SET NULL`;
  const alterClienti1 = `
  ALTER TABLE Clienti ADD CONSTRAINT constraint_fk_proprietario
  FOREIGN KEY (fk_proprietario) REFERENCES Persone(id)
  ON UPDATE CASCADE
  ON DELETE SET NULL`;
  const alterClienti2 = `
  ALTER TABLE Clienti ADD CONSTRAINT constraint_fk_orario
  FOREIGN KEY (fk_orario) REFERENCES Settimane(id)
  ON UPDATE CASCADE
  ON DELETE SET NULL`;
  const alterDDV1 = `
  ALTER TABLE DDV ADD CONSTRAINT constraint_fk_veicolo
  FOREIGN KEY (fk_veicolo) REFERENCES Veicoli(id)
  ON UPDATE CASCADE
  ON DELETE NO ACTION`;
  const alterDDV2 = `
  ALTER TABLE DDV ADD CONSTRAINT constraint_fk_capo_viaggio
  FOREIGN KEY (fk_capo_viaggio) REFERENCES Persone(id)
  ON UPDATE CASCADE
  ON DELETE NO ACTION`;
  const alterDDV3 = `
  ALTER TABLE DDV ADD CONSTRAINT constraint_fk_assistente
  FOREIGN KEY (fk_assistente) REFERENCES Persone(id)
  ON UPDATE CASCADE
  ON DELETE CASCADE`;
  const alterLavorazioni1 = `
  ALTER TABLE Lavorazioni ADD CONSTRAINT constraint_fk_deposito_prima
  FOREIGN KEY (fk_deposito_prima) REFERENCES Depositi(id)
  ON UPDATE CASCADE
  ON DELETE CASCADE`;
  const alterLavorazioni2 = `
  ALTER TABLE Lavorazioni ADD CONSTRAINT constraint_fk_deposito_dopo
  FOREIGN KEY (fk_deposito_dopo) REFERENCES Depositi(id)
  ON UPDATE CASCADE
  ON DELETE CASCADE`;
  const alterLavorazioni3 = `
  ALTER TABLE Lavorazioni ADD CONSTRAINT constraint_fk_merce_prima
  FOREIGN KEY (fk_merce_prima) REFERENCES Merci(id)
  ON UPDATE CASCADE
  ON DELETE CASCADE`;
  const alterLavorazioni4 = `
  ALTER TABLE Lavorazioni ADD CONSTRAINT constraint_fk_merce_dopo
  FOREIGN KEY (fk_merce_dopo) REFERENCES Merci(id)
  ON UPDATE CASCADE
  ON DELETE CASCADE`;
  const alterOrdini1 = `
  ALTER TABLE Ordini ADD CONSTRAINT constraint_fk_responsabile
  FOREIGN KEY (fk_responsabile) REFERENCES Persone(id)
  ON UPDATE CASCADE
  ON DELETE NO ACTION`;
  const alterOrdini2 = `
  ALTER TABLE Ordini ADD CONSTRAINT constraint_fk_cliente
  FOREIGN KEY (fk_cliente) REFERENCES Clienti(id)
  ON UPDATE CASCADE
  ON DELETE NO ACTION`;
  const alterOrdiniMerci1 = `
  ALTER TABLE OrdiniMerci ADD CONSTRAINT constraint_idOrdini
  FOREIGN KEY (idOrdini) REFERENCES Ordini(id)
  ON UPDATE CASCADE
  ON DELETE CASCADE`;
  const alterOrdiniMerci2 = `
  ALTER TABLE OrdiniMerci ADD CONSTRAINT constraint_idMerci
  FOREIGN KEY (idMerci) REFERENCES Merci(id)
  ON UPDATE CASCADE
  ON DELETE CASCADE`;
  const alterSpedizioni = `
  ALTER TABLE Spedizioni ADD CONSTRAINT constraint_fk_responsabile
  FOREIGN KEY (fk_responsabile) REFERENCES Persone(id)
  ON UPDATE CASCADE
  ON DELETE NO ACTION`;
  const alterStoricoContatti1 = `
  ALTER TABLE StoricoContatti ADD CONSTRAINT constraint_fk_cliente
  FOREIGN KEY (fk_cliente) REFERENCES Clienti(id)
  ON UPDATE CASCADE
  ON DELETE CASCADE`;
  const alterStoricoContatti2 = `
  ALTER TABLE StoricoContatti ADD CONSTRAINT constraint_fk_staff
  FOREIGN KEY (fk_staff) REFERENCES Persone(id)
  ON UPDATE CASCADE
  ON DELETE NO ACTION`;
  const alterVendite = `
  ALTER TABLE Vendite ADD CONSTRAINT constraint_fk_ordine
  FOREIGN KEY (fk_ordine) REFERENCES Ordini(id)
  ON UPDATE CASCADE
  ON DELETE NO ACTION`;
  const alterViaggioClienti1 = `
  ALTER TABLE ViaggioClienti ADD CONSTRAINT constraint_fk_cliente
  FOREIGN KEY (fk_cliente) REFERENCES Clienti(id)
  ON UPDATE CASCADE
  ON DELETE CASCADE`;
  const alterViaggioClienti2 = `
  ALTER TABLE ViaggioClienti ADD CONSTRAINT constraint_fk_ddv
  FOREIGN KEY (fk_ddv) REFERENCES DDV(id)
  ON UPDATE CASCADE
  ON DELETE CASCADE`;
  const alterViaggioClienti3 = `
  ALTER TABLE ViaggioClienti ADD CONSTRAINT constraint_fk_persona_incontrata
  FOREIGN KEY (fk_persona_incontrata) REFERENCES Persone(id)
  ON UPDATE CASCADE
  ON DELETE SET NULL`;
  const alterClientiCategorie1 = `
  ALTER TABLE ClientiCategorie ADD CONSTRAINT constraint_idTipologieCommerciali
  FOREIGN KEY (idTipologieCommerciali) REFERENCES TipologieCommerciali(id)
  ON UPDATE CASCADE
  ON DELETE CASCADE`;
  const alterClientiCategorie2 = `
  ALTER TABLE ClientiCategorie ADD CONSTRAINT constraint_idClienti
  FOREIGN KEY (idClienti) REFERENCES Clienti(id)
  ON UPDATE CASCADE
  ON DELETE CASCADE`;
  const alterLavorazioniStaff1 = `
  ALTER TABLE LavorazioniStaff ADD CONSTRAINT constraint_idLavorazioni
  FOREIGN KEY (idLavorazioni) REFERENCES Lavorazioni(id)
  ON UPDATE CASCADE
  ON DELETE CASCADE`;
  const alterLavorazioniStaff2 = `
  ALTER TABLE LavorazioniStaff ADD CONSTRAINT constraint_idPersone
  FOREIGN KEY (idPersone) REFERENCES Persone(id)
  ON UPDATE CASCADE
  ON DELETE CASCADE`;
  const alterStoricoMerceUscita1 = `
  ALTER TABLE StoricoMerceUscita ADD CONSTRAINT constraint_fk_merce
  FOREIGN KEY (fk_merce) REFERENCES Merci(id)
  ON UPDATE CASCADE
  ON DELETE NO ACTION`;
  const alterStoricoMerceUscita2 = `
  ALTER TABLE StoricoMerceUscita ADD CONSTRAINT constraint_fk_vendita
  FOREIGN KEY (fk_vendita) REFERENCES Vendite(id)
  ON UPDATE CASCADE
  ON DELETE NO ACTION`;
  const alterStoricoMerceUscita3 = `
  ALTER TABLE StoricoMerceUscita ADD CONSTRAINT constraint_fk_DDV
  FOREIGN KEY (fk_DDV) REFERENCES DDV(id)
  ON UPDATE CASCADE
  ON DELETE NO ACTION`;
  const alterStoricoMerceUscita4 = `
  ALTER TABLE StoricoMerceUscita ADD CONSTRAINT constraint_fk_cliente
  FOREIGN KEY (fk_cliente) REFERENCES Clienti(id)
  ON UPDATE CASCADE
  ON DELETE NO ACTION`;
  try {
    await db.query(alterClienti1);
    await db.query(alterClienti2);
    await db.query(alterClientiCategorie1);
    await db.query(alterClientiCategorie2);
    await db.query(alterDDV1);
    await db.query(alterDDV2);
    await db.query(alterDDV3);
    await db.query(alterLavorazioni1);
    await db.query(alterLavorazioni2);
    await db.query(alterLavorazioni3);
    await db.query(alterLavorazioni4);
    await db.query(alterLavorazioniStaff1);
    await db.query(alterLavorazioniStaff2);
    await db.query(alterOrdini1);
    await db.query(alterOrdini2);
    await db.query(alterOrdiniMerci1);
    await db.query(alterOrdiniMerci2);
    await db.query(alterPersone);
    await db.query(alterSpedizioni);
    await db.query(alterStoricoContatti1);
    await db.query(alterStoricoContatti2);
    await db.query(alterStoricoMerceUscita1);
    await db.query(alterStoricoMerceUscita2);
    await db.query(alterStoricoMerceUscita3);
    await db.query(alterStoricoMerceUscita4);
    await db.query(alterVendite);
    await db.query(alterViaggioClienti1);
    await db.query(alterViaggioClienti2);
    await db.query(alterViaggioClienti3);
    return res.status(201).send({});
  } catch (error) {
    return res.status(400).send(error);
  }
};
